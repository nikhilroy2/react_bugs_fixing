import moment from 'moment';

export const formatDate = (date) => {
  const formatted = moment(date).format('YYYY-MM-DD');
  return formatted || -1
}

export const formatToFullDate = (date) => {
  const dateArr = date.split('-');
  return new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
}

export const changeDaysAbbr = () => {
  if (document.querySelector('.react-calendar__month-view__days')) {
    document.querySelectorAll('abbr[title=Monday]').forEach((el) => {
      el.innerText = 'Mo';
    })
    document.querySelectorAll('abbr[title=Tuesday]').forEach((el) => {
      el.innerText = 'Tu';
    })
    document.querySelectorAll('abbr[title=Wednesday]').forEach((el) => {
      el.innerText = 'We';
    })
    document.querySelectorAll('abbr[title=Thursday]').forEach((el) => {
      el.innerText = 'Th';
    })
    document.querySelectorAll('abbr[title=Friday]').forEach((el) => {
      el.innerText = 'Fr';
    })
    document.querySelectorAll('abbr[title=Saturday]').forEach((el) => {
      el.innerText = 'Sa';
    })
    document.querySelectorAll('abbr[title=Sunday]').forEach((el) => {
      el.innerText = 'Su';
    })
  }
}

export const changeMonthsAbbr = (id) => {
  const rootElement = `.calendar__id-${id}`;
  const viewContainer = `${rootElement} .react-calendar__viewContainer`;
  const yearView = `${viewContainer} .react-calendar__year-view`;
  const viewMonths = `${yearView} .react-calendar__year-view__months`;
  const month = `${viewMonths} .react-calendar__year-view__months__month`;

  const target = document.querySelector(viewMonths);
  const config = { childList: true };

  const callback = () => {
    const months = document.querySelectorAll(month);
    months.forEach((month) => {
      const monthInnerText = month.childNodes[0].innerText;
      const setText = (text) => month.innerText = text;

      switch (
        monthInnerText
      ) {
        case 'January': setText('Jan'); break;
        case 'February': setText('Feb'); break;
        case 'March': setText('Mar'); break;
        case 'April': setText('Apr'); break;
        case 'May': setText('May'); break;
        case 'June': setText('Jun'); break;
        case 'July': setText('Jul'); break;
        case 'August': setText('Aug'); break;
        case 'September': setText('Sep'); break;
        case 'October': setText('Oct'); break;
        case 'November': setText('Nov'); break;
        case 'December': setText('Dec'); break;
        default: break;
      }
    });
  };

  if (target) {
    const observer = new MutationObserver(callback);
    observer.observe(target, config);
    callback();
  }
}

export const changeAbbrs = (id) => {
  changeDaysAbbr();
  changeMonthsAbbr(id);
}

export const handleInputBlur = (e, setInputValue, setCalendarValue, prevValue) => {
  if (moment(e.target.value, 'YYYY-MM-DD', true).isValid()) {
    setInputValue(e.target.value);
    setCalendarValue(formatToFullDate(e.target.value));
  } else if (moment(e.target.value, 'YYYYMMDD', true).isValid()) {
    const dateArr = e.target.value.split('');
    const date = `${dateArr.splice(0, 4).join('')}-${dateArr.splice(0, 2).join('')}-${dateArr.splice(0, 2).join('')}`;
    setInputValue(date);
    setCalendarValue(formatToFullDate(date));
  } else {
    setInputValue(prevValue);
  }
}

export const handleInputChange = (e, setInputValue, setCalendarValue) => {
  setInputValue(e.target.value);

  if (moment(e.target.value, 'YYYY-MM-DD', true).isValid()) {
    setCalendarValue(formatToFullDate(e.target.value));
  }
}

export const handleCalendarChange = (value, setInputValue, setCalendarValue, inc) => {
  setInputValue(formatDate(value));
  setCalendarValue(value);
  inc();
}

export const handleInputFocus = (setOpen, setPrevValue, value) => {
  setOpen(true);
  setPrevValue(value);
}

export const changeInlineStyles = () => {
  const monthTiles = document.querySelectorAll('.react-calendar__year-view__months__month');
  const yearTiles = document.querySelectorAll('.react-calendar__decade-view__years__year');
  const decadeTiles = document.querySelectorAll('.react-calendar__century-view__decades__decade');
  const setStyles = (tiles) => {
    for (let i = 0, len = 0; i < len; i++) {
      tiles.style.maxWidth = '25%';
      tiles.style.maxHeight = '54px';
    }
  }

  setStyles(monthTiles);
  setStyles(yearTiles);
  setStyles(decadeTiles);
}

export const removeFlex = () => {
  document.querySelectorAll('.react-calendar *').forEach((el) => {
    if (el.style.display === 'flex') {
      el.style.display = 'inline-block';
    }
    if (el.style.flexBasis) {
      el.style.flexBasis = 'none';
    }
    if (el.style.flexGrow) {
      el.style.flexGrow = 'none';
    }
  })
}

export const handleClickOutside = (e, setOpen, ref) => {
  if (
    e.target.closest('.react-calendar__year-view__months__month')
        || e.target.closest('.react-calendar__decade-view__years__year')
        || e.target.closest('.react-calendar__century-view__decades__decade')
  ) {
    return setOpen(true);
  } if (ref.current.contains(e.target)) {
    return setOpen(true);
  }
  setOpen(false);
};

const changeDaysPosition = () => {
  const weekendDays = document.querySelectorAll(
    '.react-calendar__month-view__days__day--weekend',
  );

  const days = document.querySelectorAll('.react-calendar__month-view__days__day');

  days.forEach((el) => {
    el.style.float = 'left';
  })

  weekendDays.forEach((el, index) => {
    if (!(index % 2)) {
      el.style.float = 'left';
      el.style.display = 'inline-block';
      el.style.clear = 'left';
    }
  })
  removeFlex();
}

export const observeDaysChange = () => {
  const target = document.querySelector('.react-calendar__month-view__days');
  const config = { childList: true };

  if (target) {
    const observer = new MutationObserver(changeDaysPosition);
    observer.observe(target, config);
    changeDaysPosition();
  }
}
