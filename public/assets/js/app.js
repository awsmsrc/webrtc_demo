$(function(){
  var socket = io.connect('http://localhost');
  socket.on('connected', function(data){
    console.log('connected :)')
  })

  socket.on('incoming_sdp_offer', funtion(data){
    console.log('incoming_sdp_offer', data)
  })

  socket.on('incoming_sdp_answer', funtion(data){
    console.log('incoming_sdp_offer', data)
  })

  getUserMedia(function(stream){
    myVid.src = URL.createObjectURL(stream);
    myVid.play();
    $('#call').click(function(){
      createOffer(stream);
    })
  })
}) 


