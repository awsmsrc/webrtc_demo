var socket = io.connect('http://localhost');

var mediaConstraints = {
  optional: [],
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
  }
};

window.RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
window.RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.URL = window.webkitURL || window.URL;

var getUserMedia = function(callback) {
  navigator.getUserMedia({
    audio: true,
    video: true
  }, callback, onerror);

  function onerror(e) {
    console.error(e);
  }
}

var onSdpError  = function(e) {
  console.error('onSdpError', e);
}

var onSdpSucces = function() {
  console.log('onSdpSucces');
}

window.iceServers = {
  iceServers: [{
    url: 'stun:23.21.150.121'
  }]
};

var callerName = function(){
  return $('#caller').val()
}

var calleeName = function(){
  return $('#callee').val()
}

var myName = function(){
  return callerName()
}

