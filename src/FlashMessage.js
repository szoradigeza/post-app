import { useState } from "react";

const setFlashMessage = (message) => {
  setFlashMessage(message);
  setTimeout(() => {
    setFlashMessage(null);
  }, 1600);
};
