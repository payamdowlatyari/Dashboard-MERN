import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { fetchClients } from "../../../api";
import { Message } from "primereact/message";
import { Badge } from 'primereact/badge';
import { Link } from "react-router-dom";

export default function ClientStats () {

  const {currentClient} = useSelector((state) => state.client);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientList, setClientList] = useState([]);

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

  return (
    <>
      {loading && <div className="text-center text-blue-500">
        <i className="pi pi-spin pi-spinner text-8xl"></i></div>}
       {!loading && clientList.length > 0 &&
        <>
            <div className="col-12 md:col-6 lg:col-3">
              <div className="shadow-1 p-3 border-50 border-round surface-card">
                <div className="flex justify-content-between mb-3 surface-card">
                  <div className="text-900 font-medium text-xl">
                      <Link to='/admin'> Clients</Link>        
                        </div>
                        <div className="flex align-items-center justify-content-center border-round">
                        <i className="pi pi-users p-overlay-badge home-page-icon surface-card">
                            <Badge value={clientList.length} severity='danger'></Badge>
                        </i>
                        </div>
                    </div>
                </div>
            </div>
        </>}
         {error ? <Message severity="error" text={error.message}/> || 
             <Message severity="error" text="Something went wrong!"/> : null}
    </>
  );
}