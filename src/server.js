
const express = require('express');
const MeetingController = require('./MeetingController');

const app = express();
const meetingController = new MeetingController();

const SocketServer = require('ws').Server;

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

const port = process.env.PORT || 3001;

const server = app.listen(
  port,
  () => console.log(`Meeting app listening on port ${port}!`)
);

const wss = new SocketServer({ server });
wss.on('connection', function connection(clientSocket, httpRequest) {
  const targetUrl = require('url').parse(httpRequest.url, true);
  const meetingId = parseInt(targetUrl.query.meetingId, 10);
  meetingController.registerClient(meetingId, clientSocket);

});