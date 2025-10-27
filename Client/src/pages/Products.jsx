import React, { useEffect, useState } from "react";
import Card from "../components/user/Card";
import Filterbar from "../components/user/Filterbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Products = () => {
 
  const dispatch = useDispatch();
  const { items: products, loading, error }  = useSelector((state)=>state.products);
  const [priceRange, setPriceRange] = useState([Math.min(...products.map((p)=>p.price)), Math.max(...products.map((p)=>p.price))]);
  const [select, setSelect] = useState([]);
  const [sort, setSort] = useState("");
  const [mobileBar, setMobileBar] = useState(false);
  const { path } = useLocation();


  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  useEffect(()=>{
    window.scroll({left:0, top:0, behavior:"smooth"});
  },[path]);


  const filteredProducts = products.filter((p) => {
    const categoryMatch = select.length ? select.includes(p.category?._id) : true;
    const priceMatch = p.price >= priceRange[0] && p.price<=priceRange[1];
    return categoryMatch && priceMatch;
  }).sort((a,b)=>{
    if(sort === "lowToHigh") return a.price - b.price;
    if(sort === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-wrap min-[1000px]:flex-nowrap mx-auto justify-start">
      {/* Desktop view */}
      <div className="max-[1000px]:hidden pt-16 w-60 shadow-md">
        <Filterbar sort={sort} setSort={setSort} priceRange={priceRange} setPriceRange={setPriceRange} maxPrice={maxPrice} minPrice={minPrice} select={select} setSelect={setSelect} />
      </div>

      {/* Mobile and Tablet View */}
      <div className="min-[1000px]:hidden pt-16">
        <div className="flex gap-2.5 items-center px-4 mt-2.5">
          <h6 className="font-semibold">Filters</h6>
          <button className="font-semibold">
            <HiOutlineMenu onClick={()=>setMobileBar(true)} size={20}/>
          </button>
        </div>
      </div>

      {/* Mobile and Tablet Filterbar */}
        <div className={` bg-white w-60 transition-transform transform flex justify-between shadow-md pt-14 fixed top-0 left-0 z-40 ease-in-out duration-500 ${mobileBar ? "translate-x-0" :"-translate-x-full"}`}>
          <Filterbar sort={sort} setSort={setSort} priceRange={priceRange} setPriceRange={setPriceRange} maxPrice={maxPrice} minPrice={minPrice} select={select} setSelect={setSelect} />
          <HiOutlineX size={22} className="font-semibold mr-3 mt-5" onClick={()=>setMobileBar(false)}/>
        </div>

      {/* Product Listt */}
      <div className="px-4 lg:px-5 min-[1000px]:pt-20 w-full">
        <h5 className="font-semibold text-[18px] mt-2.5">Product Lists ({filteredProducts.length}) </h5>
        {error && <p className="text-red-400 text-[14px]">{error}</p>}
        {loading && <p className="text-gray-500 text-[14px] my-2.5">Please wait Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto my-5 card">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Card
                key={p._id}
                id={p._id}
                name={p.name}
                price={p.price}
                category={p.category}
                stock={p.stock}
                images={p.images}
                description={p.description}
              />
            ))
          ) : (
            !error && <p className="text-gray-500 text-[14px]">No Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
