import React from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import './Header.scss';

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

  return (
    <Navbar bg="dark" variant="dark" expand={expand} className="custom-navbar bg-gradient">
      <Container fluid className='custom-container'>
        <Navbar.Brand href="#" className="d-flex align-items-center">
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
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="top"
          className="custom-dialog bg-dark bg-opacity-75 text-white h-100"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className='d-flex align-items-center'>
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
              <Nav.Link href="#1">{homeLinkText}</Nav.Link>
              <Nav.Link href="#2">{helpLinkText}</Nav.Link>
              <Nav.Link href="#3">{aboutLinkText}</Nav.Link>
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