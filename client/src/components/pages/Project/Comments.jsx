import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

export default function Comments(){

    const {projectItem, loading} = useSelector((state) => state.projects);
    const [comments, setComments] = useState([]) 

    useEffect(() => {

        if (projectItem) setComments(projectItem.comments)
        if (comments.length > 0) reverseComments()
    }, [loading])

    const reverseComments = () => {
        const reversedComments = [...comments].reverse();
        setComments(reversedComments);
      };

    return (
        <>
            {comments.length > 0 &&
                comments?.map((comment) => {
                   return <Comment key={comment._id} commentDetails={comment}/>;
            })}
        </>
    );
}