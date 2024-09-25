import React from 'react'
import './TodoItemPage.css'
import { MdDelete } from "react-icons/md";


const TodoItemPage=(props)=>{
   
    const {obj,delFunc,updateApi}=props
    const {id,task,status}=obj

   const updateFunc=()=>{
    const updObj={
        status:!status
    }
    updateApi(id,updObj)
   }

    const deleteFunc=()=>{
        delFunc(id)
    }


     return (
        <li className='li'>
            <input type='checkbox' checked={status}  id={id} onClick={updateFunc} className='checkbox'/>
            <div className='align'>
            <label htmlFor={id} className={status?'ex':'ex1'} > {task} </label>
            <p  className={status?'cmn':'cmn1'}> {status?'finished':'unfinshed'}</p>
            <button className='icon' onClick={deleteFunc}> <MdDelete /> </button>
            </div>
        </li>
     )
}

export default TodoItemPage