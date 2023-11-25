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

        console.log(commentDetails)
        console.log(projectOwner)
   
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
            <div className='box-gray-1'>
                {commentBy && <>
                <p className='txt-dark-gray mid-small'>
                <span className='font-bold px-2'> 
                {commentBy.username}
                {commentBy.isAdmin && <i className="pi pi-verified ml-1 text-blue-500"></i>}

                </span>
                    {commentDetails.text}</p> 
                <p className='txt-gray small'>
                <span className='txt-gray px-2'> 
                <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                {new Date(commentDetails.date).toString().substring(0, 21)} 
                </span>
                </p> </>}
            </div>   
    );
}