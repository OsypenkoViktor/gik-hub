import { Comment } from '@/types/networkTypes';
import React from 'react';
import parse from "html-react-parser";

type PostCommentsProps = {
    comments:Comment[]|null
}

const PostComments = ({comments}: PostCommentsProps) => {

    if(!comments) return <div>Loading...</div>

    return <div className='text-white flex flex-col items-center justify-center'>
        {!!comments.length && comments.map(comment => (
         <PostCommentCard key={comment.id} comment={comment}/>
        ))}
    </div>
};

export default PostComments;

type PostCommentCardProps = {
    comment:Comment
}

const PostCommentCard = ({comment}:PostCommentCardProps)=>{
    return(
        <div className='w-[90%] bg-gray-800 min-h-10 m-6 p-2 rounded-md'>
            <p className='bg-green-800'>{comment.authorUsername}, {new Date(comment.createdAt).toLocaleString()}</p>
            <div className='post'>{parse(comment.text)}</div>
        </div>
    )
}