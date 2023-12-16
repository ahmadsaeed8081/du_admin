import React, { useEffect, useState } from "react";

import Wrapper from "../../routes/Wrapper";
import { ArrowDownIcon2 } from "../../assets/Icons";
import axios  from "axios";
const KycApprovals = () => {
  const list = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const [img, setImg] = useState('');
    const [data, setdata] = useState( [{
      userAddress:"",
      FName :"" ,
      LName:"",
      Email:"",
      password:"",
      Country:"",
      Phone:"",
      Ref_addres:"",
      verified:"",
      Imag:"",
  
  }]);
    const [address, setaddress] = useState('');

    const [status, set_status] = useState();
  
  let count=0;
  

  
  const [preview ,setPreview] = useState()
  
  if(img){
    const reader = new FileReader()
     reader.readAsDataURL(img)
    reader.onload = () =>{
        setPreview(reader.result)
    }
  }
  
    async function action(_address,_val)
    {
      let _verified;

      if(_val==0)
      {
        _verified="verified"
      }
      else if(_val==1)
      {
        _verified="decline"

      }
      const res0 =await axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: _address,}));
    
      if(res0.data[0]!=undefined)
      { 
        if(res0.data[0].verified=="underApproval")
        {
          const data={userAddress: res0.data[0].userAddress.toLowerCase(),
            FName:res0.data[0].FName,LName:res0.data[0].LName,Email:res0.data[0].Email,password:res0.data[0].password,Country:res0.data[0].Country,Phone:res0.data[0].Phone,Ref_address:res0.data[0].Ref_address,verified:_verified,Image:preview};
  
          const res =await axios.patch("https://duapi-production.up.railway.app/user/"+ res0.data[0]._id,data);
            if(res.data="its done")
            {
              check()
  
            }
        }
  
      }

    
    }
  
    async function check()
    {
    console.log("start11");
    
    var add="0x0f0D6162058d28a18cAeef3D12cBBA3f5073e477";
    console.log(add.toLowerCase());
        let temp_data=[{
          userAddress:"",
          FName :"" ,
          LName:"",
          Email:"",
          password:"",
          Country:"",
          Phone:"",
          Ref_addres:"",
          verified:"",
          Imag:"",
          _v:0,
          _id:"",
      
      }];
        const res0 =await axios.get("https://duapi-production.up.railway.app/getALLData");
        console.log(res0);
        for(let i=0;i<res0.data.length;i++)
        {

            console.log(temp_data[i].userAddress);
            temp_data[i]=res0.data[i];

          
        }
        setdata(temp_data)

        // const res0 =await axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: add.toLowerCase(),}));
        // if(res0.data[0]!=undefined)
        // { 
        //   if(res0.data[0].verified=="underApproval")
        //   {
        //     console.log("data add");
        //     temp_data[0]=res0.data[0];

        //   }
    
        // }
        // setdata(temp_data)

        // console.log("temp dta");
    }

  
  // useEffect(()=>{
  //   if(count==0)
  //   {
  //     check();
  //     count++;
  //     console.log("hello " );

  //   }
  
  // },[])




  const ExpendableBlock = ({ item, index }) => {
    const [expend, setExpend] = useState(false);
    console.log(item);
    return (
      <div
        key={index}
        className="expendable-block flex flex-col w-full py-3 px-6"
      >
        <div
          className="flex w-full items-center justify-between gap-4 hover:cursor-pointer"
          onClick={(E) => setExpend(!expend)}
        >
          <h1 className="text-[#1C0057] font-medium text-lg">Kyc Request</h1>
          <div className="flex items-center justify-center h-6 w-6">
            <ArrowDownIcon2 />
          </div>
        </div>
        <div
          className={`hidden flex-col mt-10 px-[5%] ${
            expend ? "!flex" : "hidden"
          }`}
        >
          <div className="flex flex-col w-full mb-6">
            <label className="text-[#1C0057] font-normal mb-1 text-lg">
            </label>
            <input
              type="email"
              readOnly
              className="w-full bg-white p-3 border border-solid border-[#1C0057] rounded-lg"
              value={item.Email}

            />
          </div>
          <div className="flex flex-col w-full mb-10">
            <label className="text-[#1C0057] font-normal mb-1 text-lg">
            </label>
            <input
              type="text"
              className="w-full bg-white p-3 border border-solid border-[#1C0057] rounded-lg"
              value= {item.userAddress}
            />
          </div>
          <div className="img-block flex items-center gap-5">
            <div className="images-selection-block flex gap-4 items-center border-[#1C0057] border-dashed border rounded-xl p-2">

              <img
                src={item.Image}
                className="u-img rounded-lg w-40 h-44 "
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="button !rounded-full !text-[#1C0057] w-[140px]" onClick={()=>action(item.userAddress,1)}>
                Decline
              </button>
              <button className="btn-approve button !bg-[#1C0057] !rounded-full !text-white w-[140px]" onClick={()=>action(item.userAddress,0)}>
                Approved
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Wrapper>
      <div className="kyc-approvals-page">
        <div className="wrap wrapWidth flex">
          <div className="dashboard-box">
            <div className="dashboard-header flex items-center justify-between gap-3">
              <h1 className="heading">Kyc Approvals</h1>
            </div>
            <hr class="w-full border-black" />
            {data[0].userAddress!=""?
            (

              <div className="d-list flex flex-col gap-6 w-full">

              {data.map((item, index) => (
                <ExpendableBlock item={item} index={index} />
              ))}
            </div>

            ):(

              <div className="d-list flex flex-col gap-6 w-full">
                
                <h1 className=" heading">There is not any pending approval </h1>

            </div>

            )}

          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default KycApprovals;
