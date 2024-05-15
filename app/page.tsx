"use client";
import MainSection from "@/components/MainPage/MainSection";
import Sidebar from "@/components/MainPage/Sidebar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-[90%]">
      <Sidebar />
      <MainSection />
    </div>
  );
}
