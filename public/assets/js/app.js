$(function(){
  getUserMedia(function(stream){

    socket.on('connected', function(data){
      console.log('connected :)')
    })

    socket.on('incoming_sdp_offer', function(data){
      if(data.name === myName()){
        offer = new RTCSessionDescription({
          sdp:data.sdp,
          type:'offer'
        })
        receiveOffer(offer, stream)
      }
    })

    socket.on('incoming_sdp_answer', function(data){
      if(data.name === calleeName()){
        answer = new RTCSessionDescription({
          sdp:data.sdp,
          type:'answer'
        })
        receiveAnswer(answer)
      }
    })

    socket.on('incoming_ice_candidate', function(data){
      if(data.name != calleeName()){
        console.log(new RTCIceCandidate(data.candidate))
        console.log('sadfsdfsd')
        peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    })

    myVid.src = URL.createObjectURL(stream);
    myVid.play();
    $('#call').click(function(){
      createOffer(stream);
    })
  })
}) 


