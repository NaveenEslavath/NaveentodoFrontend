import React,{useState,useEffect} from 'react'
import TodoItemPage from './TodoItemPage'
import {v4 as uuidv4} from 'uuid'
import './TodoPage.css'
import Cookies from 'js-cookie'
import { useNavigate,useLocation} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const TodoPage=()=>{
  const navigate2=useNavigate()

  const location = useLocation();
  const Nm_user = location.state?.user;
  const User_idn=location.state?.idn

  console.log(Nm_user)

    const [lis,setLis]=useState([])
    const [inp,setInp]=useState('')
    const [profObj,setProfile]=useState({})
    const [che,setCheck]=useState(false)

    const jwtTkn=Cookies.get(Nm_user)

    const getApi=async ()=>{
      const options={
        method:'GET',
        headers:{
          Authorization:`Bearer ${jwtTkn}` 
        }
      }
      const response=await fetch('https://todo-backend1-vzwg.onrender.com/todos',options);
      const data=await response.json()
      
      if (response.ok){
        
        setLis(data);
      }

    }

    useEffect(()=>{
      getApi()
    },[])


    const addTask=(event)=>{
       setInp(event.target.value)
    }

    const addTaskToDb=async ()=>{

       const taskObj={
        id:uuidv4(),
        task:inp,
        status:false
       }   

       const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwtTkn}` 

        },
        body:JSON.stringify(taskObj)
       }

       const response=await fetch('https://todo-backend1-vzwg.onrender.com/todos',options);
       const textData=await response.text()


       if (textData==='ok'){
          setLis((prevLis)=>[...prevLis,taskObj])
          setInp('')
       }


    }

    const delFunc=async (idVal)=>{


        const options={
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jwtTkn}` 

          }
        }
         const response=await fetch(`https://todo-backend1-vzwg.onrender.com/todos/${idVal}`,options)
         const deltextData=await response.text()
         
         if (deltextData==='deleted'){
            const newLis=lis.filter((i)=>i.id!==idVal)
            setLis(newLis)
         }
    }

    const logoutFunc=async ()=>{

    const options={
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${User_idn}`
      }
    }

    const delUserApi=await fetch(`https://todo-backend1-vzwg.onrender.com/delUser/${User_idn}`,options)

    const txtResp=await delUserApi.text()

    console.log(txtResp)
    Cookies.remove(Nm_user)
    navigate2('/')
    
    }

    const updateApi=async (ident,updObj)=>{

      const options={
          method:'PUT',
          headers:{
              'Content-Type':'application/json',
              Authorization:`Bearer ${jwtTkn}` 

          },
          body:JSON.stringify(updObj)
      }
      const response=await fetch(`https://todo-backend1-vzwg.onrender.com/todos/${ident}`,options)
      const resUpd=await response.text()

      if (resUpd==='updated'){
          const updLis=lis.map((i)=>{
            if (i.id===ident){
              return {...i,status:updObj.status}
            }
            else{
              return i 
            }
          })
          setLis(updLis)
      }

  }

  const profileFunc=()=>{
    navigate2('/userprofile',{state:{auser:Nm_user,idntify:User_idn}})
  }


  const getUserDetailsFunc=async ()=>{
    
    const options={
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${jwtTkn}`
      }
    }

    const pApi=await fetch(`https://todo-backend1-vzwg.onrender.com/profileInfo/${User_idn}`,options)
    const resApi=await pApi.json()

    console.log(resApi)
    setProfile(resApi)
    setCheck(prevCheck=>!prevCheck)

  }


  const dispDetails=()=>{
   
    const {name,email,phone}=profObj

     return (
         <div>
           <p> Name:{name}</p>
           <p> Email:{email}</p>
           <p> Contact Number:{phone}</p>
         </div>
     )
  }


    return(
      <div className='styleCon'>

        <div className='logCon'> 
          
          <div className='profile'>
           <button className='iconButt' onClick={getUserDetailsFunc}> <AccountCircleIcon /> </button>
          <span className='span'> {Nm_user} </span>
          </div>

        <div>
        <button className='logout' onClick={profileFunc}> Update Profile</button>
        <button className='logout exm' onClick={logoutFunc}> Logout</button>
        </div>

        </div> 

        {che?dispDetails():''}

         <h1 className='head'> Todo  Application </h1>
         <div className='con1'>
         <input type='text' placeholder='Add Task' className='inp' onChange={addTask} value={inp}/>
         <button className='butt' onClick={addTaskToDb}> Add </button>
         </div> 
         <ul className='ul'>
         {
            lis.map((i)=>(<TodoItemPage key={i.id}  obj={i} delFunc={delFunc} updateApi={updateApi}/>))
         }
         </ul> 
      </div> 
    )
}

export default TodoPage