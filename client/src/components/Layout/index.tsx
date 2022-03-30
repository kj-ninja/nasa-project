import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header";
import Launch from "../../pages/Launch";
import Upcoming from "../../pages/Upcoming";
import History from "../../pages/History";
import Footer from "../Footer";

import {
  Centered,
  Container
} from "./styles";

const AppLayout = () => {
  return (
    <Container>
      <Header/>
      <Centered>
        <Routes>
          <Route path="/" element={
            <Launch />
          }/>

          <Route path="/launch" element={
            <Launch />
          }/>

          <Route path="/upcoming" element={
            <Upcoming/>
          }/>

          <Route path="/history" element={
            <History/>
          }/>
        </Routes>
      </Centered>
      <Footer/>
    </Container>
  )
}

export default AppLayout;