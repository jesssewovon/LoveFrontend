import { Link, useNavigate } from 'react-router';
import { useTheme } from "../ThemeContext";

function Header({title, showBackButton, showWishList, classes}) {
	const { isSideBarOpen, setSideBarStatus } = useTheme();
	const navigate = useNavigate();
    return (
    	<>
	        <header className={`header header-fixed border-0 ${classes}`}>
				<div className="container">
					<div className="header-content">
						<div className={`left-content ${showBackButton?'me-3':''}`}>
							{
								!showBackButton?(<a className={`menu-toggler`} onClick={() => setSideBarStatus(!isSideBarOpen)}>
									<i className="icon feather icon-grid"></i>
								</a>)
								:(<>
									<a onClick={() => navigate(-1)} className="back-btn">
										<i className="icon feather icon-chevron-left"></i>
									</a>
									{title!=''?(<h6 className="title">{title}</h6>):''}
								</>)
							}
						</div>
						<div className="mid-content header-logo">
							{showWishList?
								(<Link to="scroll-page">
									<img src={"../src/assets/images/logo.png"} alt=""/>
								</Link>):""
							}
						</div>
						<div className="right-content dz-meta">
							<a href="filter.html" className="filter-icon">
								<i className="flaticon flaticon-settings-sliders"></i>
							</a>
						</div>
					</div>
				</div>
			</header>
		</>
    );
}

export default Header;