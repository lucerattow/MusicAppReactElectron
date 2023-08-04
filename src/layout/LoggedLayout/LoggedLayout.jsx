import React from "react";
import { LeftMenu, TopBar, Footer } from "../../components/Layout";
import "./LoggedLayout.scss";

export function LoggedLayout({ children }) {
	//renderizado
	return (
		<div className="logged-layout">
			<div className="logged-layout__toolbars">
				<div className="logged-layout__left-menu">
					<LeftMenu />
				</div>
				<div className="logged-layout__content">
					<div className="logged-layout__top-bar">
						<TopBar />
					</div>
					<div className="logged-layout__children">
						{children}
					</div>
				</div>
			</div>
			<div className="logged-layout__footer">
				<Footer />
			</div>
		</div>
	);
}
