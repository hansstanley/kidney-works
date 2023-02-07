import { useMemo } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import AppJob from '../../types/job.app';

export interface JobFormModalProps {
  job?: AppJob;
  show?: boolean;
  onHide?: () => void;
}

export default function JobFormModal({ job, show, onHide }: JobFormModalProps) {
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
              type="text"
              placeholder="E.g. Software engineer"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job description</Form.Label>
            <Form.Control
              placeholder="Describe the nature of this job"
              as="textarea"
              rows={4}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job requirements</Form.Label>
            <Form.Control
              placeholder="Describe the general requirements for anyone to accomplish this job"
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Special requirements</Form.Label>
            <Form.Control
              placeholder="Describe any other special requirements, e.g. physically strenuous"
              as="textarea"
              rows={2}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button>{isEdit ? 'Edit' : 'Create'}</Button>
      </Modal.Footer>
    </Modal>
  );
}
