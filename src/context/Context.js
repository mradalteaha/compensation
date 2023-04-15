import React from "react";

const GlobalContext = React.createContext({
  currentUser:null,
  setCurrentUser:()=>{},
  quizzAnswers:new Map(),
  setQuizzAnswers:()=>{},
  adminLog:false,
  setAdminLog:()=>{},
  
});

export default GlobalContext;