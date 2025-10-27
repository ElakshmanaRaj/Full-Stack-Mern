import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/user/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import keywordCategory from '../utilis/keywordCategory';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Filterbar from '../components/user/Filterbar';

const Search = () => {

    const { query } = useParams();
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state)=> state.products);
    const [filterProducts, setFilterProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([Math.min(...products.map((p)=>p.price)), Math.max(...products.map((p)=>p.price))]);
    const [select, setSelect] = useState([]);
    const [sort, setSort] = useState("");
    const [mobileBar, setMobileBar] = useState(false);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    const minPrice = Math.min(...products.map(p => p.price));
    const maxPrice = Math.max(...products.map(p => p.price));
   

    useEffect(()=>{
        if(query && products.length > 0 ){
            const lowerQuery = query.toLowerCase().trim();
            const matchedCategory = Object.keys(keywordCategory).find((cat)=>
                keywordCategory[cat].some((keyword)=> keyword.toLowerCase().includes(lowerQuery))
            );
            let filteredData = products.filter((item)=>{
                const name = item.name?.toLowerCase().includes(lowerQuery);
                const category = item.category?.name.toLowerCase().includes(lowerQuery);
                const keyword = matchedCategory && item.category?.name.toLowerCase().replace(/\s+/g, "") === matchedCategory;
                return name || category || keyword;
            });

            if(select.length > 0){
                filteredData = filteredData.filter((item)=> select.includes(item.category?._id));
            }
            
            filteredData = filteredData.filter((item)=>
                item.price>= priceRange[0] && item.price <= priceRange[1]);
            

            filteredData = filteredData.sort((a, b)=>{
                if(sort === "lowToHigh") return a.price - b.price;
                if(sort === "highToLow") return b.price - a.price;
                return 0
            })

            setFilterProducts(filteredData);
        } else {
            setFilterProducts([]);
        }
    },[query, products, sort, select, priceRange]);

    


  return (
    <div className="flex flex-wrap min-[1000px]:flex-nowrap mx-auto justify-start">
      {/* Desktop View */}
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

      {/* Product Lists */}
    <div className='px-4 lg:px-5 min-[1000px]:pt-20 w-full'>
        <h5 className='font-medium mb-2.5 text-[14px] text-justify mt-2.5' style={{lineHeight:"1.6"}}>Search results for <span className='text-purple-500'>{query}</span></h5>
        <h6 className='font-medium mb-2 text-[14px] text-justify'>Product Lists:&nbsp;{filterProducts.length}</h6>
        {loading && <p className="text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto my-5'>
            { filterProducts.length > 0 ? (
            filterProducts.map((item)=>(
                <Card
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                category={item.category}
                images={item.images}
                stock={item.stock}
                description={item.description}
                />
            )))
            :(
                <p className='text-[15px] font-medium text-red-500'>No Products found</p>
            )}
        </div>
    </div>
    </div>
  )
}

export default Search;