import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Container maxidth="lg">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth/>} />
      </Routes>
    </Container>
  );
};

export default App;
