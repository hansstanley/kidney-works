import { Card, Container, Stack } from 'react-bootstrap';
import PageHero from '../../components/PageHero';

export default function AboutPage() {
	return (
		<div>
            <PageHero title='About' tagline='insert tagline'/>
			<Container fluid className="text-center align-items-center">
                <Stack gap={3}>
                    <p>
                        Hello! We are a group looking to make a difference in lives of patients with liver complications. Did you know that 90% of people...
                    </p>
                </Stack>

			</Container>
		</div>
	);
}