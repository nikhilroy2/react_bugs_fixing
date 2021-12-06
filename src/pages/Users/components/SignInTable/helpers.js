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
