import { useSelector } from 'react-redux';
import Comment from './Comment';

export default function Comments(){

    const { projectItem} = useSelector((state) => state.projects);

    const commentDetails = (comment) => {

        if (comment) {
            return  <Comment commentDetails={comment}/>;
        } 
    }

    return (
        <>
            {projectItem.comments.length > 0 &&
                projectItem.comments?.map((comment) => {
                   return commentDetails(comment)
            })}
        </>
    );
}