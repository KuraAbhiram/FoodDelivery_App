import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'

export default function Signup() {

  const [credentials , SetCredentials] = useState({name:"",email:"",password:"",geolocation:""})
  const navigate = useNavigate()
  
  const handlesubmit = async(e)=>{
      e.preventDefault()

      const response = await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
      });
      const json = await response.json()
      navigate('/login')
      console.log(json);

      if(!json.success){
        alert("enter valid credentials")
      }
    }
   const onchange = (event)=>{
        SetCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div className='container'>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" placeholder="Enter name" name='name' value={credentials.name} onChange={onchange} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onchange} />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="geolocation" placeholder="location" name='geolocation' value={credentials.geolocation} onChange={onchange} />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
        <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
      </form>
      </div>
    </>
  )
}
