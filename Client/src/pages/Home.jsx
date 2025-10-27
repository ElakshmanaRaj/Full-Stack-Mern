import React, { useEffect } from 'react'
import Card from '../components/user/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../redux/productSlice';
import { FaTruck, FaHeadphones } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";
import WomenImg from "../assets/Women.webp";
import PotraitImg from "../assets/Potrait.webp";
import { fetchCategories } from '../redux/categorySlice';
import CategoryCarousel from '../components/carousel/CategoryCarousel';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {items, loading, error} = useSelector((state)=>state.products);
  const {items: categories } = useSelector((state)=>state.categories);

  useEffect(()=>{
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  },[dispatch]);


  const features = [
    {
      icon: <FaTruck className="w-8 h-8 text-orange-500" />,
      title: "Free Delivery",
      desc: "Orders from all item",
    },
    {
      icon: <RiRefund2Line className="w-8 h-8 text-orange-500" />,
      title: "Return & Refund",
      desc: "Money back guarantee",
    },
    {
      icon: <MdDiscount className="w-8 h-8 text-orange-500" />,
      title: "Member Discount",
      desc: "On every order over ₹140.00",
    },
    {
      icon: <FaHeadphones className="w-8 h-8 text-orange-500" />,
      title: "Support 24/7",
      desc: "Contact us 24 hours a day",
    },
  ];

 
  return (
    <div className='pt-20 min-[1000px]:px-24 mx-auto'>
      {/* Categories Section */}
      <div className='md:py-8 py-3.5 mx-auto'>
        <CategoryCarousel categories= {categories}/>
      </div>
      {/* Features Section */}
      <section className="w-full bg-white  border-gray-200 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-4 py-6 px-6 text-center sm:text-left"
          >
            <div>{item.icon}</div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    {/* Product Card Section */}
      <h5 className='mt-4 px-3.5 font-semibold'>Latest Products</h5>
      {loading && <p className='text-gray-500 text-[14px] my-2.5'>Please wait Loading...</p>}
      {error && <p className='text-red-400 text-[14px] mt-2.5'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card gap-8 mx-auto my-5'>
        {items.length > 0 ? (
          items.map((item)=>(
            <Card
            key={item._id}
            id={item._id}
            name={item.name}
            images={item.images}
            price={item.price}
            category={item.category}
            stock={item.stock}
            description={item.description}
            />
          )).slice(-6).reverse()
        ):(
          !error && <p className='text-red-400 text-[14px]'>No Products available</p>
        )}
      </div>
      <div className='text-center my-2.5'>
        <button onClick={()=>navigate("/products")} className='bg-teal-500 text-white rounded-[6px] px-2.5 py-0.5 cursor-pointer transition-all ease-in-out duration-300 border hover:bg-teal-400'>
          View All
        </button>
      </div>
      {/* About Section */}
      <section className='py-10'>
       <div className='flex items-center flex-wrap md:flex-nowrap justify-center md:justify-start gap-5'>
        <div>
          <img src={PotraitImg} alt="Women Img" />
        </div>
        <div>
        <h6 className='text-xl font-semibold text-purple-700 text-center lg:text-left'>Unity Collection </h6>
       <p className='text-gray-600 text-sm mt-2.5 text-center lg:text-left px-2.5 md:px-0' style={{lineHeight:"1.6"}} >Discover a curated range of exclusive pieces created in partnership with emerging designers. Each item blends timeless craftsmanship with modern design to bring something truly special to your wardrobe.
        These limited edition products are available for a short time only — once they’re gone, they’re gone for good. Celebrate individuality and creativity with our Unity Collection today.</p>
        </div>
        <div>
          <img src={WomenImg} alt="Women Img" />
        </div>
       </div>
      </section>
    </div>
  )
}

export default Home;