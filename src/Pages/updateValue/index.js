import React, { useState,useEffect } from "react";
import Wrapper from "../../routes/Wrapper";
import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

const UpdateValue = () => {


  const [minimum_investment, set_minimum_investment] = useState(0);
  const [maximum_withdraw_reward_limit, set_maximum_withdraw_reward_limit] = useState(0);
  const [minimum_withdraw_reward_limit, set_minimum_withdraw_reward_limit] = useState(0);
  const [withdrawfee, set_withdrawfee] = useState(0);
  const [penaltybefore30days, set_penaltybefore30days] = useState(0);
  const [owner, set_owner] = useState("");

  const { address, isConnecting ,isDisconnected} = useAccount()
  let count=0
  
  
  
  useEffect(()=>{
    if((count==0&& address!=undefined))
    {
      count++;
  
      console.log("hello sec box"+count);
        test();
    }
  
  },[address,])
  
  
  
  
  
  
    async function test(){
      const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com"));
    
                
     const balance =await  web3.eth.getBalance(address)
      const contract=new web3.eth.Contract(cont_abi,cont_address);
   
      let owner = await contract.methods.owner().call();  

      let minimum_investment = await contract.methods.minimum_investment().call();  
      minimum_investment= web3.utils.fromWei(minimum_investment.toString(),"ether")  
  
      let maximum_withdraw_reward_limit = await contract.methods.maximum_withdraw_reward_limit().call();
      maximum_withdraw_reward_limit= web3.utils.fromWei(maximum_withdraw_reward_limit.toString(),"ether")  
      
      let minimum_withdraw_reward_limit = await contract.methods.minimum_withdraw_reward_limit().call();
      minimum_withdraw_reward_limit= web3.utils.fromWei(minimum_withdraw_reward_limit.toString(),"ether")  
  
      let withdrawfee = await contract.methods.withdrawfee().call();  
      withdrawfee= web3.utils.fromWei(withdrawfee.toString(),"ether")    
  
      let penaltybefore30days = await contract.methods.penaltybefore30days().call();  
      penaltybefore30days= web3.utils.fromWei(penaltybefore30days.toString(),"ether")  
  
  
      set_owner(owner)
      set_withdrawfee(withdrawfee)
      set_maximum_withdraw_reward_limit(maximum_withdraw_reward_limit)
      set_minimum_withdraw_reward_limit(minimum_withdraw_reward_limit)
      set_minimum_investment(minimum_investment)
      set_penaltybefore30days(penaltybefore30days)
  
  
  console.log("object done");
    }  
  
  
  const data = [
    {
  
      Title: "Min Stake",
      value: minimum_investment,
      functionName: "0.00",
    },
    {
      Title: "Min Withdraw",
      value: maximum_withdraw_reward_limit,
      functionName: "0.00",
    },
    {
      Title: "Max Withdraw",
      value: minimum_withdraw_reward_limit,
      functionName: "0.00",
    },
    {
      Title: "Unstake Penalty",
      value: penaltybefore30days,
      functionName: "0.00",
    },
    {
      Title: "Withdraw Fee",
      value: withdrawfee,
      functionName: "0.00",
    },
  
  ];
  
  
  
  
  
  
  
  




  const Card = ({ index, item }) => 
  {

      const [editInput, setEditInput] = useState(false);
      const [numb, setNumb] = useState(item.value);
      const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

      const { chain } = useNetwork()

    
      const { config:update_minimum_investment } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_minimum_investment',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_minimum_withdraw_reward_limit } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_minimum_withdraw_reward_limit',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_maximum_withdraw_reward_limit } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_maximum_withdraw_reward_limit',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_Unstake_penaltybefore30days } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_Unstake_penaltybefore30days',
      args: [Number(numb)*10**18],
    
    
    })
    const { config:update_withdrawfee } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'update_withdrawfee',
      args: [Number(numb)*10**18],
    
    
    })
      const { data:Result_update_minimum_investment, isLoading2_update_minimum_investment1, isSuccess2_update_minimum_investment1, write:update_minimum_investment1 } = useContractWrite(update_minimum_investment)
      const { data:Result_update_minimum_withdraw_reward_limit, isLoading2_update_minimum_withdraw_reward_limit, isSuccess2_update_minimum_withdraw_reward_limit, write:update_minimum_withdraw_reward_limit1 } = useContractWrite(update_minimum_withdraw_reward_limit)
      const { data:Result_update_maximum_withdraw_reward_limit, isLoading2_update_maximum_withdraw_reward_limit, isSuccess2_update_maximum_withdraw_reward_limit, write:update_maximum_withdraw_reward_limit1 } = useContractWrite(update_maximum_withdraw_reward_limit)
      const { data:Result_update_Unstake_penaltybefore30days, isLoading2_update_Unstake_penaltybefore30days, isSuccess2_update_Unstake_penaltybefore30days, write:update_Unstake_penaltybefore30days1 } = useContractWrite(update_Unstake_penaltybefore30days)
      const { data:Result_update_withdrawfee, isLoading2_update_withdrawfee, isSuccess2_update_withdrawfee, write:update_withdrawfee1 } = useContractWrite(update_withdrawfee)
    





    const networkId=56;
    
    
    const waitForTransaction4 = useWaitForTransaction({
        hash: Result_update_minimum_investment?.hash,
        onSuccess(data) {
        test?.()
          console.log('Success2',data )
        },
      })
    
      const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
      useSwitchNetwork({
        chainId: networkId,
        // throwForSwitchChainNotSupported: true,
        onSuccess(){
    
          update_value?.()
        }
    
      })
      async function update_value()
      {
        if(!isConnected)
        {
          alert("kindly connect your owner wallet")
          return;
        }
        
        if(owner.toLowerCase()!=address.toLowerCase())
        {
          alert("only owner can update these values")
          return;
        }

        if(index==0)
        {
          update_minimum_investment1?.()

        }
        else if(index==1)
        {
          update_minimum_withdraw_reward_limit1?.()
        }
        else if(index==2)
        {
          update_maximum_withdraw_reward_limit1?.()
        }
        else if(index==3)
        {
          update_Unstake_penaltybefore30days1?.()
        }
        else if(index==4)
        {
          update_withdrawfee1?.()
        }

      } 


    return (
      <div key={index} className="re-box flex flex-col">
        <h1 className="title mb-4">{item.Title}</h1>
        <div className="flex items-center justify-between gap-3 max-md:flex-col">
          <input
            type="text"
            value={numb}
            onChange={(e) => setNumb(e.target.value)}
            disabled={!editInput}
            className={`numb py-1 px-2 rounded-lg w-36 text-black border border-solid ${
              editInput ? "border-black" : "border-transparent"
            } `}
          />
          <button
            className="button btn-edit rounded-xl !py-2 !px-7 !text-[#1C0057]"
            onClick={(e) => 
              {
                if(editInput)
                {
                  update_value?.()

                }
                else{
                  setEditInput(!editInput)

                }
              
              }}
          >
            {editInput ? "Update" : "Edit"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="Reward-page ">
        <div className="wrap wrapWidth flex">
          <div className="Reward-box">
            <div className="Reward-header items-center justify-between gap-3">
              <h1 className="heading">Update Value</h1>
            </div>
            <hr class="w-full border-black mt-4 p-0" />
            <div className="flex flex-col items-center w-full">
              <div className="wrap-block grid lg:grid-cols-3 max-md:grid-cols-2 gap-5 my-8 px-5 max-md:overflow-y-auto max-md:max-h-[500px] max-md:px-0 max-md:gap-2">
                {data.map((item, index) => (
                  <Card item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateValue;
