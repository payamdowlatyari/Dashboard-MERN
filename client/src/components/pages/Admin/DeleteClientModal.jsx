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
            if (res.status === 200) {
                toast.current.show({ severity: 'info', detail: 'Client deleted', life: 3000 });
            }
            navigate('/admin');
        } catch (error) {     
                toast.current.show({ severity: 'danger', detail: error.message, life: 3000 });       
        }         
    };

    const confirmDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this profile?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept
        });
    };

    return (
        <>
        <Toast ref={toast} />
        <ConfirmPopup />
            <Button 
                onClick={confirmDelete}
                tooltip="Delete"
                tooltipOptions={{ showDelay: 1000, hideDelay: 300, position: 'top' }}
                icon="pi pi-trash" className="text-xs" rounded text severity="danger"/>
        </>
    )
}
        