import { Middleware } from "@reduxjs/toolkit";
import { hideProfileCard } from "../userSlice";

export const clickOutsideMiddleware: Middleware = (store) => {
  // Set up event listener
  document.addEventListener("mousedown", (event: MouseEvent) => {
    const state = store.getState();
    if (
      state.user.isProfileCardVisible &&
      event.target instanceof Element &&
      !event.target.closest(".profile-card") &&
      !event.target.closest(".profile-image-container")
    ) {
      store.dispatch(hideProfileCard());
    }
  });

  // Return middleware function
  return (next) => (action) => {
    return next(action);
  };
};
