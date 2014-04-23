var peer = new RTCPeerConnection(window.iceServers);

var createOffer = function(stream){
  caller = peer
  caller.addStream(stream);

  caller.onaddstream = function(event){
    myVid.src = URL.createObjectURL(event.stream);
    myVid.play();
  };

  caller.onicecandidate = function (event) {
    if (!event || !event.candidate) return;
    console.log('candidate', event.candidate)
    socket.emit('outgoing_ice_candidate', { name:myName(), candidate:event.candidate })
  };

  caller.createOffer(function (offer) {
    caller.setLocalDescription(offer);
    socket.emit('outgoing_sdp_offer', { name:calleeName(), sdp:offer.sdp })
  }, onSdpError, mediaConstraints);
}

var receiveOffer = function(offer, stream){
  callee = peer
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
    console.log('creating answer')
    callee.setLocalDescription(answer);
    console.log(answer)
    socket.emit('outgoing_sdp_answer', {name:myName(), sdp:answer.sdp})
  }, onSdpError, mediaConstraints);
}

var receiveAnswer = function(answer){
  console.log(answer)
  console.log('receiving answer')
  peer.onaddstream = function (event) {
    console.log('onaddstream')
    console.log(event)
    console.log(theirVid)
    theirVid.src = URL.createObjectURL(event.stream);
    theirVid.play();
  };
  console.log('setting peer')
  peer.setRemoteDescription(answer, onSdpSucces, onSdpError);
  console.log(peer)
}

