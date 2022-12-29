/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // clear the tweets container
    $('#tweets-container').empty();

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }

  //escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Takes in a tweet object and is responsible for returning a tweet <article> element
  const createTweetElement = function(tweetObject) {
    const $tweetArticle = $(`
      <article class="tweet">
        <header>
          <div class="username">
            <div><img src=${tweetObject.user.avatars} alt="Avatars Icon"></div>
            <div>&nbsp&nbsp${tweetObject.user.name}</div>
          </div>
          <div class="handle">${tweetObject.user.handle}</div>
        </header>
        <div class="tweet-data">
          ${escape(tweetObject.content.text)}
        </div>
        <footer>
          <div>${timeago.format(tweetObject.created_at)}</div>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweetArticle;
  }

  //grab the new tweet form
  const $form = $('#new-tweet-form');

  //register a callback for the submit event
  $form.on('submit', (event) => {
    event.preventDefault();
    const data = $form.serialize();
    const text = $('#tweet-text').val();
    
    if (text === null || text === "") {
      $('#error-message').text("Error! Tweet is empty.")
      $('.error').slideDown();
    } else if (text.length > 140) {
      $('#error-message').text("Error! Tweet exceeds 140 characters.")
      $('.error').slideDown();
    } else {
      //clear the tweet form
      $('#tweet-text').val('');
      $('#count').val("140");
      $('.error').slideUp();
      $.post('/tweets', data, (response) => {
        loadTweets();
      });
    }
  });

  //get the list of tweets 
  const loadTweets = function() {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    });
  };

  loadTweets();

  //New tweet button functionality
  $('#new-tweet-button').click(function(){
    if($('.new-tweet').css('display') !== 'block') {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
    } else {
      $('.new-tweet').slideUp();
    }
    
  });

});