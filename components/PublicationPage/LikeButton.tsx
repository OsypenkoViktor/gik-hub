"use client";
import React, { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { LikeOutlined } from "@ant-design/icons";

type LikeButtonProps = {
  publicationId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ publicationId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    checkIsLiked();
  }, []);

  async function checkIsLiked() {
    try {
      const checkResult = await fetch(
        `/api/publications/${publicationId}/like`,
        { credentials: "include" }
      );

      const { totalLikes } = await checkResult.json();
      setTotalLikes(totalLikes);

      if (checkResult.ok) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Failed to check if liked:", error);
      setIsLiked(false);
    }
  }

  async function toggleLike() {
    try {
      const toggleLikeRes = await fetch(
        `/api/publications/${publicationId}/like`,
        { method: "POST", credentials: "include" }
      );

      const { totalLikes } = await toggleLikeRes.json();
      setTotalLikes(totalLikes);

      if (toggleLikeRes.status === 201) {
        setIsLiked(true);
      } else if (toggleLikeRes.status === 200) {
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }

  return (
    <FloatButton
      type={isLiked ? "primary" : "default"}
      icon={<LikeOutlined />}
      style={{ right: "100px" }}
      onClick={toggleLike}
      badge={{ count: totalLikes }}
    />
  );
};

export default LikeButton;
