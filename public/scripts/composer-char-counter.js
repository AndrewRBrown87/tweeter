$(document).ready(function() {
  
  const $textarea = $('#tweet-text');
  const $count = $('#count')

  $textarea.on('input', function(event){
    const charRemaining = 140 - $('#' + this.id).val().length;

    $count.text(charRemaining);

    if(charRemaining < 0) {
      $count.addClass("negative");
    } else {
      $count.removeClass("negative");
    }
  })

});
