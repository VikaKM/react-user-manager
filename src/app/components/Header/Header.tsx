import { Link } from "react-router-dom";
import avatarPlaceholder from "../../../assets/avatar-placeholder.png";
import favoriteIcon from "../../../assets/Favorite.svg";
import logoSign from "../../../assets/logo-sign.svg";
import notificationIcon from "../../../assets/Notification.svg";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="At-work home">
          <img src={logoSign} alt="" className={styles.logoImage} />
          <span className={styles.logoText}>
            <span className={styles.logoTextLight}>at-</span>
            <span className={styles.logoTextBold}>work</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Favorites"
            title="Избранное"
          >
            <img src={favoriteIcon} alt="" className={styles.icon} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Notifications"
            title="Уведомления"
          >
            <img src={notificationIcon} alt="" className={styles.icon} />
          </button>
        </div>

        <div className={styles.profile}>
          <img
            src={avatarPlaceholder}
            alt="User avatar"
            className={styles.avatar}
          />
          <span className={styles.username}>Ivan1234</span>
        </div>
      </div>
    </header>
  );
}