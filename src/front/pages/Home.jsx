import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
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
					throw new Error('Failed to fetch user data');
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
		<div className="text-center mt-5">
			<h1>Welcome to the Home Page, {store?.user?.email || "Guest"}</h1>
		</div>
	);
}; 