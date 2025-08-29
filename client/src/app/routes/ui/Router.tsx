import { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/app/layout/ui/Layout";
import { Auth, MainPage, TaskPage, Theme } from "@/pages";

export default function Router(): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/register" element={<Auth isAuthProp="register" />} />
            <Route path="/login" element={<Auth isAuthProp="login" />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/theme" element={<Theme />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
