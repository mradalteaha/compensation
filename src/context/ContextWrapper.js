import React, { useState } from "react";
import Context from "./Context";

export default function ContextWrapper(props) {

  const [currentUser, setCurrentUser] = useState(null);
  const [quizzAnswers, setQuizzAnswers] = useState(new Map());
  const [adminLog, setAdminLog] = useState(false);
 

 

  return (
    <Context.Provider
      value={{ currentUser,setCurrentUser,quizzAnswers, setQuizzAnswers,adminLog, setAdminLog}}
    >
      {props.children}
    </Context.Provider>
  );
}
