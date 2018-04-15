
class MeetingController {

  generateNewMeetingId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  createMeeting(httpRequest, httpResponse) {
    const meetingId = this.generateNewMeetingId();
    console.log(`Creating new meeting ${meetingId}`);
    httpResponse.send({
      meetingId: meetingId
    });
  }

  generateNewParticipantId() {
    return 1;
  }

  joinMeeting(httpRequest, httpResponse) {
    const meetingId = httpRequest.params.meetingId;
    const participantId = this.generateNewParticipantId();
    console.log(`Joining meeting ${meetingId}`);
    httpResponse.send({
      meetingId: meetingId,
      participantId: participantId
    });
  }

  getParticipants(httpRequest, httpResponse) {
    httpResponse.send({
      participants: 4
    });
  }

}

module.exports = MeetingController;