import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../../features/users/types/user.types";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
  isArchived: boolean;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onHide: (id: number) => void;
}

export function UserCard({
  user,
  isArchived,
  onArchive,
  onUnarchive,
  onHide,
}: UserCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <article className={`${styles.card} ${isArchived ? styles.archived : ""}`}>
      <img className={styles.avatar} src={user.avatar} alt={user.username} />

      <div className={styles.content}>
        <div className={styles.top}>
          <h3 className={styles.username}>{user.username}</h3>
          <p className={styles.company}>{user.companyName}</p>
        </div>

        <p className={styles.city}>{user.city}</p>
      </div>

      <div className={styles.menuWrapper} ref={menuRef}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Открыть меню карточки"
        >
          ⋮
        </button>

        {isMenuOpen && (
          <div className={styles.dropdown}>
            {!isArchived && (
              <Link
                className={styles.link}
                to={`/users/${user.id}/edit`}
                onClick={() => setIsMenuOpen(false)}
              >
                Редактировать
              </Link>
            )}

            {isArchived ? (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  onUnarchive(user.id);
                  setIsMenuOpen(false);
                }}
              >
                Активировать
              </button>
            ) : (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  onArchive(user.id);
                  setIsMenuOpen(false);
                }}
              >
                Архивировать
              </button>
            )}

            {!isArchived && (
              <button
                type="button"
                className={styles.button}
                onClick={() => {
                  onHide(user.id);
                  setIsMenuOpen(false);
                }}
              >
                Скрыть
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
