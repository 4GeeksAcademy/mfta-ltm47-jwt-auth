import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import welcomeImage from "../assets/img/welcome.gif";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate()
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		const apiUrl = import.meta.env.VITE_BACKEND_URL;

		async function fetchUser() {
			try {
				const token = localStorage.getItem("token");
				
				if (!token) {
					console.log("No token found, user is not logged in.");
					return;
				}

				const response = await fetch(`${apiUrl}/user`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (!response.ok) {
					console.error('Failed to fetch user data');
					localStorage.removeItem("token");
					return;
				}

				const userData = await response.json();
				dispatch({ type: 'set_user', payload: userData });
			} catch (error) {
				console.error(error);
			}
		}

		fetchUser();
	}, [dispatch]);

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