import React, { useEffect, useState } from 'react';
import { getClientById } from '../../../api';

export default function Comment({commentDetails}){

    const [commentBy, setCommentBy] = useState({});

    useEffect(() => {
        getClient()
    }, [])

    const getClient = async () => {

        console.log(commentDetails)
   
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
                <p className='txt-dark-gray mid-small'>
                <span className='font-bold px-2'> 
                    {commentBy.isAdmin ? 'Admin' : commentBy.username}:
                </span>
                    {commentDetails.text}</p> 
                <p className='txt-gray small'>
               
                <span className='txt-gray px-2'> 
                <i className="pi pi-clock mr-2"></i>
                {new Date(commentDetails.date).toString().substring(0, 21)} 
                </span>
                </p> 
            </div>   
    );
}