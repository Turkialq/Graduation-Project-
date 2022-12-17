import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextProps = {
  loginUser: (e: any) => void;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthTokens] = useState<any>(() => {
    localStorage.getItem("authToken") &&
      JSON.stringify(localStorage.getItem("authToken") || "{}");
  });

  const [user, setUser] = useState<any>(
    localStorage.getItem("authToken") &&
      JSON.parse(localStorage.getItem("authToken") || "{}")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fiveMinutes = 1000 * 60 * 5;
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fiveMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  const registerUser = async (
    event: any,
    name: string,
    fatherName: string,
    familyName: string,
    email: string,
    password: string,
    gender: string,
    intrest: string,
    major: string,
    university: string
  ) => {
    event.preventDefault();

    const url = "http://localhost:8080/register";
    const data = JSON.stringify({
      name,
      fatherName,
      familyName,
      email,
      password,
      gender,
      intrest,
      major,
      university,
    });
    console.log(JSON.parse(data));
    // const headers = { "Content-Type": "application/json" };

    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: data,
    // });

    // if (response.status === 200) {
    //   navigate("/");
    // } else {
    //   alert("something went wrong");
    // }
  };
  const loginUser = async (e: any) => {
    e.preventDefault();

    const url = "http://localhost:8080/login";
    const data = JSON.stringify({
      username: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(data);
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    const info = await response.json();
    console.log(info);
    if (response.status === 200) {
      setAuthTokens(info);
      setUser(JSON.stringify(info.access));
      localStorage.setItem("authToken", JSON.stringify(info));
      navigate("/file-search");
    } else {
      alert("something went wrong");
    }
  };

  const logout = async () => {
    const url = "http://localhost:8080/logout";
    const data = JSON.parse(localStorage.getItem("authToken")!)["refreshToken"];
    const realData = JSON.stringify(data);

    const response = await fetch(url, {
      method: "DELETE",
      body: realData,
    });
    if (response.status === 204) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authToken");
      navigate("/");
    } else {
      alert("Cant logout");
    }
  };

  const updateToken = async () => {
    console.log("Update token");
    const url = "http://localhost:8080/refresh-token";
    const data = JSON.stringify({
      refresh: authToken.refreshToken,
    });
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    const info = await response.json();

    if (response.status === 200) {
      setAuthTokens(info);
      setUser(JSON.stringify(info.access));
      localStorage.setItem("authToken", JSON.stringify(info));
    } else {
      logout();
    }
  };

  const contextData = {
    user: user,
    loginUser: loginUser,
    logout,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
