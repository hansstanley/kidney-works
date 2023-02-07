import { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import UseJobs from '../../hooks/useJobs';
import AppJob from '../../types/job.app';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../utils/firebase";

export interface JobFormModalProps {
  job?: AppJob;
  show?: boolean;
  onHide?: () => void;
  jobs?: AppJob[];
  setJobsState?: React.Dispatch<React.SetStateAction<AppJob[]>>;
}

export default function JobFormModal({ job, show, onHide, jobs, setJobsState }: JobFormModalProps) {
  const [newCompany, setCompany] = useState(job?.company || '');
  const [newTitle, setTitle] = useState(job?.title || '');
  const [newDescription, setDescription] = useState(job?.description || '');
  const [newRequirements, setRequirements] = useState(job?.requirements || '');

  const isEdit = useMemo(() => !!job, [job]);
  const [inputjob, setInputJob] = useState<AppJob>()

  function addJob(job: AppJob) {
    console.log(job)
    console.log(setJobsState)
    if (jobs && setJobsState) {
      const newJobs = [
        ...jobs, job
      ];
      const colRef = collection(db, "jobs")
      addDoc(colRef, {
        title: newTitle,
        company: newCompany,
        description: newDescription,
        requirements: newRequirements,
      })

      setJobsState(newJobs);
      console.log(jobs)
    }
  }

  function makeJob() {
    const newJob: AppJob = {
      id:0,
      title: newTitle,
      company: newCompany,
      description: newDescription,
      requirements: newRequirements,
    }
    setInputJob(newJob);
    addJob(newJob);
  }

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Edit this job' : 'Create a new job'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Company title</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g. Google"
              autoFocus
              value={newCompany}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="E.g. Software engineer"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job description</Form.Label>
            <Form.Control
              placeholder="Describe the nature of this job"
              as="textarea"
              rows={4}
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job requirements</Form.Label>
            <Form.Control
              placeholder="Describe the general requirements for anyone to accomplish this job"
              as="textarea"
              rows={2}
              value={newRequirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button onClick={makeJob}>{isEdit ? 'Edit' : 'Create'}</Button>
      </Modal.Footer>
    </Modal>
  );
}
