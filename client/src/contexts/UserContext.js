import { createContext, useContext, useReducer } from "react";
import { initialstate, reducer } from "../reducers/reducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
