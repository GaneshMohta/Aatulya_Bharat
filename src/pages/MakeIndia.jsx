import React, {lazy, useEffect} from 'react'
import './front.css'
import { FaShoppingCart } from "react-icons/fa";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IoIosAddCircle } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from 'react-router-dom';
const NavBar = lazy(()=>import('./NavBar'));
import { useDispatch, useSelector } from 'react-redux';
import { arraycart, incrementitem } from '../Redux/cartSlice';
import axios from 'axios';
import { fetchProducts } from '../Redux/productSlice';



export default function MakeIndia() {

  const dispatch=useDispatch();
  // const [preview , setPreview] = useState(null);
  useEffect(()=>{
    dispatch(fetchProducts());
  },[dispatch]);

  const prod = useSelector((state) => state.product.products);
  let len = prod.length;
  // const isLoading = useSelector((state) => state.content.isLoading)
  // const error = useSelector((state) => state.content.error)
     const isLoading = useSelector((state) => state.product.isLoading)
     const error = useSelector((state)=>state.product.error)
      if (isLoading) {
        return 'loading...'
      }
      if (error) {
        return error
      }

  // const getProducts=async()=>{
  //   const res = await axios.get("https://aatulya-bharat.onrender.com/product/get");
  //   console.log("res",res);
  //   dispatch(getProducts(res.data));
  // }
  const cartAdded=(item)=>{
    dispatch(arraycart(item));
  }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3
        }
      };
  return (
    <div className='h-auto aatulya-body'>

    <div className='aatulya-header flex justify-between p-2 sticky top-0 z-10 items-center bg-slate-300'>
      <div className='flex gap-2'>
      <Link to='/'><span className='text-slate-950 relative top-1'><BsArrowLeftShort/></span></Link>
      <h3>Aatulya Bharat</h3>
      </div>
      <div  className='flex flex-col items-center justify-center md:max-xl:'>
          <img src='https://imagesvs.oneindia.com/webp/img/2015/06/02-1433264361-makeinindia-logo.jpg' alt='make in India' className='text-center w-[10%] md:relative left-24 '/>
          <h1 className='font-semibold mib-h1 text-orange-500  mt-0  md:relative left-24 '>MAKE IN BHARAT</h1>
      </div>
      <div className=''>
            <NavBar />
      </div>
      </div>

        <div className=' mib-body'>
            <div className='flex flex-col gap-2'>

            <div>
      <h1 className="p-1 ms-2 font-medium">Best Seller in Home & Decoration</h1>
      <Carousel responsive={responsive}>
        {prod.map((product) => (
          <div key={product.id} className="card1">
            <img
              src={`https://aatulya-bharat.onrender.com/uploads/${product.image}`}
              width={150}
              alt={product.name}
              className="mib-prod-img"
            />
            <div className="text-center">
              <h3>{product.productName}</h3>
              <p>₹{product.price}</p>
              <button
                className="bg-blue-400 w-10 p-1 rounded-md hover:bg-blue-500 duration-150"
                onClick={() => cartAdded(product)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      { len > 4 ? (<button className='relative left-[90%] bg-slate-400 p-1 rounded-md'>View All</button>) : (<div></div>)}
    </div>
    <br />

                <div className=' product-block p-card'>
                  <h1 className='p-1 font-medium'>Best Seller in Indian Snacks</h1>
                  <Carousel  responsive={responsive}>
                   {prod.map((product) => (
                    <div key={product.id} className="card1">
                      <img
                        src={`https://aatulya-bharat.onrender.com/uploads/${product.image}`}
                        width={150}
                        alt={product.name}
                        className="mib-prod-img"
                      />
                      <div className="text-center">
                        <h3>{product.productName}</h3>
                        <p>₹{product.price}</p>
                        <button
                          className="bg-blue-400 w-10 p-1 rounded-md hover:bg-blue-500 duration-150"
                          onClick={() => cartAdded(product)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                  </Carousel>
                  { len > 4 ? (<button className='relative left-[90%] bg-slate-400 p-1 rounded-md'>View All</button>) : (<div></div>)}
                </div>

                <div className=' product-block p-card'>
                  <h1 className='p-1 font-medium'>Best Seller in Fashion</h1>
                  <Carousel  responsive={responsive}>
                  {prod.map((product) => (
                    <div key={product.id} className="card1">
                      <img
                        src={`https://aatulya-bharat.onrender.com/uploads/${product.image}`}
                        width={150}
                        alt={product.name}
                        className="mib-prod-img"
                      />
                      <div className="text-center">
                        <h3>{product.productName}</h3>
                        <p>₹{product.price}</p>
                        <button
                          className="bg-blue-400 w-10 p-1 rounded-md hover:bg-blue-500 duration-150"
                          onClick={() => cartAdded(product)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                  </Carousel>
                  { len > 4 ? (<button className='relative left-[90%] bg-slate-400 p-1 rounded-md'>View All</button>) : (<div></div>)}

                </div>



            </div>
        </div>

    </div>
  )
}
