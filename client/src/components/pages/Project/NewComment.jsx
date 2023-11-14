
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addNewComment } from '../../../api';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";

export default function NewComment({projectId}) {

    const toast = useRef(null);
    const defaultValues = { comment: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Comment Submitted', detail: form.getValues('comment') });
    };

    const onSubmit = async (data) => {
        data.comment && show();

        try {
            const res = await addNewComment(projectId, data);
            if (res.status !== 200) {
              return;
            }
          } catch (error) {
    
          }
        form.reset();
    };
  
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                <Controller
                    name="comment"
                    control={form.control}
                    rules={{ required: 'Comment is required.' }}
                    render={({ field, fieldState }) => (
                        <p>
                            <InputTextarea id={field.name} {...field} rows={2} cols={50} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}
                        </p>
                    )}
                />
                <Button label="Submit" type="submit" size="small" severity='success' text raised/>
                            
            </form>
        </div>
    )
}
        