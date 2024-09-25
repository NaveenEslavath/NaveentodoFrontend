import React from 'react'
import { useState } from 'react'
import { useLocation,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './UserProfile.css'

const UserProfile=()=>{

    const navigate5=useNavigate()

   const locationp=useLocation()
   const ulp=locationp.state?.auser;
   const numId=locationp.state?.idntify
   console.log(numId)

   const check=Cookies.get(ulp)


   const [username,setuserName]=useState('')
   const [usermail,setuserMail]=useState('')
   const [userpswd,setuserPswd]=useState('')
   const [phone,setPhone]=useState('')


   const usernameFunc=(event)=>{
      setuserName(event.target.value)
   }


   const phoneNumFunc=(event)=>{
       setPhone(event.target.value)
   }


   const usermailFunc=(event)=>{
        setuserMail(event.target.value)
   }


   const userpswdFunc=(event)=>{
     setuserPswd(event.target.value)
   }

   const userUpdateFunc=async (event)=>{
       event.preventDefault()
        
       const userUpdateDetails={
          updName:username,
          updEmail:usermail,
          updPswd:userpswd,
          updPhone:phone
       }

       const options={
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${check}`
        },
        body:JSON.stringify(userUpdateDetails)
       }


       const userProfileApi=await fetch(`http://localhost:3004/detailsupdate/${numId}`,options)
       const txtData=await userProfileApi.text()
       
       console.log(txtData)
       Cookies.remove(ulp)
       
       navigate5('/login')
   }


    return (
        <form className='form form-control' onSubmit={userUpdateFunc}>

            <div className='form-con'>
                <label htmlFor='name'> Name </label>
                <br/>
                <input type='text' id='name' className='form-control' placeholder='Enter your  name' onChange={usernameFunc} value={username}/>
            </div>

            <div className='form-con'>
                <label htmlFor='email'> Email </label>
                <br/>
                <input type='text' id='email' className='form-control' placeholder='Enter your mail' onChange={usermailFunc} value={usermail}/>
            </div>

            <div className='form-con'>
                <label htmlFor='password'> Password </label>
                <br/>
                <input type='text' id='password' className='form-control' placeholder='Enter your password' onChange={userpswdFunc} value={userpswd}/>
            </div>

            <div className='form-con'>
                <label htmlFor='phoneNum'> Phone Number </label>
                <br/>
                <input type='text' id='phoneNum' className='form-control' placeholder='Enter your Phone Number' onChange={phoneNumFunc} value={phone}/>
            </div>

            <button className='updateButt' type='submit'> Update </button>

        </form>
    )
}

export default UserProfile