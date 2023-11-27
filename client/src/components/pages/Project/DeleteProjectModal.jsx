import React, { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { deleteProjectById } from '../../../api';
import { useNavigate } from 'react-router-dom';

export default function DeleteProjectModal({id}) {

    const toast = useRef(null);
    const navigate = useNavigate();

    const accept = async () => {
        try { 
            const res = await deleteProjectById(id);
            if (res.status === 200) {
                toast.current.show({ severity: 'info', detail: 'Project deleted', life: 3000 });
            }
            navigate('/dashboard');
        } catch (error) {   
            toast.current.show({ severity: 'danger', detail: error.message, life: 3000 });
        }         
    };
    
    const confirmDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to delete this project?',
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
                icon="pi pi-trash" label='Delete' size='small' severity="danger"/>
        </>
    )
}
        