"use client";
import { Post } from "@/components/ForumPage/ThemesList";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import PostDisplay from "@/components/PostPage/PostDisplay";
import TextEditor from "@/components/NewPostPage/TextEditor";
import { useSession } from "next-auth/react";
import { Comment, IForumPostPage } from "@/types/networkTypes";
import PostComments from "@/components/PostPage/PostComments";

const PostPage = ({
  params,
}: {
  params: {
    themeId: string;
    postId: string;
  };
}) => {
  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getCurrentPostData();
  }, []);

  async function getCurrentPostData() {
    const postData = await fetch(
      `/api/forum/${params.themeId}/${params.postId}`
    );
    const responseData: IForumPostPage = await postData.json();
    setPost(responseData.currentPost);
    setPostComments(responseData.postComments);
    setNewComment("");
  }

  async function createNewPost() {
    const response = await fetch(
      `/api/forum/${params.themeId}/${params.postId}}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          authorId: session.user.id,
          authorUsername: session.user.name,
          text: newComment,
          ForumPostId: params.postId,
        }),
      }
    );
    if (response.ok) getCurrentPostData();
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="w-screen flex h-max flex-col">
      <PostDisplay post={post} />
      {session?.user ? (
        <>
          <TextEditor value={newComment} setValue={setNewComment} />

          <Button type="primary" className="w-60 m-6" onClick={createNewPost}>
            Коментувати
          </Button>
        </>
      ) : (
        <div className="text-white text-center text-xl">
          Для коментування необхідно авторизуватися.
        </div>
      )}

      <PostComments comments={postComments} />
    </div>
  );
};

export default PostPage;
