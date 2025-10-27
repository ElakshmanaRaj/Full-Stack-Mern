import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import categoryImages from '../../utilis/categoryImages';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = ({ categories }) => {

  const navigate = useNavigate();

    return (
      <div className="w-[95%] md:w-[90%] mx-auto">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={2}
          pagination={{clickable: true}}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="!py-4 !px-3 custom-pagination-swiper"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
        >
          { categories.map((category) => {
            const key = category?.name?.toLowerCase().replace(/\s+/g, '');
            const imageUrl = categoryImages[key] || "https://via.placeholder.com/150?text=Category";
  
            return (
              <SwiperSlide key={category._id} className='mt-5 flex justify-center'>
                <div 
                  onClick={()=> navigate(`/search/${key}`)}
                  className="bg-white shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center p-3">
                  <img
                    src={imageUrl}
                    alt={category.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2 rounded-full border"
                  />
                  <h3 className="text-sm text-center font-medium text-overflow text-gray-700">
                    {category.name}
                  </h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };
  
  export default CategoryCarousel;