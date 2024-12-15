import './App.css'
import {useEffect, useRef, useState} from "react";

function App() {

    const [todoList, setTodoList] = useState([])
    const [sequence, setSequence] = useState(null)
    const refTodoItem= useRef()

    useEffect(()=>{
        let sequence = window.localStorage.getItem("sequence");
        if (sequence === null) {
            window.localStorage.setItem("sequence", "0")
            sequence = 0
        }

        const handleSetInit = () => {
            window.localStorage.setItem("todoList", "[]")
            return "[]"
        }

        let todo = JSON.parse(window.localStorage.getItem("todoList")??handleSetInit());

        setTodoList(todo);
        setSequence(Number(sequence));

    },[])

    const handleTodoAdd = (item) => {
        if (sequence === null) {
            return
        }

        let todo = [...todoList];

        todo.push({tf:false,id:sequence+1,text:item});

        window.localStorage.setItem("todoList",JSON.stringify(todo));
        window.localStorage.setItem("sequence", String(sequence+1));

        setTodoList(todo);
        setSequence(sequence+1);
        refTodoItem.current.value='';
    }

    const handleTodoCheck = (tf, idx) => {
        let todo = [...todoList];
        todo[idx].tf = !tf;

        window.localStorage.setItem("todoList", JSON.stringify(todo));
        setTodoList(todo);
    }

    const handleTodoDelete = (id) => {
        let todo = [...todoList];
        todo = todo.filter((val)=>val.id !== id);

        window.localStorage.setItem("todoList",JSON.stringify(todo));
        setTodoList(todo)
    }


    return (

   <div className='mainLayout'>
       <div className='todoLayout'>
           <div className='todoTop'>
               <div className='todoTitle'>
                   To Do List
               </div>
               <div className='todoAdd'>
                   <input type='text' placeholder='할 일을 입력하세요'
                   ref={refTodoItem}/>
                   <div onClick={()=>handleTodoAdd(refTodoItem.current.value)}>
                       +
                   </div>
               </div>
           </div>
           <div className='listLayout'>
               {todoList.map((val, idx) =>
                   <div className='todoItem' key={idx}>
                       <div className='todoCheckBox' onClick={()=>handleTodoCheck(val.tf,idx)}>
                           <div className='checkIcon'>
                               {val.tf?'✓':''}
                           </div>
                           <span>{val.text}</span>
                       </div>
                       <div className='deleteBox' onClick={()=>handleTodoDelete(val.id)}>
                           x
                       </div>
                   </div>
               )}

           </div>
       </div>

   </div>
  )
}

export default App
