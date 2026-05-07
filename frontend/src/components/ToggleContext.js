import React, { createContext, useState } from "react";

export const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled(!isToggled);

  return (
    <ToggleContext.Provider value={{ isToggled, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
