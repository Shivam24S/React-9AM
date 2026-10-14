import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  isLoading = false,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-secondary mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Processing..." : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
