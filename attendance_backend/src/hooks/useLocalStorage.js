import { useState } from "react";

const useLocalStorage = (key) => {
  function getValue(key) {
    return setStorageValue(localStorage.getItem(key));
  }

  function setValue(value) {
    localStorage.setItem(key, value);
  }
  return [getValue, setValue];
};

export default useLocalStorage;
