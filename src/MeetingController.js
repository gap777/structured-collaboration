
const Meeting = require('./models/Meeting');
const Participant = require('./models/Participant');
const Question = require('./models/Question');
const Response = require('./models/Response');
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

  broadcast(meetingId, data) {
    const participants = this.clients.get(meetingId);
    if (!participants) {
      console.error(`Unable to find any registered clients for meeting ${meetingId}`);
      return;
    }

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
      this.broadcast(meetingId, data);
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

    if (!this.clients.has(meetingId)) {
      this.clients.set(meetingId, []);
    }
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
    const participantId = await this.generateNewParticipantId(meetingId);
    console.log(`Participant ${participantId} joining meeting ${meetingId}`);
    await this._addParticipantToDB(meetingId, participantId);
    this.broadcastParticipants(meetingId);
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

  async _addQuestionToDb(meetingId, questionText) {
    const question = new Question({
      meetingId:     meetingId,
      questionText:  questionText
    });
    return question.save();
  }

  async addQuestion(httpRequest, httpResponse) {
    const meetingId = parseInt(httpRequest.params.meetingId, 10);
    const questionText = httpRequest.body.questionText;
    try {
      const question = await this._addQuestionToDb(meetingId, questionText);
      const questionId = question._id;
      console.log(`Created new question ${questionId} for meeting ${meetingId}`);
      this.broadcastQuestion(meetingId, question);
      httpResponse.send({
        questionId: questionId
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestions(httpRequest, httpResponse) {
    const meetingId = parseInt(httpRequest.params.meetingId, 10);

    try {
      const questions = await Question.find({meetingId: meetingId});
      const responsePromises = [];
      questions.forEach(q => {
        const nextPromise = Response.find({questionId: q.questionId})
                                    .then(responses => q.responses = responses);
        responsePromises.push(nextPromise);
      });
      Promise.all(responsePromises);

      httpResponse.send({
        questions: questions
      });
    } catch (error) {
      console.log(error);
    }
  }

  async broadcastQuestion(meetingId, question) {
    const data = JSON.stringify({
      activeQuestion: question
    });
    this.broadcast(meetingId, data);
  }

  async addResponse(httpRequest, httpResponse) {
    const meetingId = parseInt(httpRequest.params.meetingId, 10);
    const questionId = parseInt(httpRequest.params.questionId, 10);
    const responseText = httpRequest.body.responseText;

    try {
      const response = await this._addResponseToDb(meetingId, questionId, responseText);
      const responseId = response._id;
      console.log(`Created new response ${responseId} for question ${questionId} in meeting ${meetingId}`);
      this.broadcastResponse(meetingId, response);
      httpResponse.send({
        responseId: responseId
      });
    } catch (error) {
      console.log(error);
    }
  }

  async _addResponseToDb(meetingId, questionId, responseText) {
    const response = new Response({
      meetingId:     meetingId,
      questionId:    questionId,
      responseText:  responseText
    });
    return response.save();
  }

  async broadcastResponse(meetingId, response) {
    const data = JSON.stringify({
      response: response
    });
    this.broadcast(meetingId, data);
  }
}

module.exports = MeetingController;