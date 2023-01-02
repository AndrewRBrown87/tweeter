$(document).ready(function() {

  //on scroll display back-to-top-button
  $(document).scroll(function() {
    $("#back-to-top-button").show();
    $("#new-tweet-button").hide();
    $(".arrows").hide();

    //if scrolled to top of page display new-tweet-button
    if ($(document).scrollTop() === 0) {
      $("#back-to-top-button").hide();
      $("#new-tweet-button").show();
      $(".arrows").show();
    }
  });

  //back-to-top-button functionality
  $('#back-to-top-button').click(function() {
    $(document).scrollTop(0);
    $('.new-tweet').slideDown();
    $('#tweet-text').focus();
  });
});