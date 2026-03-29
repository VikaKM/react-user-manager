import successIcon from "../../../assets/success-check.svg";
import styles from "./EditSuccessModal.module.scss";

interface EditSuccessModalProps {
  onClose: () => void;
}

export function EditSuccessModal({ onClose }: EditSuccessModalProps) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>

        <div className={styles.content}>
          <img src={successIcon} alt="" className={styles.icon} />
          <p className={styles.text}>Изменения сохранены!</p>
        </div>
      </div>
    </>
  );
}