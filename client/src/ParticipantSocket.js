
class ParticipantSocket {

  constructor(meetingId) {
    this._meetingId = meetingId;
    this._callbacks = new Map();
    const webSocketProtocolString =
      window.location.protocol === 'https:' ?
        'wss://' :
        'ws://';

    //const webSocketUrl = `${webSocketProtocolString}${window.location.hostname}:3001?meetingId=${this._meetingId}`;
    const webSocketUrl = `${webSocketProtocolString}${window.location.hostname}:3001`;
    this.webSocket = new WebSocket(webSocketUrl);
    this.webSocket.onopen = () => {
      console.log('Socket to server is open');
      const data = JSON.stringify({
        registerNewClient: {
          meetingId: meetingId
        }
      });
      this.webSocket.send(data);
    };
    this.webSocket.onmessage = this._handleServerMessage.bind(this);
  }

  _handleServerMessage(message) {
    const data = JSON.parse(message.data);
    this._callbacks.forEach((callbacks, propertyOfInterest) => {
      const filteredData = data[propertyOfInterest];
      if (filteredData) {
        callbacks.forEach(callback => callback(filteredData));
      }
    });
  }

  registerCallback(serverEventCallback, propertyOfInterest) {
    if (!this._callbacks.has(propertyOfInterest)) {
      this._callbacks.set(propertyOfInterest, []);
    }
    this._callbacks.get(propertyOfInterest).push(serverEventCallback);
  }

}

export default ParticipantSocket;