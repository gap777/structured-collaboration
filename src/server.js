
const express = require('express');

const app = express();

function generateNewMeetingId() {
  return Math.floor(1000 + Math.random() * 9000);
}


app.post('/create-meeting', (req, res) => {
  const meetingId = generateNewMeetingId();
  console.log(`Creating new meeting ${meetingId}`);
  res.send({
    meetingId: meetingId
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
