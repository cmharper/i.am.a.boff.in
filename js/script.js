"use strict";

// define dates
var weekday = [];
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

var months = [];
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";

// set the progress of the bar
var p = 0;
// get the number of phrases and set the last one seen
var phrases = document.getElementById('words');
var phrases_length = phrases.children.length;
var last_phrase;

// pad any time elements
function padTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// update the time
function startTime() {
    var today = new Date();
    document.getElementById('date-ribbon-day').innerHTML = weekday[today.getDay()].toUpperCase();
    document.getElementById('date-ribbon-date').innerHTML = today.getDate();
    document.getElementById('date-ribbon-month').innerHTML = months[today.getMonth()].toUpperCase();
    document.getElementById('date-ribbon-time').innerHTML = today.getHours() + ":" + padTime(today.getMinutes());
    setTimeout('startTime()', 5000);
}

// define a function to resize the website
function resize_the_website() {
    var page_height = window.innerHeight;
    var phrase_height = document.getElementById('phrase').clientHeight;
    // get the top margin
    var div = document.getElementById("main");
    var style = div.currentStyle || window.getComputedStyle(div);
    var offset = parseInt(style.marginTop);
    // alter the calculated page_height
    page_height -= offset;
    if ( phrase_height >= page_height - ( 3 * offset ) ) { page_height = phrase_height + offset; }
    else { 
        // calculate the footer offset
        div = document.getElementById("main");
        style = div.currentStyle || window.getComputedStyle(div);
        offset += parseInt(style.marginTop);
        page_height -= offset; 
    }
    // re-size the page
    document.getElementById('main').setAttribute("style", "height:" + ( page_height ) + "px");
}

// set the opacity of an element
function setOpacity(eID, opacityLevel) {
    var eStyle = document.getElementById(eID).style;
    eStyle.opacity = opacityLevel / 100;
    eStyle.filter = 'alpha(opacity=' + opacityLevel + ')';
}

// fade an element in
function fadeIn(eID) {
    setOpacity(eID, 0);
    var timer = 0;
    var i;
    for (i = 1; i <= 100; i += 1) {
        setTimeout("setOpacity('" + eID + "'," + i + ")", timer * 15);
        timer += 1;
    }
}

// define which phrase is displayed
function speak() {
    // make sure the phrase isn't the same as the last one
    var x = -1;
    while (x === last_phrase || x === -1) {
        x = Math.floor(Math.random() * (phrases_length));
    }
    // fade the words in and display the new phrase
    fadeIn("words");
    // hide the last phrase
    if (last_phrase !== undefined) {
        phrases.children[last_phrase].style.display = 'none';
    }
    // show the next phrase
    phrases.children[x].style.display = 'block';
    // reset the last phrase
    last_phrase = x;
    // resize the website
    resize_the_website();
}

// define the progress meter
function progress() {
    // if the progress meter is at zero then get a new phrase to display
    if (p === 0) {
        speak();
    }
    // if the progress meter is passed 90% then reset it
    if (p >= 90) {
        p = 0;
    } else {
        // otherwise increase the bar size
        p += 1;
    }
    document.getElementById('loading').style.width = p + "%";
    // wait 111ms before running progress again
    setTimeout("progress()", 111);
}

// resize the window now and add a listener to resize it again if the window is resized
window.addEventListener('resize', function () {
    resize_the_website();
}, true);

// start the progress bar
progress();

// start the time
startTime();
