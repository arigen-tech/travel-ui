import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
const Layout = () => {
    return(
        <div id="body" className="it-magic-cursor">
        <button className="scroll-top scroll-to-target open" data-target="header">
        <i className="fa-solid fa-arrow-up"></i>
      </button>
        <Header />
              <Outlet />
        <Footer />
        </div>
    );
}
export default Layout;