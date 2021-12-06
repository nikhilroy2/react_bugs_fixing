export const handleKeyPress = (e, setOpen) => {
  if (e.key === 'Escape') {
    setOpen(false);
  }
};

export const handleClickOutside = (e, setOpen, ref) => {
  if (ref && ref.current && ref.current.contains(e.target)) {
    return;
  }

  setOpen(false);
};
