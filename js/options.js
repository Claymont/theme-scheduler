if (localStorage.getItem('tsThemeEarly') === null) {
  localStorage['tsThemeEarly'] = ('firefox-compact-light@mozilla.org@personas.mozilla.org');
}
if (localStorage.getItem('tsThemeLate') === null) {
  localStorage['tsThemeLate'] = ('firefox-compact-dark@mozilla.org@personas.mozilla.org');
}
if (localStorage.getItem('tsHourEarly') === null) {
  localStorage['tsHourEarly'] = ('6');
}
if (localStorage.getItem('tsHourLate') === null) {
  localStorage['tsHourLate'] = ('18');
}

browser.management.getAll((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'theme') {
      continue;
    }
    let option = document.createElement('option');
    option.textContent = extension.name;
    option.value = extension.id;
    if (option.value === localStorage['tsThemeLate']) {
      option.selected = true;
    }
    tsThemeLate.appendChild(option);
  }
});

browser.management.getAll((extensions) => {
  for (let extension of extensions) {
    if (extension.type !== 'theme') {
      continue;
    }
    let option = document.createElement('option');
    option.textContent = extension.name;
    option.value = extension.id;
    if (option.value === localStorage['tsThemeEarly']) {
      option.selected = true;
    }
    tsThemeEarly.appendChild(option);
  }
});

var range = document.getElementById('range');

var startEarly;
  startEarly = localStorage.getItem('tsHourEarly');

var startLate;
  startLate = localStorage.getItem('tsHourLate');

noUiSlider.create(range, {
  start: [startEarly, startLate],
  step: 1,
  margin: 2,
  connect: [true, true, true],
  behaviour: 'tap-drag',
  tooltips: true,
  range: {
    'min': 0,
    'max': 23,
  },
  pips: {
    mode: 'values',
    values: [0, 6, 12, 18, 23],
    stepped: true,
    format: wNumb({
      decimals: 2,
      mark: ':',
    })
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

var valueLate = document.getElementById('tsHourLate'),
  valueEarly = document.getElementById('tsHourEarly');

range.noUiSlider.on('update', function( values, handle ) {
  if ( handle ) {
    valueLate.value = values[handle];
  } else {
    valueEarly.value = values[handle];
  }
});

document.getElementById("tsSaveId").addEventListener("click", function() {
  localStorage['tsThemeEarly'] = document.getElementById('tsThemeEarly').value;
  localStorage['tsThemeLate'] = document.getElementById('tsThemeLate').value;
  localStorage['tsHourEarly'] = document.getElementById('tsHourEarly').value;
  localStorage['tsHourLate'] = document.getElementById('tsHourLate').value;
  var page = browser.extension.getBackgroundPage();
  page.checkTime();
})