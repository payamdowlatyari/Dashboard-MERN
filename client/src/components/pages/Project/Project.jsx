import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {
    getProject,
    getProjectSuccess,
    getProjectFailure
} from '../../../redux/reducers/projectSlice';
import { getProjectById } from "../../../api";
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import { Chip } from 'primereact/chip';

import Comment from "./Comment";

export default function Project() {
    
const { id } = useParams();
const ref = useRef(null);
const { projectItem, loading, error} = useSelector((state) => state.projects);

const [projectDetails, setProjectDetails] = useState({});

const dispatch = useDispatch();

    useEffect(() => {
        getProjectDetails()
    }, [])

    const getProjectDetails = async () => {
      try {
          dispatch(getProject());
        const res = await getProjectById(id);
      //   console.log(res.data)      
        if (res.status === 200) {
          dispatch(getProjectSuccess(res.data));
          setProjectDetails(res.data)  
        }
        console.log(projectDetails)
      } catch (error) {
        dispatch(getProjectFailure(error));
      }
  }
 
    return (
        <div className='dashboard-main'>
          <div className='card'>
              {projectItem && 
              <Card title={projectItem.name}>
                       {projectItem.status === 2 ? 
                <Tag severity="success" value="Completed"></Tag>
                : (projectItem.status === 1 ? 
                    <Tag value="In Progress" severity='warning'></Tag>: 
                    <Tag severity="info" value="New"></Tag>)}
                
                  <p className="p-v-2 p-h-1">{projectItem.description} 
                  <span className="txt-gray p-h-2 small">{projectItem.endDate.substring(0, 10)}               
                  </span></p> 
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
              </Card>  
              }
          </div>
        </div>
        // <tbody>
        //     <tr>
        //         <td>
        //         {project.name}
        //         </td>
        //         <td>
        //         {project.description} 
        //         </td>
        //         <td>
        //         {project.startDate.substring(0, 10)} 
        //         </td>
        //         <td>
        //         {project.endDate.substring(0, 10)} 
        //         </td>
        //         <td>
        //         {project.status === 2 ? 
        //         <Tag severity="success" value="Completed"></Tag>
        //         : (project.status === 1 ? 
        //             <Tag value="In Progress"></Tag>: 
        //             <Tag severity="info" value="New"></Tag>)}
        //         </td>
        //     </tr>
        // </tbody>
    );
}