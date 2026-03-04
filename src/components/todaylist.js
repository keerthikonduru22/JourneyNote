import React, { useState, useEffect } from 'react';
import './todaylist.css';

export default function Todaylist() {
  const todokey = "todo";
  const [state, setstate] = useState("");
  var [todolist, settodolist] = useState(() => {
    const saveddata = window.localStorage.getItem(todokey);
    if (saveddata === null) return []
    return JSON.parse(saveddata)
  });


  const [vlu, setvlu] = useState("");
  const [state1, setstate1] = useState("");
  const [state2, setstate2] = useState("");

  useEffect(() => {
    window.localStorage.setItem(todokey, JSON.stringify(todolist));
    console.log("Tasks saved to localStorage:", todolist);
  }, [todolist]);

  // Load tasks from localStorage when the component mounts
 


  
  

  const change = (e) => {
    setstate(e.target.value);
  };

  const change1 = (e) => {
    setstate1(e.target.value);
  };

  const change2 = (e) => {
    setstate2(e.target.value);
  };

  const clicking = () => {
    if (state.trim() !== "") {
      settodolist(todolist => [...todolist, {
        list: state,
        time: state1,
        area: state2
      }]);
      setstate("");
      setstate1("");
      setstate2("");
      setvlu("");
    } else {
      setvlu("Please enter the task");
    }
  };

  const handleDelete = (index) => {
    settodolist(todolist => todolist.filter((_, inf) => inf !== index));
  };
  const clearall = () => {
    settodolist([])
  }
  
  return (
    <div className='container1'>
      <div className='stylecontainer1'>
      <div className='first1'>Today list</div>
      <div className='second'>
        <div><input type='text' name='list' placeholder='Enter your list' onChange={change} value={state} required /></div>
        <div><input type='time' name='time' onChange={change1} value={state1} /></div>
        <div><textarea rows='5' cols='50' onChange={change2} value={state2} placeholder='Enter description'></textarea></div>
      </div>
      <div>
        <button className='d1' onClick={clicking}>+</button>
      </div>
      <div>{vlu}</div>
      <div className='third'>
        <ul>
          {todolist.map((item, index) => (
            <div className='third1' key={index}>
              <li>
                <div className='a'>{item.list}</div>
                <div className='b'>{item.time}</div>
                <div className='c'>{item.area}</div>
                <div className='d'><button onClick={() => handleDelete(index)}>Delete</button></div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {todolist.length >0 &&(
        < div className='e'><button onClick={clearall}>clearall</button></div>
        )}
        </div>
    </div>
  );
}
