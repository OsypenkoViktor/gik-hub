"use client";
import { FormEvent, use, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function RegistrationForm() {
  const router = useRouter();
  const [validationError, setValidationError] = useState({
    username: "",
    password: "",
    email: "",
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const isValidData =
      (await validate("username", username)) &&
      (await validate("password", password)) &&
      (await validate("email", email));
    if (!isValidData) return;

    const response = await fetch("/api/registration", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });

    if (response.ok) {
      router.push("/signin");
    } else {
      try {
        const errorResponse = await response.json();
        const message = errorResponse.message;
        setResponseError(message);
      } catch (error) {
        setResponseError(
          "Помилка при спробі реєстрації. Перевірте введені данні, оновіть сторінку і стробуйте ще раз"
        );
      }
    }
  }

  return (
    <div className="w-screen h-[90%] bg-black text-white flex items-center justify-center">
      <form onSubmit={onSubmit} className="bg-black shadow-md w-96 rounded">
        <div className="mb-4">
          <label className="block  text-sm font-bold  mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
          />
          <p className="text-red-500 text-xs italic">
            {validationError.username}
          </p>
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            {validationError.password}
          </p>
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">{validationError.email}</p>
        </div>
        <div className="flex items-center justify-between">
        <p className="text-red-500 text-xs italic">{responseError}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Зареєструватися
          </button>
        </div>
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
  email: Yup.string()
    .required("Введіть елетронну пошту")
    .email("Перевірте валідність введеної поштової адреси"),
});
