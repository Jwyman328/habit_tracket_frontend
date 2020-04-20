import React, {useState, useContext} from 'react';
import GlobalContext from '../../../context/globalContext'

function useGetLoginPageState() {
    const [usernamePassword, setUsernamePassword] = useState({
        username: "",
        password: "",
      });

      const inputChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
    
        let newUsernamePassword = { ...usernamePassword };
        newUsernamePassword[name] = value;
        setUsernamePassword(newUsernamePassword);
      };

      const loginContext = useContext(GlobalContext);
      const {logIn} = loginContext
    return {usernamePassword, setUsernamePassword,inputChangeHandler,logIn }

    
}

export default useGetLoginPageState;