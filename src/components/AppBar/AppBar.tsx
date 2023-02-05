import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function AppBar() {
	return (
		<Navbar expand="lg">
			<Container>
				<Navbar.Brand href="/">Hire-a-Patient</Navbar.Brand>
				<Navbar.Toggle aria-controls="appbar" />
				<Navbar.Collapse id="appbar">
					<Nav className="me-auto">
						<Nav.Link href="#">About</Nav.Link>
						<Nav.Link href="#">Jobs</Nav.Link>
						<Nav.Link href="#">Blog</Nav.Link>
						<NavDropdown title="my-username">
							<NavDropdown.Item href="#">Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/login">Sign in</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
