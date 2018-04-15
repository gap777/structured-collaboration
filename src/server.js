
const express = require('express');
const MeetingController = require('./MeetingController');

const app = express();
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

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Meeting app listening on port ${port}!`));
