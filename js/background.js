function options(details) {
  if (details.reason === 'install') {
    browser.tabs.create({url: 'options.html'});
  }
}

browser.runtime.onInstalled.addListener(options);

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  if ((hours >= localStorage.tsHourEarly) && (hours < localStorage.tsHourLate)) {
    browser.management.setEnabled(''+localStorage.tsThemeEarly+'', true);
  } else {
    browser.management.setEnabled(''+localStorage.tsThemeLate+'', true);
  }
}

checkTime();

browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});