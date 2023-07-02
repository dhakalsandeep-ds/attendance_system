import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: email,
      password: password,
    });

    let response = await fetch("http://localhost:8000/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    let success = data.success;

    if (!success) {
      return data;
    }
    localStorage.setItem("token", data.result.token);
    localStorage.setItem("email", email);

    console.log("redirecting ....");

    navigate("/admin/batch", { replace: true });
  };

  const logout = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      console.log("insideeee");
      let response = await fetch("http://localhost:8000/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      localStorage.removeItem("token");
      navigate("/admin", { replace: true });
    }
  };
  const token = () => {
    let token = localStorage.getItem("token");
    return token ? token : null;
  };

  const email = () => {
    let email = localStorage.getItem("email");
    return email ? email : null;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const user = useContext(AuthContext);

  return user;
};
