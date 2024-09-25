import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegistrationPage.css'
import {v4 as uuidv4} from 'uuid'

const RegistrationPage=()=>{
    
    const navigate=useNavigate()

    const [email,setEmail]=useState('')
    const [password,setpswd]=useState('')
    const [nam,setNam]=useState('')
    const [err,setErr]=useState(false)
    const [result,setRes]=useState(false)
    const [mbl,setMbl]=useState('')

    const mailFunc=(event)=>{
        setEmail(event.target.value)
    }

    const pswdFunc=(event)=>{
        setpswd(event.target.value)
    }

    const mblFunc=(event)=>{
        setMbl(event.target.value)
    }


    const RegApi=async ()=>{

        const regObj={
            id:uuidv4(),
            name:nam,
            mailId:email,
            pswrd:password,
            mblNum:mbl
         }

         const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(regObj)
           }

        const response=await fetch('https://todo-backend1-vzwg.onrender.com/',options);
        const regRes=await response.text()
        
        if (regRes==='ok'){
           navigate('/login')
        }
        else{
           setRes(true)
        }
    }

    const submitFunc=(event)=>{

       event.preventDefault()

       if (nam.trim()===''||email.trim()==='' || password.trim()==='' || mbl.trim()===''){
         setErr(true)
       }
       else{
        RegApi()
       }
    }


    const namFunc=(event)=>{
        setNam(event.target.value)
    }

    const navFunc=()=>{
        navigate('/login')
    }

    return (
        <div className='regCon'>
        
       <form onSubmit={submitFunc} autoComplete="off">
        <h1 className='regHead'> Registration </h1>
        <div className='inp-label'>
            <label htmlFor='name' className='label'> Name* </label>
            <input type='text' placeholder='Enter your Name' id='name' className='inpEle' onChange={namFunc} value={nam} autoComplete="off"/>
        </div>
        <div className='inp-label'>
            <label htmlFor='email' className='label'> Email* </label>
            <input type='text' placeholder='Enter your email' id='email' className='inpEle' onChange={mailFunc} value={email} autoComplete="off"/>
        </div>
        <div className='inp-label'>
            <label htmlFor='password' className='label'> Password* </label>
            <input type='text' placeholder='Enter your Password' id='password' className='inpEle' onChange={pswdFunc} value={password} autoComplete="off"/>
        </div>
        <div className='inp-label'>
            <label htmlFor='phone' className='label'> Mobile number* </label>
            <input type='text' placeholder='Enter your Mobile Number' id='phone' className='inpEle' onChange={mblFunc} value={mbl} autoComplete="off"/>
        </div>
        
        <div className='butCon'>
        <button className='regButt' type='submit'> Register </button>
        <button className='regButt' onClick={navFunc}>  Login </button>
        </div> 
        <p className='err'> {err?'* fields are required':''}</p>
        <p className='err'>{result?'User Already Exists':''} </p>
    </form>
    </div> 
    )
}

export default RegistrationPage