import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';

export default function AppBar() {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="/">Hire-a-Patient</Navbar.Brand>
				<Navbar.Toggle aria-controls="appbar" />
				<Navbar.Collapse id="appbar">
					<Nav className="me-auto">
						<Nav.Link href="#">About</Nav.Link>
						<Nav.Link href={NAV_LINKS.JOBS}>Jobs</Nav.Link>
						<Nav.Link href="#">Blog</Nav.Link>
						<NavDropdown title="my-username">
							<NavDropdown.Item href="#">Profile</NavDropdown.Item>
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
