import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate()
  return (
    <button onClick ={()=> navigate(-1)}className='bg-[#025cca] p-2 text-2xl font-bold rounded-lg text-[#f5f5f5]'>
        <IoArrowBackOutline />
    </button>
  )
}

export default BackButton