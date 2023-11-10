import { Tag } from 'primereact/tag';

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
                {project.status === 2 ? 
                <Tag severity="success" value="Completed"></Tag>
                : (project.status === 1 ? 
                    <Tag value="In Progress"></Tag>: 
                    <Tag severity="info" value="New"></Tag>)}
                </td>
            </tr>
        </tbody>
    );
}