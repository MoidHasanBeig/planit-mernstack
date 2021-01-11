import React,{ useState,useContext } from 'react';

const StateContext = React.createContext();

export const useStateContext = () => useContext(StateContext);

const StateProvider = (props) => {
  const { children } = props;
  const [state,setState] = useState({});

  return (
    <StateContext.Provider value={{state,setState}}>
      { children }
    </StateContext.Provider>
  );
}

export default StateProvider;
