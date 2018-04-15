
class ParticipantSocket {

  constructor(meetingId) {
    this._meetingId = meetingId;
  }

  handleServerUpdatesTo(propertyOfInterest, serverEventCallback) {
    const webSocketProtocolString =
      window.location.protocol === 'https:' ?
        'wss://' :
        'ws://';

    const webSocketUrl = `${webSocketProtocolString}${window.location.hostname}:3001?meetingId=${this._meetingId}`;
    const webSocket = new WebSocket(webSocketUrl);
    webSocket.onopen = function () {
      webSocket.send("test hello!");
    };
    webSocket.onmessage = function (message) {
      //console.log("message received: " + message.data);
      const data = JSON.parse(message.data);
      const filteredData = data[propertyOfInterest];
      if (filteredData) {
        serverEventCallback(filteredData);
      }
    };
  }

}

export default ParticipantSocket;