// UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState({ exists: false, user: null });
  useEffect(() => {
    const storedUserData = window.sessionStorage.getItem("user");
    console.log("usercontext:",storedUserData);
    if(storedUserData==null){
      setUserData({ exists: false, user: null});
    }
    else if(!storedUserData.exists){
      setUserData({ exists: true, user: JSON.parse(storedUserData) });
    }
    
    setPending(false);
  }, []);

  console.log("UserContext", userData);

  if (pending)
    return (
      <div style={{ position: "absolute", width: "100vw", height: "100vh" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            margin: "0 auto",
            marginTop: "25%",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
