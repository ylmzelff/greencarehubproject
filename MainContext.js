// MainContext.js
import React, { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");

  return (
    <MainContext.Provider value={{ nickname, setNickname }}>
      {children}
    </MainContext.Provider>
  );
};
