import { Button, Form, Modal } from "react-bootstrap";
import AppResume from "../../types/resume.app";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../utils/firebase";
import { User } from "firebase/auth";

export interface JobAppsFormModalProps {
    show?: boolean;
    onHide?: () => void;
    resume?: AppResume[],
    user?: User | null,
    job?: string
  }

export default function JobAppsFormModal({
    show, onHide, resume, user, job}: JobAppsFormModalProps) {
      const [resumeLink, setResumeLink] = useState("");
      const [addNote, setAddNote] = useState("");
    
      function addApplication() {
        console.log("sent")
        const collectionRef = collection(db, "job_applications");
        addDoc(collectionRef, {
          resume: resumeLink,
          jobId: job,
          status: "applied",
          userId: user?.uid,
          addNote: addNote
        }).then(onHide).then(() => window.location.reload())
      }

      return (
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply this job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form validated>
            <Form.Group className="mb-3" controlId="resumeSelect">
              <Form.Label>Resume</Form.Label>
              <Form.Select onChange={e => setResumeLink(e.target.value)} required>
                <option></option>
                {resume?.map((i) => (
                  <option value={i.link}>{i.desc}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="addtionalNote"
            >
              <Form.Label>Additonal note to company</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={e => setAddNote(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={addApplication}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      );
};