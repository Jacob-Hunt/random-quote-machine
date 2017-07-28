FADE_TIME = 800;

current_quote = "";

$(document).ready(function(){
  var c = randColor();
  fadeFontColor("#quote-box", c, FADE_TIME);
  fadeBgColor("body", c, FADE_TIME);
  $("#quote-box").removeClass("invisible");
  $("#quote-box").addClass("animated fadeIn");
  $("#btn-quote").removeClass("invisible");
  $("#btn-quote").addClass("animated bounceInDown");
  $("#btn-tweet").removeClass("invisible");
  $("#btn-tweet").addClass("animated bounceInDown");
});

function randomQuote(passCount, tryLimit){
  /* Try up to <tryLimit> times to get json from API
     and, if successful, display */

  // switch to spinner icon while loading
  $("#quote-icon").removeClass("fa-quote-right")
                  .addClass("fa-circle-o-notch fa-refresh fa-spin");

  $.getJSON("https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/"
          + "1.0/?method=getQuote&key=457653&format=json&lang=en")
  .done(function(data){

      $("#quote-icon").removeClass("fa-circle-o-notch fa-refresh fa-spin")
                      .addClass("fa-quote-right");

      setTimeout(function(){
        if (!data.quoteAuthor){
          var author = "Unknown";
        } else {
          var author = data.quoteAuthor;
        }

        c = randColor();
        fadeFontColor("#quote-box", c, FADE_TIME);
        fadeBgColor("body", c, FADE_TIME);
        current_quote = encodeURIComponent(data.quoteText + "\n -- " + author);
        $("#quote-box").html(data.quoteText + "<br />--" + author);
        $("#quote-box").removeClass("fadeOut");
        $("#quote-box").addClass("animated fadeIn");
      }, 800)

  })
  .fail(function(){
      if (passCount < tryLimit){
          randomQuote(passCount + 1, tryLimit);
      } else {
        setTimeout( function(){
          $("#quote-icon").removeClass("fa-circle-o-notch fa-refresh fa-spin")
                          .addClass("fa-quote-right");
          c = randColor();
          fadeFontColor("#quote-box", c, FADE_TIME);
          fadeBgColor("body", c, FADE_TIME);
          $("#quote-box").html("ERROR: API not responding; try again later");
          $("#quote-box").removeClass("fadeOut");
          $("#quote-box").addClass("animated fadeIn");
        }, 40)
      }
  });
}

function tweet(){
  /* Share quote on twitter */
  window.open("https://twitter.com/intent/tweet?text=" + current_quote, "_blank");
}

function randomArrayItem(array){
  /* Return a random item from an array */
  return array[Math.floor(Math.random()*array.length)];
}

function randRange(min, max) {
  /* Returns a random number in the provided range */
  return Math.floor(Math.random() * (max - min) + min);
}


function randColor(){
  /* Generates a random color */
  r = randRange(60, 256).toString(16);
  g = randRange(60, 256).toString(16);
  b = randRange(60, 256).toString(16);
  
  return "#"+r+g+b;
}

function fadeFontColor(selector, color, time){
  $(selector).animate({
      color: color,
  }, time);
}

function fadeBgColor(selector, color, time){
  $(selector).animate({
      backgroundColor: color,
  }, time);
}
