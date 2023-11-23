import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import { fetchClients } from "../../../api";
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from "primereact/message";
import { Link } from "react-router-dom";
import DeleteClientModal from "./DeleteClientModal";
export default function Clients () {

//   const { currentClient} = useSelector((state) => state.client);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);
  // const [clientItem, setclientItem] = useState({});

      useEffect(() => {
        getClients()
      }, [])

  const getClients = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchClients();
        setLoading(false)
        console.log(res.data)      
        if (res.status === 200) {
          setClientList(res.data)
          setError(false)
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
  }

  const showAdminStatus = (rowData) => {
    if (rowData.isAdmin) {
        return <span className="pi pi-check-circle" style={{ color: 'var(--primary-color)' }}></span>
    }
    return <span className="pi pi-times-circle txt-gray"></span>
  }

  const displayAdminActions = (rowData) => {
    return (
            <>  
            <DeleteClientModal id={rowData._id}/>
            <Link to={`/admin/client/edit/${rowData._id}`}>
                <Button tooltip="Edit"
                    tooltipOptions={{ showDelay: 1000, hideDelay: 300, position: 'top' }}
                    icon="pi pi-user-edit" className="text-xs" rounded text severity="success"/>
            </Link>
            </>
    );
  };

  const parseDate = (date) => {
    return new Date(date.createdAt).toString().substring(0, 10)
  }

  return (
    <div className="card">
      {loading && <div className="text-center text-blue-500">
        <i className="pi pi-spin pi-spinner text-8xl"></i></div>}
       {(!loading && clientList.length > 0) ?
        <div>
          <DataTable 
            className="text-sm" 
            value={clientList} paginator size="small" 
            rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
            tableStyle={{ minWidth: '10rem' }}>
                <Column field="username" header="Username"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="createdAt" header="Register Date" body={parseDate}></Column>
                <Column field="isAdmin" header="Admin" body={showAdminStatus}></Column>
                <Column field="_id" header="Actions" body={displayAdminActions}></Column>
            </DataTable>
        </div> : 
        <div className="transition-delay-1000">
            <p className='mb-2 py-2'>
              No Clients!
            </p>
          </div>
        }
        {error && (<Message severity="error" text={error.message}/> || 
          <Message severity="error" text="Something went wrong!"/> )}
    </div>
  );
}