// src/services/AuthService.js
export const login = async (email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  };
  
  export const register = async (userName, email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", { userName, email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };  