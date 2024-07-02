import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials , SetCredentials] = useState({email:"",password:""})
  let navigate = useNavigate()
  
  const handlesubmit = async(e)=>{
      e.preventDefault()

      const response = await fetch("http://localhost:5000/api/loginuser",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json = await response.json()
      console.log(json);

      if(!json.success){
        alert("enter valid credentials")
      }

      if(json.success){
        localStorage.setItem("userEmail",credentials.email) 
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate("/")
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
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onchange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onchange} />
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
        <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
      </form>
      </div>
    </>
  )
}
