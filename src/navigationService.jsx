// navigationService.js
let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (path) => {
  if (navigator) {
    navigator(path);
  }
};
