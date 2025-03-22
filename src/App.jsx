import React,{useState} from 'react'

function App() {
  const [count,setCount]=useState(0);
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask] = useState("")

  const addTask =() => {
    if (newTask.trim().length==0){
      return;
    }
    setTasks([...tasks,newTask]);
    setNewTask("");
    setCount((prev) => prev+1)
    
  }

  const deleteTask =(index) => {
    const naveTask =tasks.filter((item,id) => id!==index);
    setTasks(naveTask);
    setCount((prev) => prev-1)
  }
  return (
    <div className='pt-5 text-center '>
      <h1 className='text-4xl font-extrabold text-zinc-200'>To-Do List</h1>
      <form onSubmit={(event) => {event.preventDefault();addTask()}} action="">
        <label className='font-semibold text-2xl' htmlFor="">
          Enter New Task:
          <input type="text" onChange={(event) =>setNewTask(event.target.value)} className='border-[1px] mt-6 pl-4 ml-7 border-zinc-400' placeholder='Enter.............' name="" id=""  value={newTask} /><br />
          <input type="submit" value="Add Task" className='bg-green-400 mt-4 text-md rounded-2xl font-semibold px-4 py-2' />
        </label>
      </form>
      <p className='text-2xl font-bold text-center mt-4 mb-3'>Number of Tasks to-do:{count}</p>
      <div className='p-2 border-2 pb-7 h-fit border-gray-500 ml-10 mr-10 mt-7'>
        <h1 className='font-bold text-cyan-500 text-3xl'>Tasks To Do 👇</h1>
        
          {tasks.length > 0 ? <ul>
          {tasks.map((item,index) => (
            <div key={index} className='flex items-center justify-between'>
             <div className='flex items-center justify-center gap-7'>
             <h2 className='text-3xl font-bold mt-2'>{index+1}.</h2>
             <li className='ml-4 text-3xl mt-5 font-bold' key={index}>{item}</li>
             </div>
              <button onClick={() => {deleteTask(index)}} className='bg-red-500 mr-4 px-4 py-2 font-semibold text-xs rounded-md'>Delete</button>
            </div>
          ))}
          </ul> : <h1 className='text-5xl font-extrabold mt-11'>No Tasks To Do.......Enjoy🍻</h1>}
        
      </div>
    </div>
  )
}

export default App
