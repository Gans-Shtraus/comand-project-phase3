// Router.tsx
import { type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "@/app/layout/ui/Layout";
import { Auth, MainPage, Question, TaskPage, Theme } from "@/pages";
import ResultTable from "@/pages/ResultTable/ui/ResultTable";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/register" element={<Auth isAuthProp="register" />} />
          <Route path="/login" element={<Auth isAuthProp="login" />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/question/:themeId" element={<Question />} />
          <Route path="/tableresult" element={<ResultTable />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
