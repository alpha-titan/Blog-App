// import { Switch } from "react-router-dom"

export const initialstate = null;

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER": // add user to the state
      return action.payload;

    case "CLEAR":
      return null;
    default:
      return state;
  }
};
