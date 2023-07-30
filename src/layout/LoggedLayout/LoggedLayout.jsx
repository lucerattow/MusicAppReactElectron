import React from "react";
import { LeftMenu, TopBar, Footer } from "../../components/Layout";
import "./LoggedLayout.scss";

export function LoggedLayout({ children }) {
	//renderizado
	return (
		<div className="logged-layout">
			<div className="logged-layout__content">
				<div className="logged-layout__left-menu">
					<LeftMenu />
				</div>
				<div className="logged-layout__children-content">
					<div className="logged-layout__top-bar">
						<TopBar />
					</div>
					{children}
				</div>
			</div>
			<div className="logged-layout__footer">
				<Footer />
			</div>
		</div>
	);
}
