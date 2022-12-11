import React, { useEffect, useReducer, useState } from 'react';
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: ''
    })
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: data.products })
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAILED', payload: err.message });
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1 className="text-3xl">Featured Products: {products.length}</h1>
            <div className='products'>
                {
                    loading ? <div>Loading...</div>
                        :
                        error ? <div>{error}</div>
                            :
                            products.map((product, i) =>
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