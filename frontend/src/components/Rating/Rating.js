import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ product }) => {
    const { rating, numReviews } = product;
    return (
        <div className='flex justify-between items-center my-1 gap-1 text-orange-500'>
            <div className='flex gap-1'>
                <span>
                    {rating >= 1 ? <FaStar />
                        : rating >= 0.5 ? <FaStarHalfAlt />
                            : <FaRegStar />}
                </span>
                <span>
                    {rating >= 2 ? <FaStar />
                        : rating >= 1.5 ? <FaStarHalfAlt />
                            : <FaRegStar />}
                </span>
                <span>
                    {rating >= 3 ? <FaStar />
                        : rating >= 2.5 ? <FaStarHalfAlt />
                            : <FaRegStar />}
                </span>
                <span>
                    {rating >= 4 ? <FaStar />
                        : rating >= 3.5 ? <FaStarHalfAlt />
                            : <FaRegStar />}
                </span>
                <span>
                    {rating >= 5 ? <FaStar />
                        : rating >= 4.5 ? <FaStarHalfAlt />
                            : <FaRegStar />}
                </span>
            </div>
            {numReviews} Reviews
        </div>
    );
};

export default Rating;