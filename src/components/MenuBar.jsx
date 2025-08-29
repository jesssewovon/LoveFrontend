import { NavLink, Link } from 'react-router';

export default function MenuBar() {
    return (
    	<>
	    	<div className="menubar-area footer-fixed">
				<div className="toolbar-inner menubar-nav">
					<NavLink to="/home" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i className="flaticon flaticon-dog-house"></i>
					</NavLink>
					<NavLink to="/explore" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i className="flaticon flaticon-search"></i>
					</NavLink>
					<NavLink to="/wishlist" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i className="flaticon flaticon-heart"></i>
					</NavLink>
					<NavLink to="/chat-list" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i className="flaticon flaticon-chat-1"></i>
					</NavLink>
					<NavLink to="/profile" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i className="flaticon flaticon-user"></i>
					</NavLink>
				</div>
			</div>
		</>
    );
}