export const getKeyEvent = (event, submitFunction) => {
  if ((event.keyCode === 13 || event.key === 'NumpadEnter') && event.target.type !== 'textarea') {
    return submitFunction();
  }
};
