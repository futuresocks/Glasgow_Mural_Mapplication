var left = 0;
var right = 0;


  function frame() {
    var element = document.querySelector('.item-right');
    left += 1;
    element. style.left = left + 'px';
    if (left >= 150) {
      clearInterval(id)
    }
  }


  function frameLeft() {
    var element = document.querySelector('.item-left');
    right += 1;
    element. style.right = right + 'px';
    if (right >= 150) {
      clearInterval(idRight)
    }
  }


  var id = setInterval(frame, 120)
  var idRight = setInterval(frameLeft, 120)


  $(document).ready(function() {
    $('#play-video').on('click', function(ev) {
   
      $("#video")[0].src += "&autoplay=1";
      ev.preventDefault();
   
    });
  });
  