
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');

class MeetingController {

  generateNewMeetingId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async generateNewParticipantId(meetingId) {
    const participantIds = await this._getParticipantsFromDB(meetingId);
    const biggestIdentifier = Math.max.apply(null, participantIds);
    return biggestIdentifier + 1;
  }

  async createMeeting(httpRequest, httpResponse) {
    try {
      console.log(`Creating new meeting ${meetingId}`);
      const meetingId = this.generateNewMeetingId();
      const meetingSavePromise = this._storeMeetingInDB();

      const participantId = await this.generateNewParticipantId();
      const participantSavePromise = this._addParticipantToDB(meetingId, participantId);

      await meetingSavePromise;
      await participantSavePromise;

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

    const participantIds = await this._getParticipantsFromDB(meetingId);

    httpResponse.send({
      participants: participantIds.length
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