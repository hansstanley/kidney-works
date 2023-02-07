import { useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import AppJob from '../../types/job.app';

export interface JobFormModalProps {
  job?: AppJob;
  show?: boolean;
  onHide?: () => void;
}

export default function JobFormModal({ job, show, onHide }: JobFormModalProps) {
  const [title, setTitle] = useState(job?.title || '');
  const [description, setDescription] = useState(job?.description || '');
  const [requirements, setRequirements] = useState(job?.requirements || '');

  const isEdit = useMemo(() => !!job, [job]);

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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job title</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="E.g. Software engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job description</Form.Label>
            <Form.Control
              placeholder="Describe the nature of this job"
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job requirements</Form.Label>
            <Form.Control
              placeholder="Describe the general requirements for anyone to accomplish this job"
              as="textarea"
              rows={2}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button>{isEdit ? 'Edit' : 'Create'}</Button>
      </Modal.Footer>
    </Modal>
  );
}
