import { IPublication } from "@/types/networkTypes";
import React from "react";
import parse from "html-react-parser";
import { headers } from "next/headers";
import LikeButton from "@/components/PublicationPage/LikeButton";

const PublicationPage = async ({
  params,
}: {
  params: { publicationId: string };
}) => {
  async function getPublication(): Promise<IPublication> {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/publications/${params.publicationId}`
    );
    return response.json();
  }

  const publication = await getPublication();

  return (
    <>
      <LikeButton publicationId={params.publicationId} />
      <div className="text-white min-h-[70vh] bg-gray-900 w-screen m-6 p-6">
        <h1 className="text-center text-3xl">{publication.title}</h1>
        <span className="float-right bg-gray-800 p-2 text-sm">
          Публікація додана {new Date(publication.createdAt).toLocaleString()}
        </span>
        <div>{parse(publication.text)}</div>
      </div>
    </>
  );
};

export default PublicationPage;
