import { Post } from "@/components/ForumPage/ThemesList";

export interface IForumPostPage {
    currentPost:Post,
    postComments:Comment[];
}

interface IBasicDBItem{
    id:number,
    createdAt:string,
    updatedAt:string
}

export interface Comment extends IBasicDBItem {
    authorId:number,
    authorUsername:string,
    text:string,
    ForumPostId:number,
}

export interface IPublication extends IBasicDBItem{
    userId:number,
    title:string,
    text:string,
    isModerated:boolean,
}

interface IPaginationInfo {
    totalItems:number,
    totalPages:number,
    currentPage:number,
    pageSize:number
}

export interface IPublicationsMainPageResponse {
    data:IPublication[],
    pagination:IPaginationInfo
}