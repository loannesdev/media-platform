import { useLocation } from "wouter";
import styles from "~/utils/styles/go-back-button.module.scss";

export default function GoBackButton({ onClick, children, className }) {
  const [, navigate] = useLocation();
  const customOnClick = onClick ?? (() => { history.back(); });
  const customText = children ?? "Volver";

  return history.length > 1
    ? <button className={`${styles.go_back_button} ${className ?? ""}`.trim()} onClick={customOnClick}>{customText}</button>
    : <button className={`${styles.go_back_button} ${className ?? ""}`.trim()} onClick={() => navigate("/")}>Volver al inicio</button>;
}
