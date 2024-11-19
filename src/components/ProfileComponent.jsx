import React from 'react';
import profiili from '../assets/profiili.jpg';
import { useRef, useState } from 'react';
import LogoutButton from './LogoutButton';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {

    const navigateTo = useNavigate();
    const handleClick = () => {
        navigateTo('/profilesettings');
      };

    const { user } = React.useContext(UserContext);
    const Menu = [<div onClick={handleClick}>Asetukset</div>, <LogoutButton />];
    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click', (e) => {
        if (e.target !== menuRef.current && e.target !== imgRef.current) {
            setOpen(false);
        }
    });

    if (!user) {
        return null;
    }

    return (
        <div className='fixed top-4 right-4'>
            <div className="relative inline-block">
                <img
                    ref={imgRef}
                    onClick={() => setOpen(!open)}
                    src={profiili}
                    alt="user"
                    className='h-16 w-16 object-cover border-4 border-gray-400 rounded-full cursor-pointer'
                />
                {open && (
                    <div ref={menuRef} className='bg-white p-4 w-40 shadow-lg absolute top-0 right-0 mt-2'>
                        <ul>
                            {Menu.map((menu, index) => (
                                <li
                                    onClick={() => setOpen(false)}
                                    className='p-2 text-lg cursor-pointer rounded hover:bg-blue-100'
                                    key={index}
                                >
                                    {menu}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileComponent;