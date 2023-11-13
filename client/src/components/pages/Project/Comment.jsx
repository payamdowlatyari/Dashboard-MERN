import { useSelector } from 'react-redux';
import { Divider } from 'primereact/divider';

export default function Comment(){

    const { projectItem} = useSelector((state) => state.projects);

    console.log(projectItem.comments)

    return (
        <>
                {projectItem.comments.length > 0 ? 
                    projectItem.comments?.map((comment) => {
                       return (
                       <div className='box-gray-1'>
                         {/* <Divider/> */}
                            <p className='txt-dark-gray mid-small'>{comment}</p> 
                            {/* <Divider/> */}
                       </div>
                       
                       )
                    }) : ''}
        </>
    );
}