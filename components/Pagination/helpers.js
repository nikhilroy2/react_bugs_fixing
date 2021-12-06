import _ from 'lodash';
import qs from 'qs';

export const formatedStringCounters = (currentPage, pageSize, itemsCount) => {
  const from = currentPage > 1 ? `${currentPage * pageSize + 1 - pageSize}` : '1';
  const to = itemsCount >= 1 && itemsCount > currentPage * pageSize ? currentPage * pageSize : itemsCount;
  const stringCounter = `${from} to ${to} of ${itemsCount}`;
  return stringCounter;
};

export const generateQueryString = (location, n) => {
  const detectQuery = _.isEmpty(_.pickBy(qs.parse(location.search.slice(1))));
  const pageSearch = detectQuery ? `?page=${n}` : `&page=${n}`;
  const hasQueryPage = _.has(qs.parse(location.search.slice(1)), 'page');
  return {
    pageSearch,
    hasQueryPage,
  };
};

export const makePaginationArray = (totalPages, numberPage, pagesLimit) => {
  let startPage = 0;
  let endPage = 0;
  const limit = pagesLimit || 10;

  if (totalPages <= limit) {
    startPage = 1;
    endPage = limit;
  } else {
    if (numberPage + 2 < limit) {
      startPage = 1;
      endPage = limit;
    } else if (numberPage + 4 >= totalPages) {
      startPage = totalPages - limit + 1;
      endPage = totalPages;
    } else {
      startPage = numberPage - limit / 2;
      endPage = numberPage + (limit / 2 - 1);
    }
  }

  const pages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

  return pages;
};
