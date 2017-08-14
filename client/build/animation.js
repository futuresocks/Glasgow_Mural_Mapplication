var left = 0;
var right = 0;
var top = 0;

  function frame() {
    var element = document.querySelector('.item-right');
    left += 1;
    element. style.left = left + 'px';
    if (left >= 800) {
      clearInterval(id)
    }
  }


  function frameLeft() {
    var element = document.querySelector('.item-left');
    right += 1;
    element. style.right = right + 'px';
    if (right >= 800) {
      clearInterval(idRight)
    }
  }

  var id = setInterval(frame, 8)
  var idRight = setInterval(frameLeft, 8)


  