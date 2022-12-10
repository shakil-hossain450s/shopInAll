import React from 'react';
import data from '../data';
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div>
            <h1 className="text-3xl">Featured Products</h1>
            <div className='products'>
                {
                    data.products.map((product, i) =>
                        <div className='product bg-slate-100 p-3 shadow-xl border' key={i}>
                            <Link to={`/product/${product.slug}`}>
                                <img className="mb-2 border" src={product.image} alt={product.name} />
                            </Link>
                            <div className="ml-1 mt-3">
                                <p className="text-base font-normal text-gray-500">{product.brand}</p>
                                <Link to={`/product/${product.slug}`}>
                                    <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                                </Link>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 font-bold">${product.price}</p>
                                    <button className="btn btn-ghost rounded-full btn-outline text-xl">
                                        <FaCartPlus className="w-4 h-4"></FaCartPlus>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default HomeScreen;