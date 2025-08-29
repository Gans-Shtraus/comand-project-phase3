import { useEffect, useState, type JSX } from "react";
import { UserApi } from "@/entities/User/api/UserApi";
import type { IUser } from "@/entities/User/model";
import s from "../style/index.module.css";
export default function ResultTable(): JSX.Element {
  const [userScore, setUserScore] = useState<IUser[]>([]);

  const getAllUsers = async (): Promise<void> => {
    const { data } = await UserApi.getAll();
    const res = data.sort((a, b) => b.points - a.points);
    setUserScore(res);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <table className={s.resultTable}>
      <thead>
        <tr>
          <th>Позиция</th>
          <th>Пользователь</th>
          <th>Очки</th>
        </tr>
      </thead>
      <tbody>
        {userScore.map((u, index) => (
          <tr key={u.id} className={index % 2 === 0 ? s.evenRow : s.oddRow}>
            <td>{index + 1}</td>
            <td>{u.username}</td>
            <td>{u.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
