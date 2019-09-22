const developerMode = false;
const debug = document.getElementById('debug');
const log = msg => {
  if (developerMode) {
    debug.innerHTML += JSON.stringify(msg) + '<br>';
  }
  console.log(msg);
};

log('developer mode enabled');

var theme;
var twelveHr;
var monthFormat;
var weekdayFormat;

try {
  theme = typeof Usertheme == 'undefined' ? 'dark' : Usertheme;
  twelveHr = typeof UsertwelveHr === 'undefined' ? false : UsertwelveHr;
  monthFormat = typeof UsermonthFormat === 'undefined' ? 'long' : UsermonthFormat;
  weekdayFormat = typeof UserweekdayFormat === 'undefined' ? 'long' : UserweekdayFormat;
} catch (error) {
  developerMode = true;
  log('Uh oh. Something went wrong with your settings. Try resetting all your options to fix it.');
  developerMode = false;
}

(options => {
  // UI Elements
  log(options);
  const UI = {
    debug: document.getElementById('debug'),
    timeContainer: document.getElementById('time'),
    dateContainer: document.getElementById('date'),
  };

  const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const longMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const shortWeekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const longWeekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getMonth = i => {
    return options.monthFormat == 'long' ? longMonthNames[i] : shortMonthNames[i];
  };

  const getWeekday = (i, fmt = false) => {
    if (fmt) {
      return fmt == 'long' ? longWeekdayNames[i] : shortWeekdayNames[i];
    }
    return options.weekdayFormat == 'long' ? longWeekdayNames[i] : shortWeekdayNames[i];
  };

  const getSuper = day => {
    switch (day) {
      case '1':
      case '21':
      case '31':
        return 'st';
      case '2':
      case '22':
        return 'nd';
      case '3':
      case '23':
        return 'rd';
      default:
        return 'th';
    }
  };

  const getHour = hr => {
    if (options.twelveHr) {
      // Actual 12 hour time.
      hr = hr >= 12 ? hr % 12 : hr;
      hr = hr == 0 ? 12 : hr;
    } else {
      // add leading zeroes to hour if less than 10
      hr = hr < 10 ? (hr = '0' + hr) : hr;
    }
    return hr;
  };

  const getMeridiem = hr => {
    if (options.twelveHr) {
      if (hr >= 12) {
        return 'PM';
      }
      return 'AM';
    }
    return '';
  };

  const getMinute = min => {
    return min < 10 ? '0' + min : min;
  };

  const getSeconds = sec => {
    return sec < 10 ? '0' + sec : sec;
  };

  const applyOptions = options => {
    if (options.theme !== 'dark') {
      UI.dateContainer.style.color = 'black';
      UI.timeContainer.style.color = 'black';
    }
  };

  const tick = () => {
    // Time Elements
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const weekday = today.getDay();
    const hour = today.getHours();
    const min = today.getMinutes();

    UI.timeContainer.innerHTML = getHour(hour) + ':' + getMinute(min);
    UI.dateContainer.innerHTML = getWeekday(weekday) + ', ' + getMonth(month) + ' ' + date;
  };

  applyOptions(options);
  tick();
  setInterval(tick, 500);
})({
  theme,
  twelveHr,
  monthFormat,
  weekdayFormat,
});
