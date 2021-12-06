import { useState, useEffect } from 'react';

import { getMedianArray } from '../helpers';

const RtLength = routesLength => {
  const isClient = typeof window === 'object';

  const getSize = () => {
    // Получаем значения из разметки нашего Navbar
    const rightNavbar = document.getElementById('navbar-right');
    const leftNavItems = document.querySelectorAll('#navbar-left .navLink');
    const arrFromItems = [...leftNavItems]?.map((item) => item.offsetWidth);
    const medianOfIItems = getMedianArray(arrFromItems);

    // Инициализируем значение для хука, по дефолту добавляем фиксированные
    const initialState = {
      rightMenuWidth: (rightNavbar?.offsetWidth > 300 ? rightNavbar?.offsetWidth : 300) || 300,
      itemMedianWidth: (medianOfIItems > 100 ? medianOfIItems : 100) || 100,
    };

    return {
      width: isClient ? window.innerWidth : undefined,
      // В зависимости от размера окна вычетаем ширину правого навбара
      // и делим на среднее значение одного из Menu Link левого навбар
      // в итоге вычетаем из длины всех роутов, это нужно для ROUTES() из utils
      widthItems: RtLength - Math.round((window.innerWidth - initialState.rightMenuWidth) / initialState.itemMedianWidth),
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    // Обработчик событий при изменении размера окна
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RtLength]);

  return windowSize;
};
export default RtLength