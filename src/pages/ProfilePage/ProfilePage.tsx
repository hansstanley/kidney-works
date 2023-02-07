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
import { arrayRemove, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import UseSkills from '../../hooks/useSkills';
import UseLimitations from '../../hooks/useLimitations';


export default function ProfilePage() {
  const { user } = useAuth();
  const { skills, setSkillsState } = UseSkills();
  const { limitations, setLimitationState } = UseLimitations();
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [inputSkill, setInputSkill] = useState("");
  const [inputLimitation, setInputLimitation] = useState("");

  function addSkillHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      addSkill(inputSkill);
  }

  function setSkills(newSkills: String[]) {
    setSkillsState(newSkills);
      setDoc(doc(db, "skills", user?.uid || ''), {skills: newSkills });
  }

  function addSkill(skill: String) {
    const newSkills = [
      ...skills, skill
    ];
    setSkills(newSkills);
  }

  function deleteSkill(skill: String) {
    const skillsSnap = doc(db, "skills", user?.uid || '')
    updateDoc(skillsSnap, {
       skills:  arrayRemove(skill),
    });
    onSnapshot(skillsSnap, (doc) => {
      if (doc.exists()) {
        setSkillsState(doc.data().skills);
      } else {
        setSkillsState([]);
      }
    })
  }


  function addLimitationHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    addLimitation(inputLimitation);
  }

  function setLimitations(newLimitations: String[]) {
    setLimitationState(newLimitations);
    setDoc(doc(db, "limitations", user?.uid || ''), {limitations: newLimitations});
  }

  function addLimitation(limitation: String) {
    const newLimitations = [
      ...limitations, limitation
    ];
    setLimitations(newLimitations);
  }
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

  function deleteLimitation(limitation: String) {
    const limitationSnap = doc(db, "limitations", user?.uid || '')
    updateDoc(limitationSnap, {
        limitations: arrayRemove(limitation),
    });
    onSnapshot(limitationSnap, (doc) => {
      if (doc.exists()) {
        setLimitationState(doc.data().limitations);
      } else {
        setLimitationState([]);
      }
    })
  }

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
                      <CloseButton variant="white"  onClick={() => deleteLimitation(l)}/>
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
