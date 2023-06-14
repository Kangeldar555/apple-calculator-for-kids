import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './WarningModal.scss';

type Props = {
  show: boolean,
  onHide: () => void,
  content: [string, string] // [title, message]
}

function WarningModal({ show, onHide, content }: Props) {

  const [title, message] = content;

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="dark-mode"
    >
      <Modal.Header
        closeButton
        closeVariant='white'
      >
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button autoFocus variant='outline-light' onClick={onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarningModal;