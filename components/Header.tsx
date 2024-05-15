import React from "react";
import UserInfoBlock from "./UserInfoBlock";
import Image from "next/image";
import logo from "@/assets/images/geekhubLogo.jpg";
import { Coda } from "next/font/google";
import CustomModal from "./CustomModal";

const coda = Coda({ subsets: ["latin"], weight: "800" });
const Header: React.FC = () => {
  return (
    <header className="flex  py-4 px-4 sm:px-10 font-[sans-serif] h-[10%] items-center z-50 bg-black text-white">
      <CustomModal />
      <a href="/">
        <h1 className={coda.className}>Gik-hub</h1>
      </a>
      <UserInfoBlock />
    </header>
  );
};

export default Header;
