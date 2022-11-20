import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ChevronUp } from "~/assets/icons/chevron-up.svg";
import { ReactComponent as Cog8Tooth } from "~/assets/icons/cog-8-tooth.svg";
import userSVG from "~/assets/icons/user.svg";
import { SignOutUser } from "~/services/UserServices";
import styles from "~/utils/styles/user-options.module.scss";

export default function UserOpcions() {
  const { USER_DATA, SESSION } = useSelector((e) => e.user);
  const navigate = useNavigate();
  const [classDropdown, setClassDropdown] = useState(styles.dropdown);
  const { pathname } = useLocation();

  const BUTTON_SVG = classDropdown === styles.dropdown ? <Cog8Tooth /> : <ChevronUp />;

  const ChangeClass = () => {
    setClassDropdown(classDropdown === styles.dropdown ? `${styles.dropdown} ${styles.active}` : styles.dropdown);
  };

  useEffect(() => {
    document.addEventListener("click", (evt) => {
      evt.stopPropagation();

      const dropdownClicked = evt.composedPath().some(
        (elm) => elm.className === styles.dropdown
          || elm.className === `${styles.dropdown} ${styles.active}`
          || elm.className === styles.dropdown_button,
      );

      if (!dropdownClicked) {
        setClassDropdown(styles.dropdown);
      }
    });
  }, []);

  return (
    <section className={styles.user_options}>
      {SESSION
        ? (
          <>
            <article className={styles.user_info}>
              <img
                src={USER_DATA?.avatar}
                alt="Foto de perfil"
                onError={(evt) => {
                  const { target } = evt;
                  target.src = userSVG;
                }}
              />

              <span>{USER_DATA?.nickname}</span>
            </article>

            <article className={styles.dropdown_options}>
              <button className={styles.dropdown_button} onClick={ChangeClass}>{BUTTON_SVG}</button>

              <div className={classDropdown}>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate("settings"); }}>Ajustes</a>
                {pathname.includes("favorites")
                  ? null
                  : <a href="/" onClick={(e) => { e.preventDefault(); navigate("favorites"); }}>Favoritos</a>}
                <a href="/" onClick={(e) => { e.preventDefault(); SignOutUser(); }}>Cerrar sesión</a>
              </div>
            </article>
          </>
        )
        : (
          <>
            <button
              className={styles.log_in_button}
              onClick={() => { navigate("login"); }}
            >
              Iniciar sesión
            </button>

            <button
              className={styles.sign_up_button}
              onClick={() => { navigate("registration"); }}
            >
              Registrarme
            </button>
          </>
        )}
    </section>
  );
}
