import { LoginPage, RegisterPage } from "@/features";
import { type JSX } from "react";
import s from "../style/style.module.css";

export function Auth({ isAuthProp }: { isAuthProp: string }): JSX.Element {
  return (
    <div className={s.container}>
      <div className={s.authCard}>
        {isAuthProp === "register" ? <RegisterPage /> : <LoginPage />}
      </div>
    </div>
  );
}
