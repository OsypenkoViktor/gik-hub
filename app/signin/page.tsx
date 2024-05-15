"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegistrationForm() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Вызываем функцию signIn, передавая значения полей формы
    const response = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true, // Отключаем автоматическое перенаправление
    });
    if (response.ok) {
      redirect("/");
    } else {
      // Очищаем значения полей после отправки формы
      setUsername("");
      setPassword("");
    }
  };

  if (status === "authenticated") {
    redirect("/");
  }

  return (
    <div className="w-screen h-[90%] bg-black text-white flex justify-center items-center">
      <form onSubmit={(e) => handleSubmit(e)} className="w-96">
        <label>
          Логін
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Пароль
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
        >
          Увійти
        </button>
      </form>
      <p className="text-center text-gray-500 text-xs"></p>
    </div>
  );
}
