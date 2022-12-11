import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';

const Header = () => {
    const { state } = useContext(StoreContext);
    const { cart } = state;
    const navItems = <>
        <li className='font-medium'><Link to='/'>Home</Link></li>
        <li className='font-medium'><Link>Contact</Link></li>
        <li className='font-medium relative'>
            <Link>
                Cart
                <div className='absolute top-0 -right-2'>
                    {
                        cart.cartItems.length > 0 &&
                        <span className="badge badge-sm bg-red-600 text-white">{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
                    }
                </div>
            </Link>
        </li>
    </>
    return (
        <div className="navbar bg-gray-800 text-white justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <div className='text-black'>
                            {navItems}
                        </div>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">amazona</Link>
            </div>
            <div className="navbar-center text-white hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Header;