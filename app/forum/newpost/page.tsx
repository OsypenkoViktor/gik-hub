"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Input } from "antd";
import UserUnauth from "@/components/NewPostPage/UserUnaut";
import ThemeSelect from "@/components/NewPostPage/ThemeSelect";
import { ITagData } from "../page";
import TextEditor from "@/components/NewPostPage/TextEditor";

const NewPostPage = () => {
  const [tagsData, setTagsData] = useState<ITagData[] | null>(null);
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

  //стейт інпуту заголовка нового поста
  const [title, setTitile] = useState("");

  //стейт інпуту вибору теми нового поста
  const [theme, setTheme] = useState<string | null>(null);

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      // Другие свойства пользователя, если они есть
    };
    // Другие свойства сессии, если они есть
  }

  function isValidSession(session: any): session is Session {
    return session && session.user && session.user.id;
  }

  const { data: session, status } = useSession();
  const userSession = isValidSession(session) ? session : null;

  const editor = useRef(null);

  async function createNewPost() {
    const response = await fetch("/api/post", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        authorId: userSession.user.id,
        text: value,
        forumThemeId: theme,
      }),
    });
    console.log(response);
  }

  if (status === "loading") {
    return <div className="ml-auto">Завантаження...</div>;
  }

  if (status === "unauthenticated") {
    return <UserUnauth />;
  }

  const themeSelectOptions = tagsData?.map((tag) =>
    tag.ForumThemes.map((theme) => ({
      value: theme.id,
      label: theme.theme,
    }))
  );

  function onTitleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitile(event.target.value);
  }

  return (
    <div className="h-[100%] w-screen flex flex-col items-center justify-between">
      <div>
        <h1 className="text-white ">Назва поста</h1>
        <Input
          placeholder="Введіть назву"
          onChange={onTitleInputChange}
          className="w-96"
        />

        <h1 className="text-white ">Тема поста</h1>
        <ThemeSelect tagsData={tagsData} setTheme={setTheme} />
      </div>
      <TextEditor value={value} setValue={setValue} />
      <button className="text-white" onClick={createNewPost}>
        GO
      </button>
    </div>
  );
};

export default NewPostPage;
