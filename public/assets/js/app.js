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

    myVid.src = URL.createObjectURL(stream);
    myVid.play();
    $('#call').click(function(){
      createOffer(stream);
    })
  })
}) 


