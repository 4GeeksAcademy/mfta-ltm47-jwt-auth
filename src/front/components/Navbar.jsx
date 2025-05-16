import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer();

	function handleLogout() {
		localStorage.removeItem("token");
		dispatch({ type: 'set_user', payload: null });
	}


	return (
		<nav className="navbar navbar-light bg-neutral-100 w-100">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT Basic Auth</span>
				</Link>
				{/* If the user is logged ... */}
				{
					store?.user && 
					<div className="ml-auto d-flex gap-2 align-items-center">
						<Link to="/private">Private Page</Link>
						<button className="btn btn-danger" onClick={handleLogout} >Logout</button>
					</div>
				}

				{/* If the user isn't logged */}
				{
					!store?.user &&
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary me-2">Login</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-primary">Signup</button>
						</Link>
					</div>
				}
			</div>
		</nav>
	);
};