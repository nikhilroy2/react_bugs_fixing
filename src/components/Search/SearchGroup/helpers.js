const GetFormatted = {
  queryWithType: (searchQuery, type) => `?query=${searchQuery}&search_type=${type}`,
  query: (searchQuery) => `?query=${searchQuery}`,
  includeQuery: (location, query) => `${location.pathname}${location.search = query}`,
  haveSearch: (location, query) => `${location.pathname}${query}`,
  clearQuery: (location) => `${location.pathname}${location.search = ''}`,
};

export const searchRequest = (searchQuery, query, location, history) => {
  if (searchQuery === '') {
    return history.push(GetFormatted.clearQuery(location));
  }

  if (location.search === '') {
    return history.push(`${location.pathname}${query}`);
  }

  if (location.search.includes('query')) {
    return history.push(GetFormatted.includeQuery(location, query));
  }

  if (location.search) {
    return history.push(GetFormatted.haveSearch(location, query));
  }
}

export const detectQueryValue = (haveOptions, withSelect, searchQuery, type) => {
  let query;

  if (haveOptions && withSelect) {
    query = GetFormatted.queryWithType(searchQuery, type);
  } else {
    query = GetFormatted.query(searchQuery);
  }

  return query;
}
