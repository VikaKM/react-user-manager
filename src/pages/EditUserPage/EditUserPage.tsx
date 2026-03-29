import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Header } from "../../app/components/Header/Header";
import { Loader } from "../../app/components/Loader/Loader";
import { getUserById } from "../../app/features/users/api/usersApi";
import {
  useEditUserForm,
  type FormValues,
} from "../../app/features/users/hooks/useEditUserForm";
import { mapUser } from "../../app/features/users/lib/mapUser";
import { useUsersStore } from "../../app/store/usersStore";
import { EditSuccessModal } from "../../app/components/EditSuccessModal/EditSuccessModal";
import styles from "./EditUserPage.module.scss";

export function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { editedUsers, archivedUserIds, saveEditedUser } = useUsersStore();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id!),
    enabled: Boolean(id),
  });

  const mappedUser = useMemo(() => {
    return data ? mapUser(data) : null;
  }, [data]);

  const user = useMemo(() => {
    return mappedUser ? editedUsers[mappedUser.id] ?? mappedUser : null;
  }, [mappedUser, editedUsers]);

  const isArchived = user ? archivedUserIds.includes(user.id) : false;

  const {
    register,
    handleSubmit,
    handlePhoneChange,
    formState: { errors, isSubmitting },
  } = useEditUserForm(user);

  const phoneField = register("phone");

  useEffect(() => {
    if (!isSuccessOpen) return;

    const timer = setTimeout(() => {
      setIsSuccessOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [isSuccessOpen]);

  const onSubmit = (values: FormValues) => {
    if (!user || isArchived) return;

    saveEditedUser({
      ...user,
      ...values,
    });

    setIsSuccessOpen(true);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <p>
            Ошибка загрузки:{" "}
            {error instanceof Error ? error.message : "Неизвестная ошибка"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <p>Пользователь не найден</p>
        </div>
      </div>
    );
  }

  if (isArchived) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <button
            type="button"
            className={styles.back}
            onClick={() => navigate("/")}
          >
            ← Назад
          </button>

          <p>Нельзя редактировать архивного пользователя</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <button
          type="button"
          className={styles.back}
          onClick={() => navigate("/")}
        >
          ← Назад
        </button>

        <div className={styles.grid}>
          <aside className={styles.sidebar}>
            <img
              src={user.avatar}
              alt={user.username}
              className={styles.avatar}
            />

            <div className={styles.menu}>
              <div className={`${styles.menuItem} ${styles.menuItemActive}`}>
                Данные профиля
              </div>
              <div className={styles.menuItem}>Рабочее пространство</div>
              <div className={styles.menuItem}>Приватность</div>
              <div className={styles.menuItem}>Безопасность</div>
            </div>
          </aside>

          <section className={styles.content}>
            <h2 className={styles.title}>Данные профиля</h2>
            <div className={styles.divider} />

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Имя
                </label>
                <input
                  id="name"
                  className={styles.input}
                  {...register("name")}
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Никнейм
                </label>
                <input
                  id="username"
                  className={styles.input}
                  {...register("username")}
                />
                {errors.username && (
                  <p className={styles.error}>{errors.username.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Почта
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  {...register("email")}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="city">
                  Город
                </label>
                <input
                  id="city"
                  className={styles.input}
                  {...register("city")}
                />
                {errors.city && (
                  <p className={styles.error}>{errors.city.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Телефон
                </label>
                <input
                  id="phone"
                  className={styles.input}
                  {...phoneField}
                  onChange={(event) => {
                    handlePhoneChange(event.target.value, user.phone);
                  }}
                />
                {errors.phone && (
                  <p className={styles.error}>{errors.phone.message}</p>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="companyName">
                  Название компании
                </label>
                <input
                  id="companyName"
                  className={styles.input}
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className={styles.error}>{errors.companyName.message}</p>
                )}
              </div>

              <button
                type="submit"
                className={styles.saveButton}
                disabled={isSubmitting}
              >
                Сохранить
              </button>
            </form>
          </section>
        </div>
      </main>

      {isSuccessOpen && (
        <EditSuccessModal onClose={() => setIsSuccessOpen(false)} />
      )}
    </div>
  );
}