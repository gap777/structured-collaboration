
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

const SocketServer = require('ws').Server;

const MeetingController = require('./MeetingController');
const meetingController = new MeetingController();

app.post(
  '/api/meeting/',
  (req, res) => meetingController.createMeeting(req, res)
);

app.post(
  '/api/meeting/:meetingId/participants',
  (req, res) => meetingController.joinMeeting(req, res)
);

app.get(
  '/api/meeting/:meetingId/participants',
  (req, res) => meetingController.getParticipantCount(req, res)
);

app.post(
  '/api/meeting/:meetingId/questions',
  (req, res) => meetingController.addQuestion(req, res)
);

app.get(
  '/api/meeting/:meetingId/questions',
  (req, res) => meetingController.getQuestions(req, res)
);

app.post(
  '/api/meeting/:meetingId/questions/:questionId/responses',
  (req, res) => meetingController.addResponse(req, res)
);

const port = process.env.PORT || 3001;

const server = app.listen(
  port,
  () => console.log(`Meeting app listening on port ${port}!`)
);

const wss = new SocketServer({ server });
wss.on('connection', function connection(clientSocket) {

  clientSocket.on('message', function incoming(data) {
    console.log('Message received');
    const payload = JSON.parse(data);
    if (payload.registerNewClient) {
      const meetingId = parseInt(payload.registerNewClient.meetingId, 10);
      meetingController.registerClient(meetingId, clientSocket);
    }
  });
});
