var createOffer = function(stream){
  caller = new RTCPeerConnection(window.iceServers);
  caller.addStream(stream);

  caller.onaddstream = function(event){
    myVid.src = URL.createObjectURL(event.stream);
    myVid.play();
  };

  // caller.onicecandidate = function (event) {
  //   if (!event || !event.candidate) return;
  //   //answerer.addIceCandidate(event.candidate);
  // };

  caller.createOffer(function (offer) {
    caller.setLocalDescription(offer);
    socket.emit('outgoing_sdp_offer', { name:myName(), sdp:offer.sdp })
  }, onSdpError, mediaConstraints);
}

var receiveOffer = function(offer, stream){
  callee = new RTCPeerConnection(window.iceServers);
  callee.addStream(stream);

  callee.onaddstream = function (event) {
    theirVid.src = URL.createObjectURL(event.stream);
    theirVid.play();
  };

  // callee.onicecandidate = function (event) {
  //   if (!event || !event.candidate) return;
  //   offerer.addIceCandidate(event.candidate);
  // };

  callee.setRemoteDescription(offer, onSdpSucces, onSdpError);

  callee.createAnswer(function (answer) {
    callee.setLocalDescription(answer);
    socket.emit('outgoing_sdp_offer', {name:myName(), sdp:anser})
  }, onSdpError, mediaConstraints);
}

