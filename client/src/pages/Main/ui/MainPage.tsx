import { type JSX } from "react";
import "../style/index.module.css";
import { useNavigate } from "react-router";

export function MainPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="title">Своя Игра</h1>
      <p className="description">
        Добро пожаловать в игру с настоящей 8-битной атмосферой! Проверьте свои
        знания и способности в увлекательной викторине.
      </p>
      <button
        className="startButton"
        onClick={() => {
          alert("ДА НАЧНЕТСЯ БИТВА");
          navigate("/theme");
        }}
      >
        Начать Игру
      </button>
    </div>
  );
}
