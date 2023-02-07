import { Button, Container, Fade, Stack } from 'react-bootstrap';
import { NAV_LINKS } from '../../utils/constants';
import "./HomePage.css";
import { createHook } from 'async_hooks';
import { useState } from 'react';

export default function HomePage() {

	

	return (
		<Fade appear={true} in={true}>
			<div className='homescreen'>
				<Container fluid className="text-center align-items-center">
						<Stack gap={5}>
								<h1 className="display-1 fw-bold">Hire-a-Patient</h1>
								<p className="lead">Tagline goes here</p>
						</Stack>
						<Button variant="secondary" href={NAV_LINKS.JOBS}>
							Explore Jobs
						</Button>
				</Container>
			</div>
		</Fade>

	);
}
