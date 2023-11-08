import React from "react";
import style from './Nav.module.css';
import Navlink from "../navlink/NavLink";
import SearchBar from "../searchbar/SearchBar";
import { useLocation } from "react-router-dom";
import logoimg from "../../assets/logo-f1-150.png";

function Logo() {
  return (
    <div className={style.logoContainer}>
      <Navlink to={'/'}>
        <img src={logoimg} alt="Logo" className={style.logo} />
      </Navlink>
    </div>
  );
}

function Nav({ onSearch, onHomeClick }) {
  const { pathname } = useLocation();

  return (
    <div className={style.nav}>
      <Logo />
      <div className={style.navLinks}>
        {pathname === '/home' || pathname === '/create' ? (
          <>
            <Navlink to={'/home'}>
              <span className={style.navLinkText} onClick={onHomeClick}>
                Home 
              </span>
            </Navlink>
            <Navlink to="/create">
              <span className={style.navLinkText}>New Driver</span>
            </Navlink>
            <Navlink to="/landing">
              <span className={style.navLinkText}>LOG OUT</span>
            </Navlink>
            <SearchBar onSearch={onSearch} />
          </>
        ):null}
      </div>
    </div>
  );
}

export default Nav;
