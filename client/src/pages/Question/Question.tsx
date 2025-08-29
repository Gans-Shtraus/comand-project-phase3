import { useEffect, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { getQuestionsByThemeIdThunk } from "@/entities/Theme/redux/thunk";
import { useParams } from "react-router";
import type { Question } from "@/entities/Theme/model";
import s from "./styles/index.module.css";

export function Question(): JSX.Element {
  const { themeId } = useParams<{ themeId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.themeSlice
  );
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (themeId) {
      dispatch(getQuestionsByThemeIdThunk(themeId));
      setFlippedCards({});
    }
  }, [dispatch, themeId]);

  const toggleFlip = (id: number): void => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) return <div className={s.status}>Загрузка вопросов...</div>;
  if (error) return <div className={s.status}>Ошибка: {error}</div>;

  return (
    <div>
      <h3 className={s.heading}>Вопросы для темы {themeId}</h3>
      {questions.length === 0 && <p>Вопросы отсутствуют.</p>}
      <div className={s.grid}>
        {questions.map((q: Question) => (
          <div
            key={q.id}
            className={`${s.card} ${flippedCards[q.id] ? s.flipped : ""}`}
            onClick={() => toggleFlip(q.id)}
          >
            <div className={s.cardInner}>
              <div className={s.cardFront}>
                <p>{q.questionText}</p>
              </div>
              <div className={s.cardBack}>
                <button type="button">{q.correctAnswer}</button>
                <button type="button">Ответ 2</button>
                <button type="button">Ответ 3</button>
                <button type="button">Ответ 4</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
