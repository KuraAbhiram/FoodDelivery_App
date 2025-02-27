import React, { useEffect, useRef, useState } from 'react'
import { useCart , useDispatchCart } from './ContextReducer'

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart()
  const priceref = useRef()
  let options = props.options
  let priceOptions = Object.keys(options)
  const [qty,SetQty] = useState(1)
  const [size,SetSize] = useState("")

  const handleAddtoCart = async () => {
    let food = []
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item

        break;
      }
    }

    if(food != []){
      if(food.size === size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalprice,qty:qty})
        return 
      }
      else if(food.size != size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalprice,qty:qty,size:size})
        return 
      }
      return
    }
      await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalprice,qty:qty,size:size})
    }

  
  let finalprice = qty * parseInt(options[size])
  useEffect(()=>{
    SetSize(priceref.current.value)
  },[])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"200px",objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className='container w-100'>
              <select className='m-2 h-100 bg-info rounded'  onChange={(e)=>SetQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select >

              <select className='m-2 h-100 bg-info rounded' ref={priceref} onChange={(e)=>SetSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>

              <div className='d-inline h-100 fs-5'>
                Rs:{finalprice}/- 
              </div>
            </div>
            <hr></hr>
            <button className='btn btn-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
