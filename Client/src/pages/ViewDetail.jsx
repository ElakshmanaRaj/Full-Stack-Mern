import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { API_PATHS, BASE_URL } from '../utilis/apiPath';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ViewDetail = () => {

    const { id } = useParams();
    const[error, setError]= useState(false);
    const[product, setProduct] = useState(null);
    const[loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { path } = useLocation();


    useEffect(()=>{
      window.scroll({top: 0, left: 0, behavior:"smooth"});
    },[path]);


    const getProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${API_PATHS.PRODUCT.GET_PRODUCT_BY_ID(id)}`);
        setProduct(res.data);
      } catch (err) {
        if(err.response && err.response.data.message){
          setError(err.response.data.message);
        }
      } finally{
        setLoading(false);
      }
    }

    useEffect(()=>{
      getProduct();
    },[]);


  return (
    <div className='px-20 pt-10'>
      {error && <p className='text-red-400 text-[14px] mb-1.5'>{error}</p>}
      {loading ? (
        <p>Loading Product Details...</p>
      ): product ?(
        <div className='flex flex-col gap-10 my-12'>
          <div className='flex flex-wrap items-end gap-7'>
            {product.images && product.images.length > 0 && (
              <img 
              src={product.images[0]} 
              alt={product.name}
              className='w-64 h-64 rounded-md object-contain cursor-pointer hover:scale-110 transition-all duration-300 ease-in'/>
            )}
            <div className='flex flex-wrap gap-3.5'>
              {product.images && product.images.slice(1).map((img, index)=>(
                <img
                key={index}
                src={img}
                className='w-[100px] h-[100px] rounded-md object-contain cursor-pointer hover:scale-110 transition-all duration-300 ease-in'/>
              ))}
            </div>
          </div>
          <div>
            <h5 className='text-xl font-semibold mb-2.5'>{product.name}</h5>
            <p className='mb-2 text-[14px] text-gray-700 text-justify' style={{lineHeight:"1.8"}} >
              {product.description}
            </p>
            <p className='text-purple-600 font-bold mb-2.5'>Price: ₹{Math.round(product.price)}</p>
            <p className='font-medium text-slate-800 capitalize mb-3'>Category: &nbsp;{product.category?.name}</p>
            <p className='font-medium mb-1.5 text-slate-600'>Stock: {product.stock}</p>
            <button 
              onClick={()=> dispatch(addToCart({id, ...product}))}
              className='bg-teal-500 text-white mt-2 rounded-[8px] font-medium px-2.5 py-0.5 cursor-pointer transition-all ease-in-out duration-300 border hover:bg-teal-400'>
              Add To Cart
            </button>
          </div>
        </div>
      ):(
        <p className='text-gray-700'>No Product Found</p>
      )}
    </div>
  )
}

export default ViewDetail;