$(document).ready(function() {
  
  const $textarea = $('#tweet-text');
  const $count = $('#count');

  //update Tweet character counter
  $textarea.on('input', function(event) {
    //count remaining characters
    const charRemaining = 140 - $('#' + this.id).val().length;

    //update count
    $count.text(charRemaining);

    //change color to red if count is negative
    if (charRemaining < 0) {
      $count.addClass("negative");
    } else {
      $count.removeClass("negative");
    }
  });
});
