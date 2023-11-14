import { useSelector } from 'react-redux';

export default function Comment(){

    const { projectItem} = useSelector((state) => state.projects);

    return (
        <>
            {projectItem.comments.length > 0 ? 
                projectItem.comments?.map((comment) => {
                    return (
                        <div key={comment} className='box-gray-1'>
                            <p className='txt-dark-gray mid-small'>{comment}</p> 
                        </div>                       
                    )}) : ''}
        </>
    );
}