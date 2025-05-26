import React, { useEffect } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate } from 'react-router-dom'
import privateImage from '../assets/img/private.jpg'

const Private = () => {
  const navigate = useNavigate()
  const { store} = useGlobalReducer()
  const { user } = store
  
  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      // If not, redirect to the login page
      navigate('/login')
    }
  }
  , [user, navigate])

  return (
    <div className='d-flex flex-column align-items-center w-100 p-4'>
      <h1 className="text-center w-100 display-5 mt-5 mb-3">Welcome to the <span className="d-block display-1">Private Page</span></h1>
            <div className="d-flex justify-content-center align-items-center" style={{width: "300px"}}>
              <img src={privateImage} alt="Welcome" className="img-fluid" />
            </div>
    </div>
  )
}

export default Private