
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');

class MeetingController {

  generateNewMeetingId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async generateNewParticipantId(meetingId) {
    const participantIds = await this._getParticipantsFromDB(meetingId);
    const biggestIdentifier = Math.max(0, ...participantIds);
    return biggestIdentifier + 1;
  }

  async createMeeting(httpRequest, httpResponse) {
    try {
      const meetingId = this.generateNewMeetingId();
      const meetingSavePromise = this._storeMeetingInDB();

      const participantId = await this.generateNewParticipantId(meetingId);
      const participantSavePromise = this._addParticipantToDB(meetingId, participantId);

      await meetingSavePromise;
      await participantSavePromise;

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
    const meetingId = httpRequest.params.meetingId;
    console.log(`Joining meeting ${meetingId}`);
    const participantId = await this.generateNewParticipantId(meetingId);
    this._addParticipantToDB(meetingId, participantId);
    httpResponse.send({
      meetingId: meetingId,
      participantId: participantId
    });
  }

  async getParticipantCount(httpRequest, httpResponse) {
    const meetingId = httpRequest.params.meetingId;
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
    return await Participant.find(
      {meetingId: meetingId, deleted_at: null},
      'participantId'
    );
  }
}

module.exports = MeetingController;