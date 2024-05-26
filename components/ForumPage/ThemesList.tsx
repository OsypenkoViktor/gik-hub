"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Spin } from "antd";

export type Post = {
  id: number;
  title: string;
  authorId: number;
  text: string;
  createdAt: string;
};

const ThemesList = ({ themeID }: { themeID: number | null }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setPosts(null);
    async function currentThemePosts(): Promise<Post[]> {
      if (!themeID) return;
      const res = await fetch(`api/forum/${themeID}`);
      if (!res.ok) {
        throw new Error("Помилка при отриманні данних");
      }
      return res.json();
    }
    setIsLoading(true);
    currentThemePosts()
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [themeID]);

  if (isLoading) {
    return (
      <div className="text-white w-[70%] h-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <span className="text-white p-6">В обраній темі поки немає постів</span>
    );
  } else {
    return (
      <div className="text-white w-[70%] h-full flex flex-col items-center">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} themeId={themeID}  />
        ))}
      </div>
    );
  }
};

export default ThemesList;
