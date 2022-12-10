import React from 'react';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
    const params = useParams();
    const { slug } = params;
    return (
        <div>
            <h2 className='text-2xl'>Products Screen for {slug}</h2>
        </div>
    );
};

export default ProductScreen;