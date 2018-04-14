
const express = require('express');

const app = express();

function generateNewMeetingId() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateNewParticipantId() {
  return 1;
}


app.post('/api/meeting/', (req, res) => {
  const meetingId = generateNewMeetingId();
  console.log(`Creating new meeting ${meetingId}`);
  res.send({
    meetingId: meetingId
  });
});

app.post('/api/meeting/:meetingId/participants', (req, res) => {
  const meetingId = req.params.meetingId;
  const participantId = generateNewParticipantId();
  console.log(`Joining meeting ${meetingId}`);
  res.send({
    meetingId: meetingId,
    participantId: participantId
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
