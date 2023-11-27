import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { fetchProjects } from "../../../api";
import { Message } from "primereact/message";
import { Badge } from 'primereact/badge';
import { Link } from "react-router-dom";

export default function ProjectStats () {

  const {currentClient} = useSelector((state) => state.client);
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    getProjects()
    }, [])

    const getProjects = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchProjects();
        console.log(res.data)      
        if (res.status === 200) {
          let projects = res.data;
          if (currentClient.isAdmin) {
            setProjectList(projects)
          } else {
          let data = []
            if (projects.length) {
              projects?.map(project => {
              if (project.ownerId.includes(currentClient._id))  
                  data.push(project) 
              })
            }
            setProjectList(data)
          }
          setError(false)
          setLoading(false)  
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
  }

  const setStatus = (status) => {
    switch (status) {
      case 2:
          return 'Completed';
      case 1:
          return 'In Progress';
      default:
          return 'Requested';
    }
  };

  const getStatusCount = (statusString) => {
    let count = 0;
    projectList?.map((project) => {
        if (setStatus(project.status) === statusString) count++
    })
    return count;
  }

  return (
    <div className="card">
      {loading && <div className="text-center text-blue-500">
        <i className="pi pi-spin pi-spinner text-8xl"></i></div>}
       {!loading && projectList.length > 0 ?
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div className="text-900 font-medium text-xl">  
                        <Link to='/dashboard'>Projects
                        </Link>   
                        </div>
                        <div className="flex align-items-center justify-content-center border-round">
                        <i className="pi pi-briefcase p-overlay-badge home-page-icon">
                            <Badge value={projectList.length} severity='danger'></Badge>
                        </i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl"> 
                    <Link to='/dashboard'>Requested
                        </Link> 
                      </div>
                        <div className="flex align-items-center justify-content-center border-round">
                            <i className="pi pi-file p-overlay-badge home-page-icon">
                            <Badge value={getStatusCount('Requested')} severity="info"></Badge>
                            </i>
                        </div>
                    </div>
                
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">
                    <Link to='/dashboard'>In Progress
                        </Link> 
                      </div>
                    <div className="flex align-items-center justify-content-center border-round">
                        <i className="pi pi-file-edit p-overlay-badge home-page-icon">
                            <Badge value={getStatusCount('In Progress')} severity="warning"></Badge>
                        </i>
                        </div>
                    </div>
                
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-1 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                    <div className="text-900 font-medium text-xl">
                    <Link to='/dashboard'>Completed 
                        </Link>                     
                      </div>
                    <div className="flex align-items-center justify-content-center border-round">
                        <i className="pi pi-check-square p-overlay-badge home-page-icon">
                            <Badge value={getStatusCount('Completed')} severity="success"></Badge>

                        </i>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        : <div className="transition-delay-3000">
                  <p className='mb-2 py-2 px-4 text-center'>
                  You have no projects!
                </p>
          </div>
        }
         {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
    </div>
  );
}