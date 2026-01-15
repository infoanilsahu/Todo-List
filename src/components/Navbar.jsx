import React, { useState, useEffect, useRef } from "react";
import scroll from "../assets/scroll.svg";
import search from "../assets/search.svg";
import inbox from "../assets/inbox.svg";
import complete from "../assets/complete.svg";
import help from "../assets/help.svg";
import list from "../assets/listB.svg";
import arrow from "../assets/arrow.svg";

const Navbar = ({
  togglefinshed,
  todos = [],
  shownav,
  navRef,
  menuOpen,
  setMenuOpen,
  blackRef
}) => {
  const [activeIndex, setactiveIndex] = useState(false);
  const [activeComplete, setactiveComplete] = useState(false);
  // const [todos, setTodos] = useState([])
  
  const wid = navRef || useRef();
  const opcity = useRef();
  const black = blackRef || useRef();



  const handleActive = () => {
    if (window.innerWidth < 640) {
      changewidth();
    }
    togglefinshed();
    setactiveIndex(!activeIndex);
    if (activeComplete === true) {
      completedtask();
    }
  };




  const changewidth = () => {
    // setwidth("0vh")
    if (window.innerWidth >= 640) {
      wid.current.style.width = "70px";
      opcity.current.style.height = "0vh";
    } else {
      wid.current.style.width = "0px";
      black.current.style.display = "none";
    }
  };

  const removechangewidth = () => {
    // setwidth("0vh")
    wid.current.style.width = "20vw";
    opcity.current.style.height = "100%";
  };

  const completedtask = () => {
    if (window.innerWidth < 640) {
      changewidth();
    }
    setMenuOpen(!menuOpen);
    setactiveComplete(!activeComplete);
    if (activeIndex === true) {
      handleActive();
    }
  };

  return (<>
  
    <div
      ref={wid}
      className="container bg-[#fcfaf8] w-0 sm:w-[280px] h-[100dvh] overflow-hidden absolute sm:static z-40 transition-all duration-300"
    >
      <div
        ref={opcity}
        className="flex flex-col justify-between h-full overflow-hidden"
      >
        <div className=" p-4">
          <div className="flex items-center justify-between p-1">
            <span className="font-bold p-2">TodoLIST</span>
            <img
              className="p-1 rounded-[5px] hover:bg-[#dad9d9]"
              src={scroll}
              onClick={changewidth}
            />
          </div>

          <hr className="opacity-30" />

          <div className="p-1 py-4">
            <div className="flex items-center my-2 py-1 p-1.5 rounded-[8px] hover:bg-[#dad9d9]">
              <img src={search} alt="" className="w-[20px]" />
              <span className="text-[16px] px-1.5">Search</span>
            </div>
            <div
              onClick={handleActive}
              className={`flex justify-between items-center my-2 py-1 p-1.5 rounded-[8px]  ${
                activeIndex
                  ? "bg-[#dc4b3e35] hover:bg-[#dc4b3e3a] "
                  : "hover:bg-[#dad9d9]"
              } hover:bg-[#dad9d9]`}
            >
              <div className="flex">
                <img src={inbox} alt="" className="w-[20px]" />
                <span className="text-[16px] px-1.5">Inbox</span>
              </div>
              <div className="flex opacity-70">
                <div>
                  {todos.length}
                </div>
              </div>
            </div>
            <div
              onClick={completedtask}
              className={`flex justify-between items-center my-2 py-1 p-1.5 rounded-[8px]  hover:bg-[#dad9d9] ${
                activeComplete
                  ? "bg-[#dc4b3e35] hover:bg-[#dc4b3e3a] "
                  : "hover:bg-[#dad9d9]"
              }`}
            >
              <div className="flex">
                <img src={complete} alt="" className="w-[20px]" />
                <span className="text-[16px] px-1.5">Complete</span>
              </div>
              <div className="flex opacity-70">
                <div>
                  {todos.filter((item) => item.isCompleted === true).length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center py-2 p-1.5 rounded-[8px] opacity-80 hover:bg-[#dad9d9] hover:opacity-100 ">
            <img src={help} alt="" className="w-[20px]" />
            <span className="text-[18px] px-1.5">Help & resources</span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center gap-1 w-full my-[22px] ">
        <img
          src={list}
          alt=""
          className="p-1.5 hover:bg-[#dad9d9] rounded-[8px]"
          onClick={removechangewidth}
        />
        <img src={search} alt="" className="p-1.5" />
        <img onClick={handleActive} src={inbox} alt="" className={`p-1.5 ${
                activeIndex
                  ? "bg-[#dc4b3e35] hover:bg-[#dc4b3e3a] "
                  : "hover:bg-[#dad9d9]"
              } hover:bg-[#dad9d9] rounded-[8px]`} />
        <img onClick={completedtask} src={complete} alt="" className={`p-1.5 rounded-[8px] hover:bg-[#dad9d9] ${
                activeComplete
                  ? "bg-[#dc4b3e35] hover:bg-[#dc4b3e3a] "
                  : "hover:bg-[#dad9d9]"
              }`} />
      </div>
    </div>
    <div onClick={changewidth} ref={black} className="bg-black opacity-60 hidden sm:hidden w-full h-[100dvh] absolute z-30" >

    </div>
    </>
  );
};

export default Navbar;
