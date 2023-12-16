import React from "react";
import { useState,useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./Private";
import Public from "./Public";

import Home from "../Pages/Home";
import KycApprovals from "../Pages/KycApprovals";
import UpdateValue from "../Pages/updateValue";


import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,token_Address,cont_abi,token_abi } from "../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const Routing = () => {


  const [totalwithdraw, set_totalwithdraw] = useState(0);


  const [contract_DuBalance, set_contract_DuBalance] = useState(0);
  const [owner_DuBalance, set_owner_DuBalance] = useState(0);
  const [total_users, set_total_users] = useState(0);
  const [TotalStaked, set_TotalStaked] = useState(0);



  const { chain } = useNetwork()

  const { address, isConnecting ,isDisconnected} = useAccount()
  let count=0


 
useEffect(()=>{
  if((count==0&& address!=undefined))
  {
    count++;

    console.log("hello sec box"+count);
      test();
  }

},[address,contract_DuBalance])



  async function test(){
    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com"));
  
              
   const balance =await  web3.eth.getBalance(address)
    const contract=new web3.eth.Contract(cont_abi,cont_address);
    const contract1=new web3.eth.Contract(token_abi,token_Address);
    let contract_DuBalance = await contract1.methods.balanceOf(cont_address).call();    
    let TotalStaked = await contract.methods.totalbusiness().call();  
    let Totalwithdraw = await contract.methods.totalwithdraw().call();  
    // alert(TotalStaked)
    let totalusers = await contract.methods.totalusers().call();      
    let owner_DuBalance = await contract1.methods.balanceOf(address).call();    
    set_TotalStaked(TotalStaked/10**18)
    set_total_users(totalusers)
    set_owner_DuBalance(owner_DuBalance/10**18)
    set_contract_DuBalance(contract_DuBalance/10**18)
    set_totalwithdraw(Totalwithdraw/10**18)


console.log("object done");
  }  








  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Home />
            </Public>
          }
        />

        <Route path="dashboard">
          <Route
            path="home"

            element={
              <Public>
                <Home totalwithdraw={totalwithdraw}contract_DuBalance={contract_DuBalance} owner_DuBalance={owner_DuBalance} total_users={total_users} TotalStaked={TotalStaked} />
              </Public>
            }
          />
          {/* <Route
            path="kycApprovals"
            element={
              <Public>
                <KycApprovals />
              </Public>
            }
          /> */}

          <Route
            path="UpdateValue"
            element={
              <Public>
                <UpdateValue />
              </Public>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
