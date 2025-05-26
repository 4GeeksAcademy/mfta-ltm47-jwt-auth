import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import welcomeImage from "../assets/img/welcome.gif";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()
	const { user, token} = store

	useEffect(() => {
		if (user && token) return;
		
		const apiUrl = import.meta.env.VITE_BACKEND_URL;

		async function fetchUser() {
			try {
				if (!token) return;

				const response = await fetch(`${apiUrl}/user`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (!response.ok) {
					console.error('Failed to fetch user data');
					dispatch({type: "logout"})
					return;
				}

				const userData = await response.json();
				dispatch({ type: 'login', payload: {user: userData, token}});
			} catch (error) {
				console.error(error);
				dispatch({type: "logout"})
			}
		}

		fetchUser();
	}, [dispatch, user, token]);

	return (
		<div className="d-flex flex-column align-items-center w-100 p-4">
			<h1 className="text-center w-100 display-5 mt-5 mb-3">Welcome to the <span className="d-block display-1">Home Page</span></h1>
			<div className="d-flex justify-content-center mb-5" style={{width: "200px"}}>
				<img src={welcomeImage} alt="Welcome" className="img-fluid" />
			</div>
			<p className="fw-semibold">User: {store?.user?.email || "Guest"}</p>
		</div>
	);
}; 