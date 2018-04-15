
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');

class MeetingController {

  generateNewMeetingId() {
    let num = Math.floor(1000 + Math.random() * 9000);
    while(true){
        if(this.isMeetingNumUnique(num)){
            return num;
        }else{
          num = Math.floor(1000 + Math.random() * 9000);
        }
    }
  }

    async isMeetingNumUnique(meetingId) {
        const numOfDuplicates = await Meeting.count(
            {meetingId: meetingId, deleted_at: null}
        );
        return numOfDuplicates === 0;
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
    const meetingId = parseInt(httpRequest.params.meetingId, 10);
    console.log(`Joining meeting ${meetingId}`);
    const participantId = await this.generateNewParticipantId(meetingId);
    this._addParticipantToDB(meetingId, participantId);
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