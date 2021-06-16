import { createContext, useReducer } from "react";

let DatabaseContext = createContext();
export default DatabaseContext;
let initialState = {
item:{}

};
function reducer(state, action) {
  switch (action[0]) {
    case "add_item":
      return {
        item: {...action[1]},
      };

   
    default:
      return state;
  }
}

export function DatabaseProvider(props) {
  let [databaseState, dispatch] = useReducer(reducer, initialState);
  return (
    <DatabaseContext.Provider
      value={{
        databaseState,
        dispatch,
      }}
    >
      {props.children}
    </DatabaseContext.Provider>
  );
}
