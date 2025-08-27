import { NavLink, Link } from 'react-router';

import { useTheme } from "../ThemeContext";

import { useSelector, useDispatch } from "react-redux";

import { setIsDarkTheme, signinPiketplace, signoutPiketplace } from "../varsSlice";
import { useTranslation } from 'react-i18next';

import Loader from './Loader';

export default function SideBar() {
	const {t} = useTranslation()
	const { isSideBarOpen, setSideBarStatus } = useTheme();
	const dispatch = useDispatch();
    const { isDarkTheme, user, isLoggedIn, isLoading } = useSelector((state) => state.vars);

	const handleLogin = () => {
		const scopes = ["username", "payments", "wallet_address", "preferred_language"];
		const onIncompletePaymentFound = (payment) =>{
			//console.log('signin onIncompletePaymentFound', payment)
			let txid = payment.transaction.txid;
			let txUrl = payment.transaction._link;
			let paymentId = payment.identifier;
			let data = {
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
					{isLoggedIn?
						(<>
							<a href="profile.html" class="author-box">
						<div className="dz-media">
							<img src="../src/assets/images/user/pic1.jpg" alt="author-image"/>
						</div>
						<div className="dz-info">
							<h5 className="name">John Doe</h5>
							<span>example@gmail.com</span>
						</div>
							</a>
							<ul className="nav navbar-nav">	
								<li>
									<NavLink to="/" className={({ isActive }) =>
							            isActive ? "nav-link active" : "nav-link"
							        }>
										<span className="dz-icon">
											<i className="icon feather icon-home"></i>
										</span>
										<span>Home</span>
									</NavLink>
								</li>
								<li>
									<a class="nav-link" href="../package.html">
										<span className="dz-icon">
											<i className="icon feather icon-heart"></i>
										</span>
										<span>W3Dating Package</span>
									</a>
								</li>
								<li>
									<a className="nav-link" href="../package-list.html">
										<span className="dz-icon">
											<i className="icon feather icon-list"></i>
										</span>
										<span>Package List</span>
									</a>
								</li>
								<li>
									<a className="nav-link" href="../index.html">
										<span className="dz-icon">
											<i className="icon feather icon-wind"></i>
										</span>
										<span>Welcome</span>
									</a>
								</li>
								<li>
									<a className="nav-link" href="../components/components.html">
										<span className="dz-icon">
											<i className="icon feather icon-grid"></i>
										</span>
										<span>Components</span>
									</a>
								</li>
								<li>
									<a className="nav-link" href="setting.html">
										<span className="dz-icon">
											<i className="icon feather icon-settings"></i>
										</span>
										<span>Settings</span>
									</a>
								</li>
								<li>
									<a className="nav-link" href="profile.html">
										<span className="dz-icon">
											<i className="icon feather icon-user"></i>
										</span>
										<span>Profile</span>
									</a>
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
										<label className="custom-switch-label" for="toggle-dark-menu"></label>
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