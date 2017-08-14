var left = 0;
var right = 0;


  function frame() {
    var element = document.querySelector('.item-right');
    left += 1;
    element. style.left = left + 'px';
    if (left >= 100) {
      clearInterval(id)
    }
  }


  function frameLeft() {
    var element = document.querySelector('.item-left');
    right += 1;
    element. style.right = right + 'px';
    if (right >= 100) {
      clearInterval(idRight)
    }
  }


  var id = setInterval(frame, 100)
  var idRight = setInterval(frameLeft, 100)


  $(document).ready(function() {
    $('#play-video').on('click', function(ev) {
   
      $("#video")[0].src += "&autoplay=1";
      ev.preventDefault();
   
    });
  });
  