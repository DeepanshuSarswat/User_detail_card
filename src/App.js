import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cards from "./Cards";
import { user } from "./features/counter/counterSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
function App() {
  const dipatch = useDispatch();
  const [userlist, setuserlist] = useState([]);
  const getData = async () => {
    const res = await fetch("https://reqres.in/api/users/");

    const json = await res.json();
    dipatch(user(json.data));
    setuserlist(json.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {userlist.length == 0 ? <CircularProgress /> : <Cards />}
    </div>
  );
}

export default App;
