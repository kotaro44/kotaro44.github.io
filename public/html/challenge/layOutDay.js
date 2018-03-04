'use strict';

var calendar = {
  height: 700,
  width: 600,
};
var time_frame = {
  total: 720,
  starting_at: 9,
};

function layOutDay(events) {
  var hasError = false;
  var events = events.sort(function sortEvents(eventA, eventB) {
    return eventA.start - eventB.start;
  });

  /**
   * Prepare initial values for each event
   */
  events.forEach(function forEachEvent(event, index) {
    event.id = index;
    event.lefts = [];
    event.rights = [];
    event.mostRight = null;

    event.offset = {
      height: (event.end - event.start),
      top: event.start,
      right: 0,
      left: 0,
    };

    /**
     * Validate some values
     */
    if (event.start >= event.end) {
      alert('End value can\'t be higher than the start value');
      hasError = true;
    }

    if (event.end > time_frame.total) {
      alert('End value can\'t be higher than ' + time_frame.total);
      hasError = true;
    }

    if (event.start > time_frame.total - 1) {
      alert('Start value can\'t be higher than ' + (time_frame.total - 1) );
      hasError = true;
    }

    if (event.start < 0) {
      alert('Start value can\'t be less than 0');
      hasError = true;
    }

    if (event.end < 0) {
      alert('End value can\'t be less than 0');
      hasError = true;
    }
  });

  if (hasError) {
    return;
  }

  calculateOverlap(events);
  renderEvents(events);
};

function calculateOverlap(events) { 
  /**
   * Calculate all elements that are overlapping and will be at the left of this event
   * and calculate the margin of this specific event
   */
  events.forEach(function forEachEvent(eventA, indexA) {
    events.forEach(function forEachEvent(eventB, indexB) {
      if (indexB > indexA) {
        if (eventA.end > eventB.start && eventB.offset.left >= eventA.offset.left) {
          eventB.offset.left++;
          eventB.lefts.push(eventA);
        }
      }
    });
  });

  /**
   * Calculate all elements that are overlapping and will be at the right of this event
   */
  events.forEach(function forEachEvent(eventA, indexA) {
    events.forEach(function forEachEvent(eventB, indexB) {
      if (eventA !== eventB) {
        if (eventA.offset.left < eventB.offset.left && (eventA.end > eventB.start && eventA.start < eventB.end)) {
          eventA.rights.push(eventB);
        }
      }
    });
  });
};

function renderEvents(events) {
  var eventsWrapper = document.getElementById('events');
  var columns = getColumns(events);
  var block_size = calendar.width / columns;
  var minLeft = columns;
  var title = null;
  var description = null;

  eventsWrapper.innerHTML = '';

  events.forEach(function forEachEvent(event) {
    title = document.createElement('div');
    description = document.createElement('div');
    title.classList.add('title');
    description.classList.add('description');
    title.innerHTML = event.title || 'Sample Item';
    description.innerHTML = event.description || 'Sample Location';

    minLeft = columns;
    event.htmlElement = document.createElement('div');
    event.offset.right = columns;

    event.rights.forEach(function forEachRightEvent(eventB) {
      if (eventB.offset.left < minLeft) {
        minLeft = eventB.offset.left;
      }
    });
    
    event.offset.right = columns - minLeft;

    if (event.right) {
      event.offset.right += columns - ( event.offset.left + (event.right.offset.left - event.offset.left) );
    }

    event.htmlElement.classList.add('event');
    event.htmlElement.style.height = event.offset.height * (calendar.height / time_frame.total) + 'px';
    event.htmlElement.style.top = event.offset.top * (calendar.height / time_frame.total) + 'px';
    event.htmlElement.style.right = ( event.offset.right * block_size ) + 'px';  
    event.htmlElement.style.left =  ( event.offset.left * block_size ) + 'px'; 

    event.htmlElement.appendChild(title);
    event.htmlElement.appendChild(description);
    eventsWrapper.appendChild(event.htmlElement);
  });
};

function getColumns(events) {
  var max = 0;
  events.forEach(function forEachEvent(event) {
    if (event.offset.left > max) {
      max = event.offset.left;
    }
  });

  return max + 1;
};

function renderTimes() {
  var timeWrapper = document.getElementById('times');
  var time = null
  var half_time = null;
  var time_num = 0;

  for (var index = 1; index <= 13; index++) {
    time = document.createElement('div');
    half_time = document.createElement('div');
    time.classList.add('time-big');
    half_time.classList.add('time');
  
    time_num = (time_frame.starting_at + index - 2)%12 + 1;
    time.innerHTML = time_num + ':00<span>' + ((time_frame.starting_at + index - 1)/12 < 1 ? 'AM':'PM') + '</span>';
    half_time.innerHTML = time_num + ':30';

    timeWrapper.appendChild(time);
    if (index !== 13) {
      timeWrapper.appendChild(half_time);
    }
  }
};

window.onload = function onload() {
  renderTimes();

  /**
   * some Samples
   */

  /*layOutDay([
    {start: 0, end: 400},
    {start: 100, end: 300},
    {start: 350, end: 720},
    {start: 500, end: 720},
    {start: 0, end: 720},
  ]);*/

  /*layOutDay([
    {start: 0, end: 340},
    {start: 80, end: 360},
    {start: 160, end: 380},
    {start: 240, end: 400},
    {start: 320, end: 420},
    {start: 355, end: 500},
    {start: 550, end: 600},
  ]);*/

  /*layOutDay([
    {start: 0, end: 400},
    {start: 100, end: 300},
    {start: 350, end: 720},
    {start: 500, end: 720},
    {start: 0, end: 720},
  ]);*/

  /*layOutDay([
    {start: 0, end: 100, description: 'some random description'},
    {start: 100, end: 200},
    {start: 100, end: 400},
    {start: 200, end: 550},
    {start: 300, end: 400},
  ]);*/

  /*layOutDay([
    {start: 0, end: 60, title: 'Event one'},
    {start: 50, end: 150, title: 'Event two'},
    {start: 100, end: 250, title: 'Event three'},
    {start: 200, end: 270, title: 'Event four'},
    {start: 300, end: 350, title: 'Event five'},
  ]);*/

  layOutDay([ {start: 30, end: 150}, 
    {start: 540, end: 600}, 
    {start: 560, end: 620}, 
    {start: 610, end: 670} ]);
};
