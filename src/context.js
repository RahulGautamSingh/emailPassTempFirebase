import { createContext, useReducer } from "react";

let DatabaseContext = createContext();
export default DatabaseContext;
let initialState = {
  user:{},
};
function reducer(state, action) {
  switch (action[0]) {
    case "curr_user":
      return {
        user: {...action[1]},
      };

    // case "curr_room":
    //     return{
    //     user:state.user,
    //     room:action[1]
    // }

    // case "set_database":
    //     return{
    //         user:action[1].user,
    //         room:action[1].room
    //     }
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
