"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import * as Yup from "yup";

export default function RegistrationForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    username: "",
    password: "",
  });
  const [responseError, setResponseError] = useState("");

  const validate = async (name, value) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setValidationError((prevErrors) => ({ ...prevErrors, [name]: "" }));
      return true;
    } catch (error) {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
      return false;
    }
  };

  const removeValidationErrors = () => {
    setValidationError({ username: "", password: "" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidData =
      (await validate("username", username)) &&
      (await validate("password", password));
    if (!isValidData) return;
    removeValidationErrors();
    const response = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (response.ok) {
      router.push("/");
    } else {
      setUsername("");
      setPassword("");
      if(response.status === 401){
        setResponseError("Невірні дані для входу.")
      }else{
        setResponseError("Помилка при вході. Перевірте дані і оновіть сторінку.")
      }
    }
  };

  if (status === "authenticated") {
    router.push("/");
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
        <p className="bg-red-800 m-2 rounded-md">{validationError.username}</p>
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
        <p className="bg-red-800 m-2 rounded-md">{validationError.password}</p>
        <button
          type="submit"
          className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
        >
          Увійти
        </button>
       
      <p className="bg-red-800 m-6 rounded-md">{responseError}</p>
      </form>
    </div>
  );
}

const noSpaces = (value) => {
  return !/\s/.test(value);
};

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Логін не може бути пустим.")
    .min(3, "Мінімум 3 символи")
    .max(20, "Максимум 20 символів"),
  password: Yup.string()
    .required("Введіть свій пароль")
    .min(8, "Пароль не може бути менше 8 символів")
    .max(20, "Пароль не може бути довше 20 символів")
    .test("no-spaces", "Пароль не може містити пробіли.", noSpaces),
});
