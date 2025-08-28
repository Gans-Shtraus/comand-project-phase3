import { useEffect, type JSX } from "react";
import { Outlet } from "react-router";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { refreshUserThunk } from "@/entities/User/redux/thunk";
import { NavBar } from "@/widgets";

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
