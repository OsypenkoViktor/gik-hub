"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Input, Button } from "antd";
import UserUnauth from "@/components/NewPostPage/UserUnaut";
import ThemeSelect from "@/components/NewPostPage/ThemeSelect";
import { ITagData } from "../page";
import TextEditor from "@/components/NewPostPage/TextEditor";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const NewPostPage = () => {
  const [tagsData, setTagsData] = useState<ITagData[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function getForumTags() {
      const res = await fetch("/api/forum");
      if (!res.ok) {
        throw new Error("Помилка при отриманні данних");
      }
      return res.json();
    }
    getForumTags().then((data) => setTagsData(data));
  }, []);
  //стейт текстового едитору
  const [value, setValue] = useState("");
  console.log(value);

  //стейт інпуту заголовка нового поста
  const [title, setTitile] = useState("");

  //стейт інпуту вибору теми нового поста
  const [theme, setTheme] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [validationError, setValidationError] = useState({
    title: "",
    theme: "",
  });

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
  async function createNewPost() {
    const isValidData =
      (await validate("title", title)) && (await validate("theme", theme));
    if (!isValidData) return;
    const response = await fetch("/api/post", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        authorId: session.user.id,
        text: value,
        forumThemeId: theme,
      }),
    });
    if (response.ok) router.push("/forum");
  }

  if (status === "loading") {
    return <div className="ml-auto">Завантаження...</div>;
  }

  if (status === "unauthenticated") {
    return <UserUnauth />;
  }

  function onTitleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitile(event.target.value);
  }

  return (
    <div className="h-[80vh] w-screen flex flex-col items-center justify-between">
      <div>
        <h1 className="text-white ">Назва поста</h1>
        <Input
          placeholder="Введіть назву"
          onChange={onTitleInputChange}
          className="w-96"
        />
        <p className="text-red-900">{validationError.title}</p>
        <h1 className="text-white ">Тема поста</h1>
        <ThemeSelect tagsData={tagsData} setTheme={setTheme} />
        <p className="text-red-900">{validationError.theme}</p>
      </div>
      <div className="w-[90%]">
        <TextEditor value={value} setValue={setValue} />
        <Button type="primary" className="text-white" onClick={createNewPost}>
          Cтворити новий пост
        </Button>
      </div>
    </div>
  );
};

export default NewPostPage;

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Заголовок не може бути пустим.")
    .min(10, "Мінімум 10 символів")
    .max(35, "Максимум 35 символів"),
  theme: Yup.string().required("Оберіть тему зі списку."),
});
