import React, { useEffect, useState } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import axios from 'axios';

export default function Cartpost() {
    const [isOpen , setIsOpen]= useState(false);
    const [productName,setProductName] = useState("");
    const [image,setImage] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [price , setPrice] = useState();
    const [description , setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [selectedCategories,setSelectedCategories]=useState([]);
    const handlefile =(e)=>{
      const selectedFile =e.target.files[0];
      if (selectedFile) {
        setImage(selectedFile);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setFilePreview(fileReader.result);
        };
        fileReader.readAsDataURL(selectedFile);
      }
    }

    const category = [
       "home",
       "snacks",
       "fashion",
    ];

    const handleCheckbox = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        setSelectedCategories([...selectedCategories, value]);
      } else {
        setSelectedCategories(selectedCategories.filter((category) => category !== value));
      }
    };

      const toggleDropdown = () => setIsOpen(!isOpen);


      const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "react_unsigned_upload");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dhn7ngwqs/image/upload",
          formData
        );

        return response.data.secure_url;
        };


      const handleSubmit=async(e)=>{
        e.preventDefault();
        // const formData = new FormData();

        // formData.append('productName',productName);
        // formData.append('image',image);
        // formData.append('description',description);
        // formData.append('price',price);
        // formData.append('selectedCategories',selectedCategories);
        // formData.append('quantity',quantity);
        // // console.log(formData);
        try {

          let imageUrl = "";

          if (image) {
            imageUrl = await uploadImageToCloudinary(image);
          }

          const token = localStorage.getItem("token");

          const productData = {
            productName,
            description,
            price,
            selectedCategories,
            quantity,
            image : imageUrl
          }

          console.log(productData);

          // https://aatulya-bharat.onrender.com/product
          const res = await axios.post("https://aatulya-bharat.onrender.com/product/create", productData, {
                  headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
          });
          console.log("Product added" ,res.data);
        } catch (error) {
          console.error("There was an error submitting the form!", error);
        }
      }





  return (

    <div className='bg-gradient-to-br from-orange-50 via-white to-blue-50 h-auto w-[100vw]'>
     <div className='flex justify-between p-2 bg-gradient-to-r from-rose-700 to-orange-400'>
      <div className='flex gap-2'>
      <Link to='/Make-in-India'><span className='text-slate-950 relative top-1'><BsArrowLeftShort/></span></Link>
      <h3 className='text-xl font-semibold text-gray-800'>Atulya Bharat</h3>
      </div>
      </div>
      <h1 className='font-serif text-base text-center text-red-400 pt-2'>DESH KA MAAN DESH KA SAAMAN</h1>
      <div className='p-5 bg-orange-200 m-3 h-auto '>

        <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data" >
        <input
          type='text'
          name='productName'
          id='productName'
          className='font-bold text-3xl list-none border-none bg-transparent mb-4'
          placeholder='ProductName'
          onChange={(e) => setProductName(e.target.value)} />

         <input
          type='file'
          className='hidden'
          id='file'
          accept='image/*'
          onChange={handlefile}
        />
        <label htmlFor='file' className='items-center cursor-pointer text-4xl'>
          <GrAddCircle className='hover:text-blue-900 duration-300' />
        </label>
        {image && (
          <div className='mt-4'>
            <img src={filePreview} alt='Selected File Preview' className='w-full max-w-xs' />
          </div>
        )}

        <input
          type='text'
          name='price'
          id='price'
          className='font-bold text-base list-none border-none bg-transparent mt-4 mb-2'
          placeholder="200"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br/>
        <textarea
          type='text'
          name='description'
          id='description'
          className='font-bold text-base list-none border-none bg-transparent mt-4 w-[80vw] h-auto'
          placeholder='description....'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <input
          type='text'
          name='quantity'
          id='quantity'
          className='font-bold text-base list-none border-none bg-transparent mt-4'
          placeholder='Quantity:101'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br/>
        <br />
        <label className='font-bold text-base list-none border-none bg-transparent mt-4'>Category: </label>
        <button type="button" onClick={toggleDropdown} className="dropbtn w-24 text-xs bg-gray-500 rounded-md h-12">
          Select Categories
        </button>
        {isOpen && (
          <div className='dropdown-content'>
            {category.map((cat) => (
              <label key={cat}>
                <input
                  type='checkbox'
                  value={cat}
                  id='cat'
                  name='cat'
                  onChange={handleCheckbox}
                  checked={selectedCategories.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
        <br />
        <button className='mt-4 mb-4 p-2 w-24 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300'>
            Sell
        </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </div>
  )
}
