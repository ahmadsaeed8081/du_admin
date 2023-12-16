import React from "react";
// import "../App.css";
import Spinner from "react-svg-spinner";
import TypeWriterEffect from "react-typewriter-effect";
const Loader = () => {
  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <div className="">
        <div className="block mb-6">
          <Spinner color="black" size="100px" thickness={2} />
        </div>
        <TypeWriterEffect
          textStyle={{ fontFamily: "inherit", color: "black" }}
          startDelay={100}
          cursorColor="black"
          text="Loading..."
          typeSpeed={150}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Loader;
