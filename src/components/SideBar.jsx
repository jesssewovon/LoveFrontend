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
	const handleClickOnLink = () => {
		setSideBarStatus(false)
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
									<Link onClick={handleClickOnLink} to="/wishlist" className="nav-link">
										<span className="dz-icon">
											<i className="flaticon flaticon-heart"></i>
										</span>
										<span>Wishlist</span>
									</Link>
								</li>
								<li>
									<Link onClick={handleClickOnLink} to="/chat-list" className="nav-link">
										<span className="dz-icon">
											<i className="flaticon flaticon-chat-1"></i>
										</span>
										<span>New matchs</span>
									</Link>
								</li>
								<li>
									<Link onClick={handleClickOnLink} to="/settings" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-settings"></i>
										</span>
										<span>Settings</span>
									</Link>
								</li>
								<li>
									<Link onClick={handleClickOnLink} to="/profile" className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-user"></i>
										</span>
										<span>{t('side_menu.profile')}</span>
									</Link>
								</li>
								<li>
									<a onClick={handleClickOnLink} className="nav-link">
										<span className="dz-icon">
                    						<svg fill="#ff50a2" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-l</title><path d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z"></path><path d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z"></path></g></svg>
										</span>
										<span>{t('side_menu.language')}</span>
									</a>
								</li>
								<li>
									<a onClick={() => handleLogout()} className="nav-link">
										<span className="dz-icon">
											<i className="icon feather icon-log-out"></i>
										</span>
										<span>{t('log_out')}</span>
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