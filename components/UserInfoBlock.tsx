"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Spin } from "antd";

const UserInfoBlock = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="ml-auto">
        <Spin />
      </div>
    );
  }
  if (status === "authenticated")
    return (
      <div className="flex items-center ml-auto space-x-6">
        <p>{session?.user?.name}</p>
        <button
          className="bg-[#007bff] text-white rounded-md p-2"
          onClick={() => signOut()}
        >
          Вийти
        </button>
      </div>
    );
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center ml-auto space-x-6">
        <button className="font-semibold text-[15px] border-none outline-none">
          <a href="/signin" className="text-[#007bff] hover:underline">
            Вхід
          </a>
        </button>
        <a href="/registration" className="text-[#007bff] hover:underline">
          Реєстрація
        </a>
      </div>
    );
  }
};

export default UserInfoBlock;
