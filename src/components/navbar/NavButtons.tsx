import React, { Component } from 'react';
import {
	Button
} from "react-bootstrap";

import "./NavButtons.less";

const NavButtons = (props) => {
	return (
		<div>
      <div>
        {props.isAuthenticated ?
          (<Button onClick={() => props.onNavbarButtonClick("logout")}>Odjavi se</Button>):
          (<Button onClick={() => props.onNavbarButtonClick("login")}>Prijavi se</Button>)}
      </div>
      
    </div>
	);
};

export default NavButtons;