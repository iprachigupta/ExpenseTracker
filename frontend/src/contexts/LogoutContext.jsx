/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const LogoutContext = createContext();

export const LogoutProvider = ({children}) =>{
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const triggerLogoutDialog = () => setShowLogoutDialog(true);
  const closeLogoutDialog = () => setShowLogoutDialog(false);
  return (
    <LogoutContext.Provider
      value={{ showLogoutDialog, triggerLogoutDialog , closeLogoutDialog}}
    >
      {children}
    </LogoutContext.Provider>
  );
}

export const useLogout = () => useContext(LogoutContext);