import { Button, Modal } from "react-bootstrap";

export interface JobAppsCfmModalProps {
    show?: boolean;
    onHide?: () => void;
    addApplication?: () => void;
  }

export default function JobsAppsCfmModal({
    show, onHide, addApplication}: JobAppsCfmModalProps) {
    return (
        <Modal
      centered
      size="sm"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to submit your application?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={addApplication}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
    )
}