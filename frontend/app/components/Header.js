import React, { Component, Fragment } from "react";
import Logo from "./assets/Logo.png";
import './styles.css'

class Header extends Component {
  render() {
    return (
      <Fragment>
        <div className="text-center">
          <img
            src={Logo}
            width="100"
            className="img-thumbnail"
          />          
          <button type="button" className="btn btn-danger btn11" onClick={(e) => {
                    window.location.reload();
                }}>Log Out</button>
          <hr />
        </div>
        <div>

        </div>
      </Fragment>
    );
  }
}

export default Header;
