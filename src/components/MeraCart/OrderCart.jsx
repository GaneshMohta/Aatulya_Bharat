import React, { lazy, useMemo } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Order.css'
import { decrementitem, incrementitem , removeitem } from '../../Redux/cartSlice';
const Payment = lazy(()=>import('./Payment'));

export default function OrderCart() {


  const Carts = useSelector((state)=>state.cart.data)
  console.log('Cart=>',Carts);
  const dispatch = useDispatch();

  const handleIncrement=(item)=>{
    dispatch(incrementitem(item));
  }

  const handlDecrement=(item)=>{
    dispatch(decrementitem(item));
  }

  const handleRemoveitem=(item)=>{
    console.log("Hey",item);
    dispatch(removeitem(item));
  }

  let total=useMemo(()=>{
    let sum=0;
    Carts.forEach((item)=>{
      sum+=item.price*item.quantity
    });
    return sum;
  },[Carts]);

  if(Carts.length==0){
    return <>
   <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200'>
    <div className='flex gap-2'>
     <Link to='/Make-in-India'><span className='text-slate-950 relative top-1'><BsArrowLeftShort/></span></Link>
  <h3>Aatulya Bharat</h3>
  </div>
  </div>
    <h1 style={{textAlign:"center"}} className='bg-slate-100 h-[90vh] flex items-center justify-center font-bold text-3xl text-blue-700'>😑Cart is Empty😑</h1>
</>}
return (
  <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50'>
   <div className='sticky top-0 z-50 p-1 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 items-center'>
    <div className='flex gap-2 items-center'>
     <Link to='/Make-in-India'><span className='text-gray-600 hover:text-gray-800 text-2xl'><BsArrowLeftShort/></span></Link>
      <h3 className='text-xl font-semibold text-gray-800'>Atulya Bharat</h3>
  </div>
  </div>
  <div className="overall">
    <div className="left">
      {Carts.map((props) => (
        <div className="container1" key={props.id}>
          <div className='w-[60%]'>
          <h1 className="title1">{props.productName}</h1>
          <h3 className="category1">{props.selectedCategory}</h3>

          <p className="price1">₹:{props.price}</p>
          <p className="description">{props.description}</p>
          <div className="btn1">
          <button className="button1" onClick={() => handleIncrement(props)}>+</button>
          <p>{}</p>
          <button className="button1" onClick={() => handlDecrement(props)}>-</button>
          </div>
          <button className="button1" onClick={() => handleRemoveitem(props)} >Remove</button>
          </div>
          <div className='w-[40%] flex justify-end'>
          <img src={`https://aatulya-bharat.onrender.com/uploads/${props.image}`} alt="product" className="image1" />
          </div>
        </div>
      ))}
    </div>
    <div className="right">
      <div className="bill">
        <h3>Price Details</h3><hr></hr>
        {
          Carts.map((item) => (
            <div className="inside">
            <p>Product : {item.productName}</p>
            <p>Price : {item.price}</p>
            <p>Quantity : {item.quantity}</p>
            </div>
          ))
        }
        <p className="in">Total : {total}</p>
        {/* <div className='flex justify-end'><button className="button1 ">Payment</button></div> */}
        <div  className='flex justify-end'>
        <Payment Amount={total} />
        </div>
      </div>
    </div>
    </div>
</div>
);
}
