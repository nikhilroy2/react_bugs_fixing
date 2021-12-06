import qs from 'qs';

export const setQueryStringValue = (key, tab, history, location, setActiveValue) => {
  const queryString = qs.parse(location.search.slice(1));
  const savedPageSize = queryString.page_size ?? '';
  queryString[tab] = key;

  if (key === -1) {
    setActiveValue(-1);
    location.search = qs.stringify(
      savedPageSize ? { page_size: savedPageSize } : '',
    )
    return history.push(
      `${location.pathname}?${(location.search)}`,
    );
  }

  if (queryString.page) {
    delete queryString.page;
  }

  setActiveValue(key);
  history.push(`${location.pathname}?${(location.search = qs.stringify(queryString))}`);
};
