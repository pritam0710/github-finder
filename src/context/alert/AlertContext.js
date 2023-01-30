import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [state, dispatch] = useReducer(alertReducer, null);

  //set alert
  function setAlert(type, msg) {
    dispatch({
      type: "SET_ALERT",
      payload: { type, msg },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
