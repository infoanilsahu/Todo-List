import React from "react";
import { useState, useEffect, useRef } from "react";
import edit from "../assets/edit.svg";
import delet from "../assets/delete.svg";
import { v4 as uuidv4 } from "uuid";
import checkbox from "../assets/checkbox.svg";
import checkout from "../assets/checkout.svg";
import menu from "../assets/menu.svg";
import account from "../assets/account.svg";

const Main = ({showFinsh,setshowFinsh,shownav,menuOpen,todo,settodo,todos,settodos}) => {
  const [error, seterror] = useState("");
  // const [todo, settodo] = useState("");
  // const [todos, settodos] = useState([]);

  const menuRef = useRef();

  useEffect(() => {
    const todosSring = localStorage.getItem("todos")
    if (todosSring) {
      const storage = JSON.parse(localStorage.getItem("todos"))
      settodos(storage)
      
    }
  }, [])
  
  
   const saveTods = (next) => {
    localStorage.setItem("todos", JSON.stringify(next))
   }




  const handleAdd = () => {
    if (todo.length === 0) {
      seterror("please");
      return;
    } else {
      const newt = [...todos, { todo, isCompleted: false, id: uuidv4() }];
      settodos(newt);
      settodo("");
      seterror("");
      saveTods(newt)
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
    console.log(settodo);
  };

  const handleCheckbox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    console.log(newtodos[index].isCompleted);
    settodos(newtodos);
    saveTods(todos)

  };

  const handleDelete = (e, id) => {
    let index = todos.filter((anil) => {
      return anil.id !== id;
    });
    settodos(index);

    saveTods(index)
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    settodo(t[0].todo);
    let index = todos.filter((anil) => {
      return anil.id !== id;
    });
    settodos(index);
    saveTods(todos)

  };

  const shownavbar = () => {
    shownav();
  };




  return (
    <>
      {/* {console.log(todos)} */}
      <div className="h-[100svh] w-screen overflow-y-auto">
        <div className="flex-1 justify-center items-center h-[100dvh] overflow-y-auto ">
          <div className="nav flex sticky bg-white z-20 top-[0px] p-4 sm:hidden items-center justify-between">
            <img
              src={menu}
              alt=""
              onClick={shownavbar}
              className="cursor-pointer"
            />
            <div className="font-bold">TodoLIST</div>
            <img src={account} alt="" />
          </div>

          <div className="container max-w-2xl mx-auto sm:h-screen p-4 sm:mt-16 mb-8">
            <div className="uppr mb-6">
              <div className="head py-3 ">
                <div className="font-bold text-2xl py-1">Add Task</div>
                <div className="opacity-70 text-[15px]">

                  {todos.filter((item) => item.isCompleted === false).length} tasks
                </div>
              </div>

              {/* <div className="w-screen h-screen relative"> */}

              <div className="fixed bottom-0 bg-white py-1 pb-3 right-4 left-4 sm:static z-10">
                <div className="input p-1 border w-full flex rounded-[8px]">
                  <input
                    className="w-full focus:outline-none px-[5px]"
                    type="text"
                    placeholder="Enter Task..."
                    onChange={handleChange}
                    value={todo}
                  />
                  <button
                    className="bg-[#dc4c3e] hover:bg-[#bb3f34] p-1 px-5 rounded-[8px] font-bold text-white"
                    onClick={handleAdd}
                  >
                    <span>Add</span>
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 px-2 py-1">Please enter task</div>
                )}
              </div>
              {/* </div> */}
            </div>

            <div className="lower">


              { menuOpen === true ? <div className="font-bold p-2">Completed tasks</div> : showFinsh === true ? <div className="font-bold p-2">All tasks</div> : todos.filter(item => item.isCompleted === false).length === 0 ? "" : <div className="font-bold p-2">Your tasks</div>}
              

              {todos.map((items) => {
                return (
                  (showFinsh || !items.isCompleted !== menuOpen) && (
                    <div key={items.id} className="w-full">
                      <hr className="opacity-30 object-contain" />
                      <div className="tasks flex justify-between w-full m-2 my-4">
                        <div className="checkbox-text flex items-start w-[70%] sm:w-[75%]">
                          {/* <input name={items.id} type="checkbox" onChange={handleCheckbox} /> */}
                          <img
                            id={items.id}
                            src={items.isCompleted ? checkout : checkbox}
                            alt=""
                            onClick={handleCheckbox}
                            className="w-6 h-6 mr-3 flex-shrink-0"
                          />
                          <div className="w-full break-words whitespace-normal">
                            <div
                              className={items.isCompleted ? "line-through" : ""}
                            >
                              {items.todo}
                            </div>
                          </div>
                        </div>
                        <div className="buttons flex items-start gap-1 mr-3 ">
                          <button
                            onClick={(e) => {
                              handleEdit(e, items.id);
                            }}
                            className="p-1 cursor-pointer rounded-[8px] hover:hover:bg-[#dad9d9] flex-shrink-0"
                          >
                            <img src={edit} alt="" className="w-6 h-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              handleDelete(e, items.id);
                            }}
                            className="p-1 cursor-pointer rounded-[8px] hover:hover:bg-[#dad9d9]"
                          >
                            <img
                              src={delet}
                              alt=""
                              className="w-6 h-6 flex-shrink-0"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

// export default togglefinshed;










