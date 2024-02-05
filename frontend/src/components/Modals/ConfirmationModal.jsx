function ConfirmationModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="confirm_cancel_button">
          <button aria-label="confirm" onClick={onConfirm}>
            I am sure!
          </button>
          <button aria-label="cancel" onClick={onCancel}>
            Let me think!
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
