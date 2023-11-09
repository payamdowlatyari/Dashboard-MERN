export default function Project({project}) {
      
    return (
        <tbody>
        <tr>
            <td>
            {project.name}
            </td>
            <td>
            {project.description} 
            </td>
            <td>
            {project.startDate.substring(0, 10)} 
            </td>
            <td>
            {project.endDate.substring(0, 10)} 
            </td>
            <td>
            {project.status == 2 ? 
                <span className="status-col-2">Completed</span>
             : (project.status == 1 ? 
             <span className="status-col-1">In Progress</span> : 
             <span className="status-col-0">New</span>)}
            </td>
        </tr>
        </tbody>
    );
}