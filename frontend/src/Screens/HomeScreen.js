import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../Pages/Product/Product';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';


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
            <h1 className="text-3xl pl-2">Featured Products: {products.length}</h1>
            <div className='flex flex-wrap justify-between my-3'>
                {
                    loading ? <LoadingBox />
                        :
                        error ? <MessageBox variant='danger'>{error}</MessageBox>
                            :
                            products.map((product, i) => <Product
                                key={i}
                                product={product}
                            ></Product>)
                }
            </div>
        </div>
    );
};

export default HomeScreen;