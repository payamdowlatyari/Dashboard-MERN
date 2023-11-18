import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import {
    getProject,
    getProjectSuccess,
    getProjectFailure
} from '../../../redux/reducers/projectSlice';
import { getProjectById } from "../../../api";
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
const { projectItem} = useSelector((state) => state.projects);
const dispatch = useDispatch();

    useEffect(() => {
        getProjectDetails()
    }, [])

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

    return (
        <div className='main'>
          <div className='card'>
              {projectItem && 
              <Card title={projectItem.name}>
                 
                <Steps model={items} activeIndex={projectItem.status} 
                className="max-w-30rem m-auto text-sm"
                 />
                
                  <p className="p-v-1 p-h-1">{projectItem.description} </p>
              <p className="txt-gray small txt-right p-h-2">             
                  <i className="pi pi-clock mr-2"></i> 
                    {new Date(projectItem.endDate).toString().substring(0, 25)}               
                  </p> 
                 
                  <Panel ref={ref} 
                    header={projectItem.comments ? 
                        (
                          <Button type="button" label="Comments" 
                            size="small" text
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
                      <p className="txt-gray small txt-right"> 
                      <Link to={`/admin/project/update/${projectItem._id}`}>
                          <Button icon='pi pi-pencil' label="Edit" size="small" rounded text severity="success" />
                        </Link>
                      </p> 
                     
                      </div>
                     
                     <Link to='/dashboard'>
                     <span className="pi pi-angle-left txt-dark-gray small"></span>
                    <span className="txt-dark-gray mid-small p-h-1">Projects</span> 
                                     
                    </Link>      
              </Card>  
              }
          </div>
        </div>
    );
}