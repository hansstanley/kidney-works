import React, { useEffect, useState } from 'react';
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
import ProfileSection from '../ProfilePage/ProfileSection';
import { arrayRemove, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../utils/firebase';
import UseSkills from '../../hooks/useSkills';
import UseLimitations from '../../hooks/useLimitations';
import useUserInfo from '../../hooks/useUserInfo';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../Page.css";
import { useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';


export default function ProfileCreationPage() {
  const { user, signOutOfSession } = useAuth();
  const { skills, setSkillsState } = UseSkills();
  const { limitations, setLimitationState } = UseLimitations();
  const { name, email, setName, setEmail, avatar, eduLevel, setEduLevel, created, setCreated, setCompanyName, setCompanyDescription, setIsEmployer } = useUserInfo();
  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);
  const [inputSkill, setInputSkill] = useState("");
  const [inputLimitation, setInputLimitation] = useState("");
  const [progress, setProgress] = useState(0);

  const [inputIsEmployer, setInputIsEmployer] = useState(false);
  const [inputCompanyName, setInputCompanyName] = useState("");
  const [inputCompanyDescription, setInputCompanyDescription] = useState("");

  const navigate = useNavigate();

  // eslint-disable-next-line no-restricted-globals
  addEventListener('beforeunload', (event) => { });
  onbeforeunload = (event) => { if (!created) signOutOfSession() };


  useEffect(() =>{
    if (created) {
        navigate(NAV_LINKS.HOME);
    }
  }, [created, navigate]);

  function updateUserInfo(name: String, email: String) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      name: name,
      email: email,
    });
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setName(doc.data().name);
        setEmail(doc.data().email)
      }
    });
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

  function updateCompanyName(companyName: String) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      companyName: companyName,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setCompanyName(doc.data()?.companyName);
      }
    })
  }

  function updateCompanyDescription(companyDescription: String) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      companyDescription: companyDescription,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setCompanyDescription(doc.data()?.companyDescription);
      }
    })
  }

  function updateIsEmployer (isEmployer: boolean) {
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      isEmployer: inputIsEmployer,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setIsEmployer(doc.data()?.isEmployer);
      }
    })
  }

  function updateCreated () {
    setCreated(true);
    const userSnap = doc(db, "users", user?.uid || '')
    updateDoc(userSnap, {
      created: true,
    })
    onSnapshot(userSnap, (doc) => {
      if (doc.exists()) {
        setCreated(doc.data()?.created);
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

  async function updateAll(name: String, email: String, eduLevel: String) {
    
    if (inputIsEmployer) {
        updateCompanyName(inputCompanyName);
        updateCompanyDescription(inputCompanyDescription);
        
        const userSnap = doc(db, "stakeholders", "employers", "users", user?.uid || '');
        await setDoc(userSnap, {
            uid: user?.uid,
        })

    } else {
        updateUserInfo(inputName, inputEmail);
        updateEduLevel(eduLevel);
        const userSnap = doc(db, "stakeholders", "employees", "users", user?.uid || '');
        await setDoc(userSnap, {
            uid: user?.uid,
        })
    }
    updateCreated();
    updateIsEmployer(inputIsEmployer);
    navigate(NAV_LINKS.HOME);
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
                disabled={true}
              />
            </Form.Group>
            <hr />
          </Form>
        </ProfileSection>

        <ProfileSection title="Role">
            <Form>
                <Form.Group className="mb-3" controlId="education">
                <Form.Label>Employer or Looking for Hire</Form.Label>
                <Form.Select onChange={e => {e.target.value === "0" ? setInputIsEmployer(true): setInputIsEmployer(false)}} value={eduLevel} defaultValue={1}>
                    <option value="1">Looking for Hire</option>
                    <option value="0">Employer</option>
                </Form.Select>
                </Form.Group>
            </Form>
        </ProfileSection>

        {inputIsEmployer ? (
        <ProfileSection title="Company Name">
            <Form>
                <Form.Group className="mb-3" controlId="companyname">
                    <Form.Control
                    type="text"
                    placeholder="Your company's name"
                    onChange={(e) => setInputCompanyName(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </ProfileSection>)
        : (
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
          </Form>
        </ProfileSection>
        )}
        {inputIsEmployer ? (
        <ProfileSection title="Company Description">
            <Form>
                <Form.Group className="mb-3" controlId="companydescription">
                    <Form.Label>A description of your company's dealings</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="A description of your company's dealings"
                    onChange={(e) => setInputCompanyDescription(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </ProfileSection> 
        ) : (
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
        )}
        <Button onClick={() => updateAll(inputName, inputEmail, eduLevel)}>
            Create
        </Button>
      </Stack>
    </Container>
  );
}
