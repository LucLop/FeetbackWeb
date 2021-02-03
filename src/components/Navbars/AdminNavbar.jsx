  /*!

  =========================================================
  * Argon Dashboard React - v1.0.0
  =========================================================

  * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
  * Copyright 2019 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

  * Coded by Creative Tim

  =========================================================

  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  */
  import React from "react";
  import { Link } from "react-router-dom";
  import { useHistory } from 'react-router-dom';

  // reactstrap components
  import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media
  } from "reactstrap";
  //Admin nabvar after authentification
  function AdminNavbar() {
    const history = useHistory();
    let info = JSON.parse(localStorage.getItem("CURRENT_USER"));
    return (
      <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
      <Link
      className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
      to="/"
      >
      
      </Link>
      <Nav className="align-items-center d-none d-md-flex" navbar>
      <UncontrolledDropdown nav>
      <DropdownToggle className="pr-0" nav>
      <Media className="align-items-center">
      <span className="avatar avatar-sm rounded-circle">
      <img
      alt="..."
      src={require("assets/img/theme/doctor.png")}
      />
      </span>
      <Media className="ml-2 d-none d-lg-block">
      <span className="mb-0 text-sm font-weight-bold">
      {
        (info) ? 
        `${info.name} ${info.lastname}`
        : "undefined"
      }
      </span>
      </Media>
      </Media>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
      <DropdownItem className="noti-title" header tag="div">
      <h6 className="text-overflow m-0">Bienvenue !</h6>
      </DropdownItem>
      <DropdownItem to="/admin/user-profile" tag={Link}>
      <i className="ni ni-single-02" />
      <span>Mon profil</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem href="#pablo" onClick={() => {
                      //if the user click on logout we removed the current user and we redirect to the login page
                      localStorage.removeItem("CURRENT_USER");
                      localStorage.removeItem("TOKEN");
                      history.push("/auth/login");

                    }}>
                    <i className="ni ni-user-run" />
                    <span>Deconnexion</span>
                    </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                    </Container>
                    </Navbar>
                    </>
                    );
                  }

                  export default AdminNavbar;