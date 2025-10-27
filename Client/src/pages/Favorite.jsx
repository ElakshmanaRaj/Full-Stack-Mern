import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems } from '../redux/favoriteSlice';
import Card from '../components/user/Card';
import { Link, useLocation } from 'react-router-dom';

const Favorite = () => {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const { path } = useLocation();

  useEffect(()=>{
    window.scroll({top:0, left:0, behavior:"smooth"});
  },[path]);

  return (
    <div className='pt-20 px-3 min-[1000px]:px-24 mx-auto'>
      <h5 className='font-medium my-2.5 text-red-400 text-center'>Your Favorite Lists</h5>

      { favorites.length === 0 && (
        <div className='text-center my-3.5'>
          <p className='text-gray-500 text-sm font-semibold mb-2.5'>Your Favorite items is empty</p>
          <p className='text-emerald-400 underline font-medium'><Link to="/">Go Back to shopping</Link></p>
        </div>
      )}
      {favorites.length > 0 && (
        <div className='text-center my-5'>
          <button
          onClick={() => dispatch(clearItems())}
          className='text-center bg-red-400 text-white cursor-pointer transition-all duration-300 ease-in-out px-3 py-0.5 rounded-md hover:bg-red-500'
        >
          Clear All
        </button>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto my-4'>
        {favorites.length > 0 && (
          favorites.map((item)=>(
            <Card 
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.images}
            stock={item.stock}
            price={item.price}
            category={item.category}
            description={item.description}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
