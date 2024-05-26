import React, { useEffect } from "react";
import Link from 'next/link'
import { Pagination,Typography } from "antd";

import {
  IPublication,
  IPublicationsMainPageResponse,
} from "@/types/networkTypes";



const PublicationsPage = async () => {


  async function getPublications(
    page: number
  ): Promise<IPublicationsMainPageResponse> {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/publications?page=${page}`
    );
    return response.json();
  }

  const response = await getPublications(1);

  if (response.data.length === 0)
    return (
      <div className="text-white">На даний момент публікації відсутні.</div>
    );

  return (
    <div className="text-white min-h-[80vh] w-screen p-4">
      {response.data.map((publication) => (
        <PublicationPreview key={publication.id} publication={publication} />
      ))}
    </div>
  );
};

export default PublicationsPage;

const PublicationPreview = ({ publication }: { publication: IPublication }) => {
  return (
    <div className="text-white w-full bg-gray-900 h-40 p-2">
        <h2 className="text-2xl text-green-300 font-bold underline pb-4">
            <Link href={`/publications/${publication.id}`}>{publication.title}</Link>
            
            </h2>
        <p> Публікація створена {new Date(publication.createdAt).toLocaleString()}</p>
    </div>
  );
};
