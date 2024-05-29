"use client";
import ThemesList from "@/components/ForumPage/ThemesList";
import type { TreeDataNode } from "antd";
import { Button, Tree } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

//типи відповіді серверу
export interface IForumTheme {
  id: number;
  theme: string;
}

export interface ITagData {
  id: number;
  tag: string;
  ForumThemes: IForumTheme[];
}

const Forum = () => {
  const [tagsData, setTagsData] = useState<ITagData[] | null>(null);
  const [currentTheme, setCurrentTheme] = useState<number | null>(null);
  useEffect(() => {
    async function getForumTags() {
      const res = await fetch("api/forum");
      if (!res.ok) {
        throw new Error("Помилка при отриманні данних");
      }
      return res.json();
    }
    getForumTags().then((data) => setTagsData(data));
  }, []);

  const linksTreeData: TreeDataNode[] = tagsData?.map((tag) => ({
    title: tag.tag,
    key: tag.tag,
    children: tag.ForumThemes.map((forumTheme) => ({
      title: (
        <span
          onClick={() => {
            setCurrentTheme(forumTheme.id);
          }}
        >
          {forumTheme.theme}
        </span>
      ),
      key: forumTheme.id,
    })),
  }));

  return (
    <>
      <div className="text-white border-r border-white w-[30%] h-full p-4">
        <h1>Теми форуму</h1>
        <Tree defaultExpandAll treeData={linksTreeData} />
        <Button type="primary" className="mt-4">
          <Link href="/forum/newpost">Створити обговорення</Link>
        </Button>
      </div>
      <ThemesList themeID={currentTheme} />
    </>
  );
};

export default Forum;
