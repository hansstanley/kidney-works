import React, { useState } from 'react';
import {
  Badge,
  Button,
  CloseButton,
  Container,
  Form,
  Image,
  InputGroup,
  ProgressBar,
  Stack,
} from 'react-bootstrap';
import PageHero from '../../components/PageHero';
import { useAuth } from '../../hooks/useAuth';
import ProfileSection from './ProfileSection';
import { arrayRemove, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../utils/firebase';
import UseSkills from '../../hooks/useSkills';
import UseLimitations from '../../hooks/useLimitations';
import useUserInfo from '../../hooks/useUserInfo';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../Page.css";


export default function ProfilePage() {
  const { user } = useAuth();
  const { skills, setSkillsState } = UseSkills();
  const { limitations, setLimitationState } = UseLimitations();
  const { name, email, setName, setEmail, avatar, eduLevel, setEduLevel } = useUserInfo();
  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);
  const [inputSkill, setInputSkill] = useState("");
  const [inputLimitation, setInputLimitation] = useState("");
  const [progress, setProgress] = useState(0);

  function updateUserInfo(name: String, email: String) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      name: name,
      email: email,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setName(doc.data().name);
        setEmail(doc.data().email)
      }
    })
  }

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

  function updateEduLevel(eduLevel: String) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      eduLevel: eduLevel,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setEduLevel(doc.data()?.eduLevel);
      }
    })
  }

  const uploadFiles = (file: File) => {
    if (!file) return;
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, `/image/${user?.uid}`);
    const spaceRef = ref(imageRef, file.name);
    const uploadTask = uploadBytesResumable(spaceRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateDoc(doc(db, "users", user?.uid || ''), {
            avatar: url,
          });
        });
      }
    );
  };

  const openFile = () => {
    document.getElementById("fileID")?.click();
    setProgress(0);
  };

  const avatarHandler = (e: React.ChangeEvent<HTMLInputElement>)  => {
    e.preventDefault();
    if (e.target.files) {
        uploadFiles(e.target.files[0]);
    }
  }

  return (
    <Container className="pb-5 background">
      <PageHero title="Profile" />
      <Stack gap={4}>
        <ProfileSection>
            <input id="fileID" type="file" accept="image/*" hidden onChange={avatarHandler}/>
          <Image
            roundedCircle
            className="hover-shadow m-2"
            src={avatar}
            style={{ width: 100, height: 100 }}
          />
          <Button variant="secondary" onClick={() => openFile()}>Change</Button>
          <ProgressBar now={progress} />
        </ProfileSection>
        <ProfileSection title="Account">
          <Form>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                defaultValue={name}
                onChange={(e) => setInputName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="E.g. johndoe@abc.com"
                defaultValue={email}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </Form.Group>
            <hr />
            <Button type="submit" href="#" onClick={() => updateUserInfo(inputName, inputEmail)}>
              Update
            </Button>
          </Form>
        </ProfileSection>
        <ProfileSection title="Education">
          <Form>
            <Form.Group className="mb-3" controlId="education">
              <Form.Label>Education level</Form.Label>
              <Form.Select onChange={e => setEduLevel(e.target.value)} value={eduLevel}>
                <option value="0">No Education</option>
                <option value="1">Primary Education</option>
                <option value="2">Normal-level (N-level)</option>
                <option value="3">GCE 'O' Level</option>
                <option value="4">GEC 'A' Level</option>
                <option value="5">National ITE Certificate (Nitec)</option>
                <option value="6">Higher National ITE Certificate (Higher Nitec)</option>
                <option value="7">Diploma</option>
                <option value="8">Bachelor's Degree</option>
                <option value="9">Master's Degree</option>
                <option value="10">PhD</option>
              </Form.Select>
            </Form.Group>
            <hr />
            <Button type="submit" href="#" onClick={() => updateEduLevel(eduLevel)}>
              Update
            </Button>
          </Form>
        </ProfileSection>
        <ProfileSection title="Skills and limitations">
          <Form>
            <Form.Group className="mb-3" controlId="skills">
              <Form.Label>Skills</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="E.g. public speaking" onChange={e => setInputSkill(e.target.value)}/>
                <Button variant="outline-secondary" onClick={addSkillHandler} >Add</Button>
              </InputGroup>
              <Stack direction="horizontal" gap={1} className="mt-2">
                {skills.map((s, i) => (
                  <Badge key={i} bg="secondary">
                    <Stack direction="horizontal" gap={2}>
                      {s}
                      <CloseButton variant="white" onClick={() => deleteSkill(s)} />
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
                  onChange={e => setInputLimitation(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={addLimitationHandler}>Add</Button>
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
