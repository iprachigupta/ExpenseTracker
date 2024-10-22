import axios from "axios";

export const get = async (endPoint) => {
    
    axios.get(endPoint, { withCredentials: true })
      .then((data) => {
        return data
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
}