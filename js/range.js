var range = document.getElementById('range');

var start;
if (localStorage.getItem('noUiSlider') == null) {
  start = [8, 20];
} else {
  start = localStorage.getItem('noUiSlider').split(","),
function (value) {
  return parseFloat(value, 1);
  };
}

var startEarly;
if (localStorage.getItem('tsHourEarly') === null) {
  startEarly = 7
} else {
  startEarly = localStorage.getItem('tsHourEarly')
}

var startLate;
if (localStorage.getItem('tsHourLate') === null) {
  startLate = 17
} else {
  startLate = localStorage.getItem('tsHourLate')
}

noUiSlider.create(range, {
  start: [startEarly, startLate],
  step: 1,
  margin: 2,
  connect: [true, true, true],
  behaviour: 'tap-drag',
  tooltips: true,
  range: {
    'min': 1,
    'max': 23,
  },
  format: wNumb({
    decimals: 0,
  })
});

var connect = range.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color'];

for ( var i = 0; i < connect.length; i++ ) {
  connect[i].classList.add(classes[i]);
}

var valueInput = document.getElementById('tsHourLate'),
  valueSpan = document.getElementById('tsHourEarly');

range.noUiSlider.on('update', function( values, handle ) {
  if ( handle ) {
    valueInput.value = values[handle];
  } else {
    valueSpan.innerHTML = values[handle];
  }
});

document.getElementById('tsHourEarly').innerHTML = localStorage['tsHourEarly'];
document.getElementById('tsHourLate').value = localStorage['tsHourLate'];

valueInput.addEventListener('change', function() {
  range.noUiSlider.set([tsHourLate, tsHourEarly]);
});