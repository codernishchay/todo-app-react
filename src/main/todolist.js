
import React, { useEffect,  useState } from 'react'
import './todolist.css';
import { useForm } from 'react-hook-form';


const axios = require('axios');
const Main = () => {

	const [tasksList, settasksList] = useState([]);
	const { register, handleSubmit } = useForm({});
	const [done , setdone] = useState([]); 

    const createTodo = async (data) =>{
		 const todo = {
			 Todo : data["Todo"], 
			 Date : data["Date"], 
			 Priority : data["Priority"]
		 }
		 
		 try {
             axios.post('http://localhost:4000/todo/create',todo ).then((res)=>{
				 settasksList((pre) =>{
					   return [...pre, res.data]
				 })
			 })
		 }
		 catch (err) {
			 console.log(err); 
		 }
	}

	const markDone = async (id) => {
		 try {

		    settasksList((pre)=>pre.map((ele) => {
					 if(ele["ID"] == id){
					    ele["Done"] = true;  
					 }
					 return ele ; 
				 })
			)
            axios.put('http://localhost:4000/todo/update/' + id, {
				 Done : true
			});

	     		
		 } catch (err) {
              console.log(err)
		 } 
	}


	const fetchTodos = async () => {
		try {
			await axios.get('http://localhost:4000/todos').then((res) => {
			  var data = res.data ; 
		
			  if(data){
			  data.forEach( todo => {
				     settasksList((prev) => {
					  return [ ...new Set([...prev, todo])]
				   })
			  });
			}})
		
		} catch (err) {
			console.log(err);
		}
	}
    useEffect(()=>{
        
	}, [tasksList])

    useEffect(()=>{
		fetchTodos()
	}, [])

    const deleteTodo = (data)=>{
		
         try {



		  axios.delete('http://localhost:4000/todo/delete/' + data).then(res =>{
			settasksList((pre)=>{
				return pre.filter((ele)=>data != ele["ID"])
		   });
		
		})}
		 catch (err){
			 console.log(err) ; 
		 }
	}
   

	return (
		<div>
			<div className="create">
				<form onSubmit={handleSubmit(createTodo)}>
					    <input type="text" {...register("Todo")} placeholder="task" />
					 <span>	<input type="number" {...register("Date")} placeholder="Due Date" />
					<input type="number" {...register("Priority")} placeholder="Priority" /></span>
					    

					{/* <Button className="AddBtn" onClick={secondEvent}>
						<AddIcon />
					</Button> */}
					<button >Add</button>
				</form>
			</div>
			<br />
			<br />
			<br />
			<div className="childOne">

				<br />
				<br />
				<ul className="textFont">
					{
						tasksList.map((val, key) => {
							return (
								<div key={val["ID"]} className="childOne">
									<ul>
										 <span>{val["Priority"]}</span><li>{val["Todo"]}</li>
										<div>{val["Date"]}</div>
										{val["Done"] 
									   && <div>{"done"}</div>}
									</ul>
									{ !val["Done"] &&<button onClick={()=> markDone(val["ID"])}>Done</button>}
							
									<button onClick={()=> deleteTodo(val["ID"])}>Delete</button>
								</div>

							);
						})
					}
				</ul>
			</div>
			<br />
			<br />
		
		</div>
	);
}


export default Main;