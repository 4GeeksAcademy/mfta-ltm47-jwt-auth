import React, { useEffect } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate } from 'react-router-dom'

const Private = () => {
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalReducer()
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
    <div>Private</div>
  )
}

export default Private