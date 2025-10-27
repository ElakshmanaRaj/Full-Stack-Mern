import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { API_PATHS, BASE_URL } from '../../utilis/apiPath';

const Product = () => {

    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await axios.get(BASE_URL + API_PATHS.PRODUCT.GET_PRODUCT);
            setProducts(res.data);
        } catch (err) {
            if(err.response && err.response.data.message){
                setError(err.response.data.message);
            } else{
                setError("Something went wrong, Please try again later");
            }
        }
    }

    useEffect(()=>{
        getProducts();
        {}
    },[]);
  return (
    <DashboardLayout>
        <div className='p-4 lg:pl-72 lg:my-5'>
            <h2 className='text-xl font-semibold'>Product Lists&nbsp;({products.length})</h2>
            {error && <p className='text-red-500 text-[15px] mt-2.5'>{error}</p>}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {products.length > 0 ? (
                    products.map((product)=>(
                        <ProductCard 
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        stock={product.stock}
                        description={product.description}
                        images={product.images}
                        updated={getProducts}
                        />
                    ))
                ):(
                    !error && <p className="text-gray-500">No products available</p>
                )}
            </div>
        </div>
    </DashboardLayout>
  )
}

export default Product;