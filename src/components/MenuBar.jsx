import { NavLink, Link } from 'react-router';

export default function SideBar() {
    return (
    	<>
	    	<div class="menubar-area footer-fixed">
				<div class="toolbar-inner menubar-nav">
					<NavLink to="/" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i class="flaticon flaticon-dog-house"></i>
					</NavLink>
					<NavLink to="explore" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i class="flaticon flaticon-search"></i>
					</NavLink>
					<NavLink to="wishlist" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i class="flaticon flaticon-heart"></i>
					</NavLink>
					<NavLink to="chat-list" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i class="flaticon flaticon-chat-1"></i>
					</NavLink>
					<NavLink to="profile" className={({ isActive }) =>
			            isActive ? "nav-link active" : "nav-link"
			        }>
						<i class="flaticon flaticon-user"></i>
					</NavLink>
				</div>
			</div>
		</>
    );
}