import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiUrlDB } from "../lib/functions";
//@ts-ignore
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      await axios
        .get(`${apiUrlDB}/api/auth/check`, { withCredentials: true })
        .then((res) => {
          setAuthUser(res?.data?.user);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.message);
        });
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
