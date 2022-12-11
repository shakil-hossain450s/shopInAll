import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Rating from '../components/Rating/Rating';
import getError from '../components/utils/utils';
import { StoreContext } from '../StoreProvider';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAILED':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const ProductScreen = () => {
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: ''
    })
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAILED', payload: getError(err) });
            }
        }
        fetchData();
    }, [slug]);


    const { state, dispatch: cxtDispatch } = useContext(StoreContext);
    const { cart } = state;
    const handleAddToCart = async() => {
        const existItem = cart.cartItems.find(item => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) { 
            window.alert('Product is Out of Stock');
            return;
        }

        cxtDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity }
        });
    }

    return (
        <div>
            {
                loading ? <LoadingBox />
                    :
                    error ? <MessageBox variant='danger'>{error}</MessageBox>
                        :
                        <div className='lg:p-3'>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h2 className='lg:text-2xl text-xl'>Product Screen For {product.name}</h2>
                            <Link className='link' to='/'>Go Back</Link>
                            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-3'>
                                <div>
                                    <img
                                        className="mb-2 w-3/4 mx-auto"
                                        src={product.image}
                                        alt={product.name} />
                                </div>
                                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-3'>
                                    <div className='p-5'>
                                        <h2 className='text-2xl'>{product.name}</h2>
                                        <div className='divider my-1'></div>
                                        <Rating product={product}></Rating>
                                        <div className='divider my-1'></div>
                                        <p className="text-gray-600 font-bold">Price: ${product.price}</p>
                                        <div className='divider my-1'></div>
                                        <p className="text-gray-600">Description: {product.description}</p>
                                    </div>
                                    <div>
                                        <div className="card w-full bg-base-100 shadow-xl">
                                            <div className="card-body p-5">
                                                <div>
                                                    <div className='flex justify-between items-center'>
                                                        <p className="text-gray-600 font-bold">Price: </p>
                                                        <p className="text-gray-600 font-bold">${product.price}</p>
                                                    </div>
                                                    <div className='divider my-1'></div>
                                                    <div className='flex justify-between items-center'>
                                                        <div>
                                                            <p>Status: </p>
                                                        </div>
                                                        <div>
                                                            {
                                                                product.countInStock > 0 ?
                                                                    <>
                                                                        <div className="bg-green-600 text-white px-2 py-1 rounded">
                                                                            In stock
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <div className="bg-red-600 text-white px-2 py-1 rounded">
                                                                            unavailable
                                                                        </div>
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='divider my-1'></div>
                                                    {
                                                        product.countInStock > 0 ?
                                                            <div>
                                                                <button onClick={handleAddToCart} className='btn w-full mt-2'>Add To Cart</button>
                                                            </div>
                                                            :
                                                            <div>
                                                                <button disabled className='btn w-full mt-2'>Add To Cart</button>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
};

export default ProductScreen;