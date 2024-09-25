import React from 'react'
import TodoPage from './components/TodoPage'
import RegistrationPage from './components/RegistrationPage'
import Login from './components/Login'
import {Routes,Route} from 'react-router-dom'
import UserProfile from './components/UserProfile'


const App=()=>{

  return (
     <Routes>
        <Route path='/' element={<RegistrationPage/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/todos' element={<TodoPage/>}/>
     </Routes>
  )
    
}

export default App