import React from 'react';
import background from'../assets/login.jpg'
import { Link } from 'react-router-dom';

const FormComponent = ({ title, children, onSubmit, disabled, register, forgotPassword }) => {
  return (
  <>
    <div style={{ backgroundImage: `url(${background})` }} className="flex flex-col  text-gray-700 shadow-none items-center justify-center h-screen sm:max-w-full sm:max-h-full md:max-w-full md:max-h-full">
        <div className="bg-white p-12 border-2 border-gray-100 rounded-lg w-full max-w-min mb-22">
            <form className="mt-2 mb-10 max-w-screen-2xl max-h-screen-2xl sm:w-96 ">
            {title && <h4 className="text-4xl font-sans font-semibold mb-10">{title}</h4>}
            {children}
            {}
            <button
                className="mt-6 block w-full select-none rounded-lg bg-cyan-800 py-3 px-6 text-center align-middle font-sans text-sm font-semibold uppercase text-white transition-all hover:bg-cyan-700 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-light="true"
                onClick={onSubmit}
                disabled={disabled}
            >
                Submit
            </button>
            <div className='flex flex-row h-10 items-end justify-between'>
              {register && <Link to='/register'> Sign Up </Link>}
              {forgotPassword && <Link  to='/forgot-password'> Forgot Password </Link>}
            </div>
            </form>
        </div>
    </div>
    </>  
  );
};

export default FormComponent;
