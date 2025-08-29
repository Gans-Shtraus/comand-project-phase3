import { useEffect, useState, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { getQuestionsByThemeIdThunk } from "@/entities/Theme/redux/thunk";
import { useParams } from "react-router";
import type { Question } from "@/entities/Theme/model";
import s from "./styles/index.module.css";
import { UserApi } from "@/entities/User/api/UserApi";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

// Функция перемешивания массива
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function Question(): JSX.Element {
  const { user } = useAppSelector((store) => store.userReducer);

  const { themeId } = useParams<{ themeId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.themeSlice
  );
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [shuffledAnswers, setShuffledAnswers] = useState<
    Record<number, string[]>
  >({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (themeId) {
      dispatch(getQuestionsByThemeIdThunk(themeId));
      setFlippedCards({});
      setScore(0); // сбрасываем очки при смене темы
    }
  }, [dispatch, themeId]);

  useEffect(() => {
    const shuffledMap: Record<number, string[]> = {};
    questions.forEach((q) => {
      if (Array.isArray(q.answerOptions)) {
        shuffledMap[q.id] = shuffleArray(q.answerOptions);
      }
    });
    setShuffledAnswers(shuffledMap);
  }, [questions]);

  useEffect(() => {
    if (user) {
      setScore(user?.points);
    }
  }, [user]);
  const toggleFlip = (id: number): void => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleCheckAnswer = async (
    questionId: number,
    selectedAnswer: string
  ): void => {
    const question = questions.find((q) => q.id === questionId);
    if (question && selectedAnswer === question.correctAnswer) {
      setScore((prev) => prev + question.points);
      alert("Правильно! Очко добавлено.");
      toggleFlip(questionId);
      localStorage.setItem("score", String(score + question.points));
      const data = await UserApi.addPoints(Number(user?.id), question.points);
      console.log(data);
    } else {
      alert("Неправильно. Попробуйте ещё.");
    }
  };

  if (loading) return <div className={s.status}>Загрузка вопросов...</div>;
  if (error) return <div className={s.status}>Ошибка: {error}</div>;

  return (
    <div>
      <h3 className={s.heading}>Вопросы для темы {themeId}</h3>
      <p>Текущий счёт: {score}</p>
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
                <p style={{ fontSize: "40px" }}>{q.points}</p>
              </div>
              <div className={s.cardBack}>
                <p>{q.questionText}</p>
                {shuffledAnswers[q.id]?.map((answer, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // чтобы клик по кнопке не переворачивал карточку
                      handleCheckAnswer(q.id, answer);
                    }}
                  >
                    {answer}
                  </button>
                )) ?? <p>Ответы отсутствуют</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
