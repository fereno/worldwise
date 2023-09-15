import React from "react";
import styles from "./Sidebar.module.css";
import AppNav from "./components/AppNav";
import Logo from "./components/Logo";
import {Outlet} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copy {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
