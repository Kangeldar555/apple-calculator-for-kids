import React, { useState } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  expand: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Header = ({ expand }: Props) => {

  const appLogoUrl: string = `${process.env.PUBLIC_URL}/favicon.png`;
  const fullTitle: string = 'Manzanitas Mágicas - Calculadora';
  const shortTitle: string = 'Manzanitas Mágicas';
  const modalSubtitle: string = 'Calculadora';
  const homeLinkText = 'Inicio';
  const helpLinkText = 'Ayuda';
  const aboutLinkText = 'Acerca';

  const [showModal, setShowModal] = useState(false);

  const handleCloseMenu = () => {
    setShowModal(false);
  };

  const handleToggleMenu = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <Navbar variant="dark" expand={expand} className="custom-navbar">
      <Container fluid className='custom-content'>
        <Navbar.Brand as={Link} to='/' className="d-flex align-items-center">
          <img
            src={appLogoUrl}
            alt="Logo"
            width="24"
            height="24"
            className="me-2"
          />
          <h1 className="d-md-none fs-6 m-0">{shortTitle}</h1>
          <h1 className="d-none d-md-inline fs-5 m-0">{fullTitle}</h1>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          onClick={handleToggleMenu} // Permite cerrar y abrir el menú
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="top"
          className="custom-dialog bg-dark bg-opacity-75 text-white h-100"
          show={showModal} // Controla la vista del menú
        >
          <Offcanvas.Header closeButton
          onClick={handleCloseMenu}>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
              onClick={(e: React.MouseEvent<HTMLHeadingElement>) => e.stopPropagation()} // Evita la propagación del onClick del elemento padre
              className='d-flex align-items-center w-100'
            >
              <img
                src={appLogoUrl}
                alt="Logo"
                width="30"
                height="30"
                className="me-2"
              />
              <div className='d-flex flex-column'>
                <h2 className="fs-5 m-0">{shortTitle}</h2>
                <h3 className='fs-6 m-0 fw-normal'>{modalSubtitle}</h3>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={NavLink} to='/' onClick={handleCloseMenu}>{homeLinkText}</Nav.Link>
              <Nav.Link as={NavLink} to='/help' onClick={handleCloseMenu}>{helpLinkText}</Nav.Link>
              <Nav.Link as={NavLink} to='/about' onClick={handleCloseMenu}>{aboutLinkText}</Nav.Link>
            </Nav>
          </Offcanvas.Body>
          <footer>
            <Footer />
          </footer>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header