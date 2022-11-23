import { useState } from "react";
import { useLocation } from "wouter";
import { ReactComponent as EyeSlash } from "~/assets/icons/eye-slash.svg";
import { ReactComponent as Eye } from "~/assets/icons/eye.svg";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import UserC from "~/superstate/User";
import styles from "~/utils/styles/reset-password.module.scss";

const { SESSION } = UserC.state.now();
const { preResetPasswordUser, updateUser } = UserC;

export default function ResetPassword() {
  const [showPass, setShowPass] = useState(false);
  const [, navigate] = useLocation();
  const [values, setValues] = useState({ navigate });

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    if (SESSION) {
      updateUser(values);
    }

    if (!SESSION) {
      preResetPasswordUser(values);
    }
  };

  return (
    <main className={styles.reset_password}>
      {SESSION ? null : <GoBackButton className={styles.go_back_button} />}

      <form
        onSubmit={(e) => HandleOnSubmit(e)}
        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
        className={SESSION ? styles.form : null}
      >
        {SESSION
          ? (
            <label htmlFor="password" className={styles.new_password}>
              <span>Nueva contraseña</span>
              <br />
              <div>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="true"
                />

                <button onClick={(e) => { e.preventDefault(); setShowPass(!showPass); }}>
                  {!showPass ? <Eye /> : <EyeSlash />}
                </button>
              </div>
            </label>
          )
          : (
            <label htmlFor="email" className={styles.email_registered}>
              <span>Escribe el correo registrado</span>
              <br />
              <input type="email" name="email" autoComplete="true" />
            </label>
          )}

        <button type="submit">Cambiar contraseña</button>
      </form>
    </main>
  );
}
