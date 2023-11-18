
import React, { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { deleteClientById } from '../../../api';
import { useNavigate } from 'react-router-dom';

export default function DeleteClientModal({id}) {

    const toast = useRef(null);
    const navigate = useNavigate();

    const accept = async () => {
        try { 
            const res = await deleteClientById(id);

                console.log(res.data)
                toast.current.show({ severity: 'info', detail: 'Client deleted', life: 3000 });
            navigate('/admin');

        } catch (error) {            
            console.log(error)
        }
           
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', detail: 'Rejected', life: 3000 });
    };
    
    const confirmDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
        <Toast ref={toast} />
        <ConfirmPopup />
            <Button 
                onClick={confirmDelete}
                tooltip="Delete item"
                tooltipOptions={{ showDelay: 1000, hideDelay: 300, position: 'top' }}
                icon="pi pi-trash" className="text-xs" rounded text severity="danger"/>
        </>
    )
}
        