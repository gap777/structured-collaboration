
class ParticipantSocket {

  constructor(meetingId) {
    this._meetingId = meetingId;
  }

  connectToServer(serverEventCallback) {
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
      console.log("message received: " + message.data);
      serverEventCallback(message.data);
    };
  }

}

export default ParticipantSocket;