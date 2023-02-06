import { useState } from 'react';
import {
  Badge,
  Button,
  CloseButton,
  Container,
  Form,
  Image,
  InputGroup,
  Stack,
} from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import ProfileSection from './ProfileSection';

export default function ProfilePage() {
  const [skills, setSkills] = useState(['Writing', 'Speaking', 'Teamwork']);
  const [limitations, setLimitations] = useState([
    'Low blood pressure',
    'Medication',
    'Wheelchair',
  ]);

  const handleAddSkill = () => {};

  const handleDeleteSkill = () => {};

  return (
    <Container className="pb-5">
      <PageHero title="Profile" />
      <Stack gap={4}>
        <ProfileSection>
          <Image
            roundedCircle
            className="hover-shadow m-2"
            src="https://1fid.com/wp-content/uploads/2022/07/aesthetic-profile-picture-2-1024x1024.jpg"
            style={{ width: 100, height: 100 }}
          />
          <Button variant="secondary">Change</Button>
        </ProfileSection>
        <ProfileSection>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Your name" />
            </Form.Group>
            <hr />
            <Button type="submit" href="#">
              Update
            </Button>
          </Form>
        </ProfileSection>
        <ProfileSection>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="E.g. johndoe@abc.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="education">
              <Form.Label>Education level</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g. High School Diploma"
              />
            </Form.Group>
          </Form>
        </ProfileSection>
        <ProfileSection>
          <Form>
            <Form.Group className="mb-3" controlId="skills">
              <Form.Label>Skills</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="E.g. public speaking" />
                <Button variant="outline-secondary">Add</Button>
              </InputGroup>
              <Stack direction="horizontal" gap={1} className="mt-2">
                {skills.map((s, i) => (
                  <Badge key={i} bg="secondary">
                    <Stack direction="horizontal" gap={2}>
                      {s}
                      <CloseButton variant="white" />
                    </Stack>
                  </Badge>
                ))}
              </Stack>
            </Form.Group>
            <Form.Group></Form.Group>
            <Form.Group className="mb-3" controlId="physicalLimitations">
              <Form.Label>Physical limitations</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="E.g. low blood pressure"
                />
                <Button variant="outline-secondary">Add</Button>
              </InputGroup>
              <Stack direction="horizontal" gap={1} className="mt-2">
                {limitations.map((l, i) => (
                  <Badge key={i} bg="secondary">
                    <Stack direction="horizontal" gap={2}>
                      {l}
                      <CloseButton variant="white" />
                    </Stack>
                  </Badge>
                ))}
              </Stack>
            </Form.Group>
          </Form>
        </ProfileSection>
      </Stack>
    </Container>
  );
}
