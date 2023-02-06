import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';

export default function AppBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">Hire-a-Patient</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-end w-100">
            <Nav.Link href={NAV_LINKS.ABOUT}>About</Nav.Link>
            <Nav.Link href={NAV_LINKS.JOBS}>Jobs</Nav.Link>
            <Nav.Link href={NAV_LINKS.BLOG}>Blog</Nav.Link>
            <NavDropdown title="my-username">
              <NavDropdown.Item href={NAV_LINKS.PROFILE}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={NAV_LINKS.LOGIN}>
                Sign in
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
