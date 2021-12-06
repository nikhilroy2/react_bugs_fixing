import _ from 'lodash';

export const changeTitle = (selected, options, setTitle, title) => {
  if (selected.length !== options.length) {
    return setTitle(`${title} (${selected.length})`);
  }
  setTitle(`All ${title.toLowerCase()}`);
}

export const handleClick = (selected, item, setSelected) => {
  const index = _.findIndex(selected, (elem) => elem === item.title);

  if (!item.emptySelect) {
    if (index === -1) {
      setSelected((prev) => [...prev, item.title]);
    } else {
      selected.splice(index, 1);
      setSelected([...selected]);
    }
  }
}

export const handleKeyPress = (e, setOpen) => {
  if (e.key === 'Escape') {
    setOpen(false);
  }
}

export const handleClickOutside = (e, setOpen, ref) => {
  if (e.target.classList.contains('select__button')) {
    return setOpen(false);
  }
  if (ref.current.contains(e.target)) {
    return setOpen(true);
  }
  setOpen(false);
};
