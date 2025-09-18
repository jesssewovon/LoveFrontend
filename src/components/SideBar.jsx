import { NavLink, Link } from 'react-router';

import { useTheme } from "../ThemeContext";

import { useSelector, useDispatch } from "react-redux";

import { setIsDarkTheme, signinPiketplace, signoutPiketplace } from "../store/userSlice";
import { useTranslation } from 'react-i18next';

import Loader from './Loader';

export default function SideBar() {
	const {t} = useTranslation()
	const { isSideBarOpen, setSideBarStatus } = useTheme();
	const dispatch = useDispatch();
    const { isDarkTheme, user, isLoggedIn, isLoading } = useSelector((state) => state.user);

	const handleLogin = () => {
		const scopes = ["username", "payments", "wallet_address", "preferred_language"];
		const onIncompletePaymentFound = (payment) =>{
			//console.log('signin onIncompletePaymentFound', payment)
			const txid = payment.transaction.txid;
			const txUrl = payment.transaction._link;
			const paymentId = payment.identifier;
			const data = {
				paymentId:paymentId,
				txid:txid,
			}
			//self.executePaymentCompletion(data)
			//We're not allowed to cancel a payment after approve
			//this.dispatch('cancelPayment', data)
		};
		dispatch(signinPiketplace({ scopes, onIncompletePaymentFound }));
	};

	const handleLogout = () => {
		if (isLoading) {
			return
		}
		dispatch(signoutPiketplace());
	};

    return (
    	<>
    		<div className={`dark-overlay ${isSideBarOpen?'active':''}`} onClick={() => setSideBarStatus(false)}></div>
	    	<div className={`sidebar ${isSideBarOpen?'show':''}`}>
				<div className="inner-sidebar" style={{display: "grid",alignItems: "center"}}>
					{isLoggedIn && user?
						(<>
							<Link to="profile" className="author-box">
								<div className="dz-media">
									<img src={user?.profile?.imageFirst} alt={user?.firstname} style={{height: '100%', objectFit: 'cover'}}/>
								</div>
								<div className="dz-info">
									<h5 className="name">{user?.profile?.firstname}</h5>
									<span>@{user?.username}</span>
								</div>
							</Link>
							<ul className="nav navbar-nav">	
								{/* <li>
									<Link to="/" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-heart"></i>
										</span>
										<span>W3Dating Package</span>
									</Link>
								</li>
								<li>
									<Link to="/" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-list"></i>
										</span>
										<span>Package List</span>
									</Link>
								</li>
								<li>
									<Link to="/" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-wind"></i>
										</span>
										<span>Welcome</span>
									</Link>
								</li>
								<li>
									<Link to="/" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-grid"></i>
										</span>
										<span>Components</span>
									</Link>
								</li> */}
								<li>
									<Link to="/wishlist" className="nav-link">
										<span className="dz-icon">
											<i className="flaticon flaticon-heart"></i>
										</span>
										<span>Wishlist</span>
									</Link>
								</li>
								<li>
									<Link to="/chat-list" className="nav-link">
										<span className="dz-icon">
											<i className="flaticon flaticon-chat-1"></i>
										</span>
										<span>New matchs</span>
									</Link>
								</li>
								<li>
									<Link to="/" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-settings"></i>
										</span>
										<span>Settings</span>
									</Link>
								</li>
								<li>
									<Link to="/profile" className="nav-link" href="profile.html">
										<span className="dz-icon">
											<i className="icon feather icon-user"></i>
										</span>
										<span>Profile</span>
									</Link>
								</li>
								<li>
									<a onClick={() => handleLogout()} className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-log-out"></i>
										</span>
										<span>Logout</span>
										<Loader/>
									</a>
								</li>
							</ul>
						</>
						):
						(
						  
						  <div className="mt-4 mx-2">
		                    <button disabled={isLoading} onClick={() => handleLogin()} className="btn mb-2 me-2 btn-icon icon-start w-100 btn-primary">
								{t('log_in_first')}
								<Loader/>
							</button>
		                  </div>
						)
					}
					<div className="sidebar-bottom">
						<ul className="app-setting">
							<li>
								<div className="mode">
									<span className="dz-icon">                        
										<i className="icon feather icon-moon"></i>
									</span>					
									<span>Dark Mode</span>
									<div className="custom-switch">
										<input type="checkbox" className="switch-input theme-btn" id="toggle-dark-menu" checked={isDarkTheme} onChange={() => dispatch(setIsDarkTheme(!isDarkTheme))}/>
										<label className="custom-switch-label" htmlFor="toggle-dark-menu"></label>
									</div>					
								</div>
							</li>
						</ul>
						<div className="app-info">
							<h6 className="name"> - Dating App</h6>
							<span className="ver-info">App Version 1.0.0</span>
						</div>
					</div>
				</div>
			</div>
		</>
    );
}