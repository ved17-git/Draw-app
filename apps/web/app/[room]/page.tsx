import React from 'react'
import { BACKEND_URL } from '../config'

async function InRoom({params}) {

    const res=await fetch(`${BACKEND_URL}/joinRoom/ved`,{
        method:"GET"
    })    

    if(!res.ok){
        return "didnt fetch"
    }
    const data=await res.json()
    console.log(data);

    
  return (
    <div>InRoom</div>
  )
}

export default InRoom