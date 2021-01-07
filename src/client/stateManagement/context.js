import React,{ useState,useContext } from 'react';

const StateContext = React.createContext();

export const useStateContext = () => useContext(StateContext);

const StateProvider = (props) => {
  const [state,setState] = useState({});

  return (
    <StateContext.Provider value={{state,setState}}>
      {props.children}
    </StateContext.Provider>
  );
}

export default StateProvider;
