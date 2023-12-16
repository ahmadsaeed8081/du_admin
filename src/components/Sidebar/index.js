import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LogoutIcon,
  DashboardIcon,
  CardIcon,
  SyncIcon,
} from "../../assets/Icons";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect } from 'wagmi'

const Sidebar = () => {


  const { open, close } = useWeb3Modal()
  const { address, isConnected,isDisconnected } = useAccount()
  const navBarItems = [
    { lbl: "Dashboard", icon: <DashboardIcon />, slug: "/dashboard/home" },
    // {
    //   lbl: "Kyc Approvals",
    //   icon: <CardIcon />,
    //   slug: "/dashboard/kycApprovals",
    // },
    { lbl: "Update Value", icon: <SyncIcon />, slug: "/dashboard/updateValue" },
  ];

  return (
    <div className={`sidebar-s fixed anim show`}>
      <div
        className={`side-block flex flex-col justify-between anim show gap-2`}
      >
        <div className="side-hdr flex items-center justify-center">
          <Link to="/dashboard/home">
            <img src="/images/logo.svg" className="h-24 w-28" />
          </Link>
        </div>
        <div className="items flex aic flex-col gap-6">
          {navBarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.slug}
              className={`item flex items-center gap-4`}
            >
              <div className="icon flex items-center justify-center h-8 w-8">
                {item.icon}
              </div>
              <div className="li">{item.lbl}</div>
            </NavLink>
          ))}
        </div>
        <div className="side-footer flex items-center  justify-center">
          <button className="btn-logout button">
            <h1 className="btn-icon">
              <LogoutIcon />
            </h1>
            <h1 className="btn-lbl" onClick={open} >{isConnected?('Disconnect'): ('Connect Wallet') }</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
