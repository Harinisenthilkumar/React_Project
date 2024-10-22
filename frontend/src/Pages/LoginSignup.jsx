import React from 'react'
import './Css/LoginSignup.css'
const LoginSignup = () => {
  return (
    <div className="loginSignup">
      <div className='loginsignip-container'>
        <h1>SIGN UP</h1>
        <div className='loginsignup-fields'>
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account?<span>Login</span></p>
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id=''/>
          <p> By continuing, I agree to the tearms of use and privacy policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
