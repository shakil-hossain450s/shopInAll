import React from 'react';
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating/Rating';

const Product = ({ product }) => {
    const { slug, name, image, brand, price } = product;
    return (
        <div className='product bg-slate-100 p-3 shadow-xl border'>
            <Link to={`/product/${slug}`}>
                <img className="mb-2 border" src={image} alt={name} />
            </Link>
            <div className="ml-1 mt-3">
                <p className="text-base font-normal text-gray-500">{brand}</p>
                <Link to={`/product/${slug}`}>
                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                </Link>
                <Rating product={product}></Rating>
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-bold">${price}</p>
                    <button className="btn btn-ghost rounded-full btn-outline text-xl">
                        <FaCartPlus className="w-4 h-4"></FaCartPlus>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;