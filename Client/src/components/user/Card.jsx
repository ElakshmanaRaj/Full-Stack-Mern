import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux"
import { addToFavorite, removeFromFavorite } from '../../redux/favoriteSlice';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const Card = ({id, name, price, category, stock, description, images }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state)=> state.favorites.items);
    const isFavorite = favorites.some((item)=>item.id === id);

    const handleFavorite = ()=>{
        if(isFavorite){
            dispatch(removeFromFavorite(id));
        } else {
            dispatch(addToFavorite({id, name, price, category, stock, description, images}));
            toast.success("Added to favorites", {
                className:"custom-toast",
            });
        }
    }

  return (
    <div className='p-3.5 w-[310px] relative bg-white border border-gray-200 rounded-md mx-auto shadow-md cursor-pointer'>
        <div title={name} >
            <div className='flex justify-center space-x-3 mb-3'>
                {images[0] && (
                    <img 
                    src={images[0]} 
                    alt={`${name}`} 
                    className='w-full h-48 rounded-md object-contain hover:scale-105 transition-all ease-out'
                    />
                )}
            </div>
            <div className='text-center mt-3'>
                <span className='absolute top-3 right-5' onClick={handleFavorite} >
                    { isFavorite ? (
                        <IoIosHeart size={20} className='text-red-600 font-semibold'/>
                    ):(
                        <IoIosHeartEmpty size={20} className='text-red-600 font-semibold'/>
                    )}
                </span>
                <h3 className='font-semibold text-overflow text-[18px] mb-2'>{name}</h3>
                <p className="text-purple-700 font-bold mb-2">Price: &nbsp;₹{Math.round(price)} </p>
                <p className="font-medium text-slate-800 capitalize mb-3">
                    Category: &nbsp;{category?.name || category}
                </p>
                <p onClick={()=>navigate(`/product/${id}`)}
                className="mt-2.5 mb-3.5 text-[14px] font-medium border border-teal-500 py-1 rounded-[8px] transition-all ease-out duration-500 hover:bg-teal-500 hover:text-white">
                    View Detail
                </p>
                <button 
                onClick={()=>dispatch(addToCart({id, name, images, stock, price, category, description }))} 
                className='bg-teal-500 text-white rounded-[8px] font-medium px-2.5 py-0.5 cursor-pointer transition-all ease-in-out duration-300 border hover:bg-teal-400'>
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card;