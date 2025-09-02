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


// navigationService.js
/* import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
export const navigate = (path) => history.push(path); */
