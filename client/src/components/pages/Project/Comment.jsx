import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getClientById } from '../../../api';

export default function Comment({commentDetails}){

    const {projectOwner} = useSelector((state) => state.projects);
    const [commentBy, setCommentBy] = useState({});

    useEffect(() => {
        if (commentDetails && commentDetails.by === projectOwner._id) 
            setCommentBy(projectOwner)
        else getClient()
    }, [])

    const getClient = async () => {
   
        try {
            const res = await getClientById(commentDetails.by);
            if (res.status === 200) {
                console.log(res.data)
               setCommentBy(res.data)
            }            
          } catch (error) {
            console.log(error)
          }
      }

    return ( 
            <div className='box-gray-comment'>
                {commentBy && <>
                <p className='mid-small'>
                <span className='font-bold px-2'> 
                {commentBy.username}
                {commentBy.isAdmin && <i className="pi pi-verified ml-1 text-blue-500"></i>}

                </span>
                    {commentDetails.text}</p> 
                <p className='small text-gray-400'>
                <span className='px-2'> 
                <i className="pi pi-clock mr-2 vertical-align-bottom text-gray-400"></i>
                {new Date(commentDetails.date).toString().substring(0, 21)} 
                </span>
                </p> </>}
            </div>  
             
    );
}