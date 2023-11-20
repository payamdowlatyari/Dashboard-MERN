import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import {
    getProject,
    getProjectSuccess,
    getProjectFailure
} from '../../../redux/reducers/projectSlice';
import { getProjectById, getClientById } from "../../../api";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { Steps } from 'primereact/steps';
import Comment from "./Comment";
import NewComment from "./NewComment";

export default function Project() {
    
const { id } = useParams();
const ref = useRef(null);
const { projectItem } = useSelector((state) => state.projects);
const [ projectOwner, setProjectOwner ] = useState({}) 
const dispatch = useDispatch();

    useEffect(() => {
        getProjectDetails()
        if (projectItem) getProjectOwner()
    }, [])

    const getProjectOwner = async () => {

      try {
        const res = await getClientById(projectItem.ownerId[0]);
          setProjectOwner(res.data)
          console.log(projectOwner)
      } catch (error) {
          console.log(error);
      }
    }

    const getProjectDetails = async () => {
      try {
          dispatch(getProject());
          const res = await getProjectById(id);
        if (res.status === 200) {
          dispatch(getProjectSuccess(res.data));
        }

      } catch (error) {
          dispatch(getProjectFailure(error));
      }
  }
    const items = [
        { label: 'New' },
        { label: 'In Progress' },
        { label: 'Completed' }
    ];

    const footer = () =>{
      return ( 
        <>
        <Link to='/dashboard'>
              <Button label="Projects" icon="pi pi-angle-left" size="small" severity="secondary" text/>  
        </Link>  
        
        <Link to={`/admin/project/update/${projectItem._id}`}>
              <Button icon='pi pi-pencil' label="Edit" size="small" text severity="success" />
        </Link>
        </>
   
      );
    }

    const subtitle = () => {
      return ( 
          <span className="p-h-1 txt-gray small">
            <i className="pi pi-clock mr-2"></i> 
              {new Date(projectItem.endDate).toString().substring(0, 15)}     
          </span>
      )
    }


    return (
        <div className='main'>
          <div className='card'>
              {projectItem && 
              <Card title={projectItem.name} subTitle={subtitle} footer={footer}>
                 
                 <Steps model={items} activeIndex={projectItem.status} 
                className="max-w-20rem m-auto text-xs"
                 />
                
                  <p className="p-h-1">{projectItem.description} </p>
                    <p className="p-h-2 txt-gray small">
                    <i className="pi pi-user mr-2"></i>   
                    {projectOwner ? projectOwner.username : 'client'}    
                    </p>
                 
                    <Panel ref={ref} 
                      header={projectItem.comments ? 
                          (
                            <Button type="button" severity="info" 
                              size="small" text icon="pi pi-comment"
                              onClick={() => ref.current.toggle()}>
                              <Badge value={projectItem.comments.length}/>
                            </Button>   
                          ) : ''} toggleable>
                      
                            {projectItem.comments && projectItem.comments.length > 0 ?
                                <Comment/> 
                                : <p className="txt-dark-gray mid-small">No Comments</p>}
                    </Panel>
                      <div className="txt-gray p-h-1 p-v-2">
                      <NewComment projectId={id}/>
                      </div>  
              </Card>  
              }
          </div>
        </div>
    );
}