
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');
const WebSocket = require('ws');

class MeetingController {

  constructor() {
    this.clients = new Map();
  }

  async generateNewMeetingId() {
    let num;
    do {
      num = Math.floor(1000 + Math.random() * 9000);
    } while(await this.isMeetingNumUnique(num) === false);

    return num;
  }

  async isMeetingNumUnique(meetingId) {
      const numOfDuplicates = await Meeting.count(
          {meetingId: meetingId, deleted_at: null}
      );
      return numOfDuplicates === 0;
  }

  async broadcast(meetingId, data) {
    const participants = this.clients.get(meetingId);
    participants.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  }

  async broadcastParticipants(meetingId) {
    try {
      const participantIds = await this._getParticipantsFromDB(meetingId);
      const data = JSON.stringify({ participants: participantIds.length });
      await this.broadcast(meetingId, data);
    } catch (error) {
      console.log(error);
    }
  }

  async generateNewParticipantId(meetingId) {
    const participantIds = await this._getParticipantsFromDB(meetingId);
    const biggestIdentifier = Math.max(0, ...participantIds);
    return biggestIdentifier + 1;
  }

  async registerClient(meetingId, clientSocket) {
    const clients = this.clients.get(meetingId);
    clients.push(clientSocket);
    console.log(`Meeting ${meetingId} has ${clients.length} clients`);
  }

  async createMeeting(httpRequest, httpResponse) {
    try {
      const meetingId = await this.generateNewMeetingId();
      const meetingSavePromise = this._storeMeetingInDB();

      const participantId = await this.generateNewParticipantId(meetingId);
      const participantSavePromise = this._addParticipantToDB(meetingId, participantId);

      await meetingSavePromise;
      await participantSavePromise;

      this.clients.set(meetingId, []);

      console.log(`Created new meeting ${meetingId}`);

      httpResponse.send({
        meetingId: meetingId,
        participantId: participantId
      });

    } catch (error) {
      console.log(error);
      httpResponse.send({ err: error });
    }
  }


  _storeMeetingInDB(meetingId) {
    const meeting = new Meeting({
      meetingId: meetingId
    });
    return meeting.save();
  }

  _addParticipantToDB(meetingId, participantId) {
    const participant = new Participant({
      meetingId:     meetingId,
      participantId: participantId
    });
    return participant.save();
  }

  async joinMeeting(httpRequest, httpResponse) {
    const meetingId = parseInt(httpRequest.params.meetingId, 10);
    console.log(`Joining meeting ${meetingId}`);
    const participantId = await this.generateNewParticipantId(meetingId);
    await this._addParticipantToDB(meetingId, participantId);
    await this.broadcastParticipants(meetingId);
    httpResponse.send({
      meetingId: meetingId,
      participantId: participantId
    });
  }

  async getParticipantCount(httpRequest, httpResponse) {
    const meetingId = parseInt(httpRequest.params.meetingId, 10);
    let numParticipants = 0;
    try {
      const participantIds = await this._getParticipantsFromDB(meetingId);
      numParticipants = participantIds.length;
    } catch (error) {
      console.log(error);
    }
    httpResponse.send({
      participants: numParticipants
    });
  }

  async _getParticipantsFromDB(meetingId) {
    const participantModels = await Participant.find(
      {meetingId: meetingId, deleted_at: null},
      'participantId'
    );
    return participantModels.map(model => model.participantId);
  }
}

module.exports = MeetingController;