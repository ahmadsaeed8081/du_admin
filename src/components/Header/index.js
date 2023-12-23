import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authReducer";
// import { Link, NavLink } from "react-router-dom";
import {
  LogoutIcon,
  DashboardIcon,
  CardIcon,
  SyncIcon,
} from "../../assets/Icons";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect } from 'wagmi'
const Header = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const { address, isConnected,isDisconnected } = useAccount()
  const { open, close } = useWeb3Modal();

  const userLogout = () => {
    dispatch(logout("admin-token"));
  };

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="../images/logo.svg" className="logo" />
            </Link>
          </div>
        </div>
        <div className="right flex items-center justify-end"></div>
        <div className="side-footer flex items-center  justify-center">
          <button className="btn-logout button">
            <h1 className="btn-icon">
              {/* <LogoutIcon /> */}
            </h1>
            <h1 className="btn-lbl" onClick={open} >{isConnected?('Disconnect'): ('Connect Wallet') }</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
