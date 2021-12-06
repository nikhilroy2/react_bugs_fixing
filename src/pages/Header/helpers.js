export const getPartsOfArray = (arr, index) => {
  if (typeof index !== 'number' || !Array.isArray(arr)) return arr;

  return index < 0 ? arr.slice(index) : arr.slice(0, index);
};

export const isActiveNavbarLink = (link, activeLink) => {
  if (Array.isArray(activeLink)) return link.includes(activeLink[0]);
  return link.includes(activeLink);
};

export const getMedianArray = (arr) => {
  const mid = Math.floor(arr.length / 2); // Находим серидину массива
  const nums = [...arr].sort((a, b) => a - b); // Сортируем полученный массив по возрастанию
  return arr.length % 2 !== 0 ? Math.round(nums[mid]) : Math.round((nums[mid - 1] + nums[mid]) / 2); // В зависимости от остатка от деления на 2 возвращаем нужное значение
};
