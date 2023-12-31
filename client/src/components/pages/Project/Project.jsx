import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import {
    getProjectStart,
    getProjectSuccess,
    getProjectFailure,
    getProjectOwnerStart,
    getProjectOwnerSuccess,
    getProjectOwnerFailure,
} from '../../../redux/reducers/projectSlice';
import { getProjectById, getClientById } from "../../../api";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { Steps } from 'primereact/steps';
import Comments from "./Comments";
import NewComment from "./NewComment";
import DeleteProjectModal from "./DeleteProjectModal";

export default function Project() {
    
const { id } = useParams();
const ref = useRef(null);
const { projectItem, projectOwner, loading } = useSelector((state) => state.projects);
const { currentClient } = useSelector((state) => state.client);
const [ ownerChecked, setOwnerChecked ] = useState(false)
const dispatch = useDispatch();

    useEffect(() => {      
        getProjectDetails().then(() => {
          checkOwner();
              getProjectOwner()
        });
        
    }, [ownerChecked])

    const getProjectOwner = async () => {

      try {       
        dispatch(getProjectOwnerStart())
        const res = await getClientById(projectItem.ownerId[0]);
        dispatch(getProjectOwnerSuccess(res.data))
      } catch (error) {
         dispatch(getProjectOwnerFailure(error))
      }
    }

    const getProjectDetails = async () => {
      try {
          dispatch(getProjectStart());
          const res = await getProjectById(id);
        if (res.status === 200) {
          dispatch(getProjectSuccess(res.data));
        }

      } catch (error) {
          dispatch(getProjectFailure(error));
      }
    }

    const checkOwner = () => {
      if (projectItem && projectOwner && projectItem.ownerId[0] === projectOwner._id) 
        setOwnerChecked(true)
    }
    
    const items = [
        { label: 'Requested' },
        { label: 'In Progress' },
        { label: 'Completed' }
    ];

    const footer = () =>{
      return ( 
        <div className="grid"> 
        <div className="col-12 md:col-8 lg:col-9">
        <Link to='/dashboard'>
              <Button label="Projects" icon="pi pi-angle-left" size="small" severity="info" text/>  
        </Link>  
        </div>
        <div className="col-12 md:col-4 lg:col-3">
        {currentClient.isAdmin && <>
        <Link to={`/admin/project/update/${projectItem._id}`}>
              <Button icon='pi pi-pencil' label="Edit" size="small" severity="success" text/>
        </Link>
        <DeleteProjectModal id={projectItem._id}/></>}
        </div>
        </div>
      );
    }

    const subtitle = () => {
      return ( 
        <span className="px-1 text-mini small">
          <i className="pi pi-user mr-2"></i>   
          {projectOwner ? projectOwner.username : 'client'}
        </span>
      )
    }

    return (
        <div className='main'>
          <div className='card'>
              {(!loading && projectItem) && 
              <Card title={projectItem.name} subTitle={subtitle} footer={footer}>

                 <div className="grid justify-center">
                    <div className="md:col-3 sm:col-12 text-center">
                      <span className="p-1 text-mini small">
                      <span className="px-1">Started</span> 
                      <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                        {new Date(projectItem.startDate).toString().substring(0, 15)} 
                      </span>
                    </div>
                    <div className="md:col-6 sm:col-12 text-center my-2">
                      <Steps model={items} activeIndex={projectItem.status} 
                        className="max-w-auto text-center text-xs"
                        />   
                    </div>
                    <div className="md:col-3 sm:col-12 text-center">
                      <span className="p-1 text-mini small">
                      <span className="px-1">Due</span> 
                      <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                      {new Date(projectItem.endDate).toString().substring(0, 15)}     
                      </span>
                    </div>
                </div>   
                <div className="box-gray-description">
                  <p className="px-1">{projectItem.description} </p>
                    <p className="px-1 text-mini small">
                    <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                    {new Date(projectItem.updatedAt).toString().substring(0, 21)} 
                    </p>
                    <Panel ref={ref} 
                      header={projectItem.comments &&
                          (
                            <Button type="button" 
                              label="Comments" severity='info'
                              size="small" text icon="pi pi-comment"
                              onClick={() => ref.current.toggle()}>
                              <Badge value={projectItem.comments.length} severity='info'/>
                            </Button>   
                          )} toggleable>
                      
                            {projectItem.comments && projectItem.comments.length > 0 ?
                               <Comments/>
                                : <p className="mid-small pl-3">No Comments</p>}
                                <div className="text-mini">
                      <NewComment projectId={id}/>
                      </div>  
                    </Panel></div>
                      
              </Card>  
              }
          </div>
        </div>
    );
}