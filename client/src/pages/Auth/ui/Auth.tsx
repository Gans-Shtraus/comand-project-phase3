import { LoginPage, RegisterPage } from "@/features";
import { type JSX } from "react";

export function Auth({ isAuthProp }: { isAuthProp: string }): JSX.Element {
  return (
    <div>{isAuthProp === "register" ? <RegisterPage /> : <LoginPage />}</div>
  );
}
