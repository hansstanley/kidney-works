import { useEffect, useState } from 'react';
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
import { useAuth } from '../../hooks/useAuth';
import ProfileSection from './ProfileSection';

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [skills, setSkills] = useState(['Writing', 'Speaking', 'Teamwork']);
  const [limitations, setLimitations] = useState([
    'Low blood pressure',
    'Medication',
    'Wheelchair',
  ]);

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const [skill, setSkill] = useState('');
  const handleAddSkill = () => {
    if (!skill.trim()) {
      return;
    }

    const newSkills = [skill.trim(), ...skills];
    setSkills(newSkills);
    setSkill('');
  };

  const handleDeleteSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const [limitation, setLimitation] = useState('');
  const handleAddLimitation = () => {
    if (!limitation.trim()) {
      return;
    }

    const newLimitations = [limitation.trim(), ...limitations];
    setLimitations(newLimitations);
    setLimitation('');
  };

  const handleDeleteLimitation = (index: number) => {
    const newLimitations = limitations.filter((_, i) => i !== index);
    setLimitations(newLimitations);
  };

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
        <ProfileSection title="Account">
          <Form>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="E.g. johndoe@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <hr />
            <Button type="submit" href="#">
              Update
            </Button>
          </Form>
        </ProfileSection>
        <ProfileSection title="Education">
          <Form>
            <Form.Group className="mb-3" controlId="education">
              <Form.Label>Education level</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g. High School Diploma"
              />
            </Form.Group>
            <hr />
            <Button type="submit" href="#">
              Update
            </Button>
          </Form>
        </ProfileSection>
        <ProfileSection title="Skills and limitations">
          <Form>
            <Form.Group className="mb-3" controlId="skills">
              <Form.Label>Skills</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="E.g. public speaking"
                  value={skill}
                  onChange={(event) => {
                    setSkill(event.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  disabled={!skill.trim()}
                  onClick={handleAddSkill}>
                  Add
                </Button>
              </InputGroup>
              <Stack direction="horizontal" gap={1} className="mt-2">
                {skills.map((s, i) => (
                  <Badge key={i} bg="secondary">
                    <Stack direction="horizontal" gap={2}>
                      {s}
                      <CloseButton
                        variant="white"
                        onClick={() => handleDeleteSkill(i)}
                      />
                    </Stack>
                  </Badge>
                ))}
              </Stack>
            </Form.Group>
            <Form.Group className="mb-3" controlId="physicalLimitations">
              <Form.Label>Physical limitations</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="E.g. low blood pressure"
                  value={limitation}
                  onChange={(event) => {
                    setLimitation(event.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  disabled={!limitation.trim()}
                  onClick={handleAddLimitation}>
                  Add
                </Button>
              </InputGroup>
              <Stack direction="horizontal" gap={1} className="mt-2">
                {limitations.map((l, i) => (
                  <Badge key={i} bg="secondary">
                    <Stack direction="horizontal" gap={2}>
                      {l}
                      <CloseButton
                        variant="white"
                        onClick={() => handleDeleteLimitation(i)}
                      />
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
