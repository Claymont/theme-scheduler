if (localStorage.getItem('tsThemeEarly') === null) {
  localStorage['tsThemeEarly'] = ('firefox-compact-light@mozilla.org@personas.mozilla.org');
}
if (localStorage.getItem('tsThemeLate') === null) {
  localStorage['tsThemeLate'] = ('firefox-compact-dark@mozilla.org@personas.mozilla.org');
}
if (localStorage.getItem('tsHourEarly') === null) {
  localStorage['tsHourEarly'] = ('7');
}
if (localStorage.getItem('tsHourEarlySubOne') === null) {
  localStorage['tsHourEarlySubOne'] = ('6');
}
if (localStorage.getItem('tsSubOne') === null) {
  localStorage['tsSubOne'] = ('1');
}
if (localStorage.getItem('tsHourLate') === null) {
  localStorage['tsHourLate'] = ('17');
}

document.getElementById('tsThemeEarly').value = localStorage['tsThemeEarly'];
document.getElementById('tsThemeLate').value = localStorage['tsThemeLate'];

document.getElementById('tsHourEarly').innerHTML = localStorage['tsHourEarly'];
document.getElementById('tsHourLate').value = localStorage['tsHourLate'];

document.getElementById("tsSaveId").addEventListener("click", function() {
  localStorage['tsThemeEarly'] = document.getElementById('tsThemeEarly').value;
  localStorage['tsThemeLate'] = document.getElementById('tsThemeLate').value;
  localStorage['tsHourEarly'] = document.getElementById('tsHourEarly').innerHTML;
  localStorage['tsHourLate'] = document.getElementById('tsHourLate').value;
  localStorage.tsHourEarlySubOne = localStorage.tsHourEarly - localStorage.tsSubOne;
  var page = browser.extension.getBackgroundPage();
  page.checkTime();
})