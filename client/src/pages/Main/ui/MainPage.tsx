import { type JSX } from "react";
import "../style/index.module.css";

export function MainPage(): JSX.Element {
  return (
    <div className="container">
      <h1 className="title">Своя Игра</h1>
      <p className="description">
        Добро пожаловать в игру с настоящей 8-битной атмосферой! Проверьте свои
        знания и способности в увлекательной викторине.
      </p>
      <button className="startButton" onClick={() => alert("Начинаем игру!")}>
        Начать Игру
      </button>
    </div>
  );
}
