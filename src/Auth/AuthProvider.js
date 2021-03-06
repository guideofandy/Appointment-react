import { createContext, useEffect, useState } from "react"
import DataAdmin from "../Helpers/loginAdmin.json";
export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    try{
      localStorage.setItem("user",JSON.stringify(user));
    }catch(e){
      localStorage.removeItem("user");
    }
  }, [user]);
  

  const contextValue = {
    user,
    login(type,data) {
      if (type === "D"){
        setUser(data);
      }else if(type === "P"){
        setUser(data);
      }else if (type === "A"){
        setUser(DataAdmin)
      }
    },
    setUser,
    logout() {
      setUser(null);
      localStorage.removeItem("user");
    },
    isLogged() {
      return !!user;
    },
  };

  return (<AuthContext.Provider value={contextValue}>
    {children}
  </AuthContext.Provider>)
}


export default AuthProvider;
