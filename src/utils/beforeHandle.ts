const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function (key, newValue) {
  const setItemEvent: any = new Event("setItemEvent");
  setItemEvent[key] = newValue;
  window.dispatchEvent(setItemEvent);
  console.log('listen setitem======', key)
  originalSetItem.apply(this, [key, newValue]);
};