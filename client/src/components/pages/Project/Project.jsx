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
import Comments from "./Comments";
import NewComment from "./NewComment";
import DeleteProjectModal from "./DeleteProjectModal";

export default function Project() {
    
const { id } = useParams();
const ref = useRef(null);
const { projectItem } = useSelector((state) => state.projects);
const {currentClient} = useSelector((state) => state.client);
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
              <Button label="Projects" icon="pi pi-angle-left" size="small" text/>  
        </Link>  
        {currentClient.isAdmin && <>
        <Link to={`/admin/project/update/${projectItem._id}`}>
              <Button icon='pi pi-pencil' label="Edit" size="small" text severity="success"/>
        </Link>
        <DeleteProjectModal id={projectItem._id}/></>}
        </>
      );
    }

    const subtitle = () => {
      return ( 
        <span className="p-h-1 txt-gray small">
          <i className="pi pi-user mr-2"></i>   
          {projectOwner ? projectOwner.username : 'client'}   
        </span>
      )
    }

    return (
        <div className='main'>
          <div className='card'>
              {projectItem && 
              <Card title={projectItem.name} subTitle={subtitle} footer={footer}>

                 <div className="grid text-center">
                    <div className="md:col-4 sm:col-12">
                      <span className="p-h-1 txt-gray small">
                      <span className="p-h-1">Started</span> 
                      <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                        {new Date(projectItem.startDate).toString().substring(0, 15)} 
                      </span>
                    </div>
                    <div className="md:col-4 sm:col-12">
                      <Steps model={items} activeIndex={projectItem.status} 
                        className="max-w-25rem m-auto text-xs"
                        />   
                    </div>
                    <div className="md:col-4 sm:col-12">
                      <span className="p-h-1 txt-gray small">
                      <span className="p-h-1">Due</span> 
                      <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                      {new Date(projectItem.endDate).toString().substring(0, 15)}     
                      </span>
                    </div>
                </div>   
                  <p className="p-h-1">{projectItem.description} </p>
                    <p className="p-h-1 txt-gray small">
                    <span className="p-h-1">Updated</span> 
                    <i className="pi pi-clock mr-2 vertical-align-bottom"></i>
                    {new Date(projectItem.updatedAt).toString().substring(0, 21)} 
                    </p>
                    <Panel ref={ref} 
                      header={projectItem.comments &&
                          (
                            <Button type="button" 
                              label="Comments" severity="secondary"
                              size="small" text icon="pi pi-comment"
                              onClick={() => ref.current.toggle()}>
                              <Badge value={projectItem.comments.length} severity="secondary"/>
                            </Button>   
                          )} toggleable>
                      
                            {projectItem.comments && projectItem.comments.length > 0 ?
                               <Comments/>
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