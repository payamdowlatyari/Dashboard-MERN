
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment } from '../../../api';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from 'primereact/message';
import {
    addCommentStart,
    addCommentSuccess,
    addCommentFailure
} from '../../../redux/reducers/projectSlice';

export default function NewComment({projectId}) {

    const toast = useRef(null);
    const defaultValues = { comment: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;

    const { loading, error } = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Comment Submitted', detail: form.getValues('comment') });
    };

    const onSubmit = async (data) => {
        data.comment && show();

        try {
            dispatch(addCommentStart())
            const res = await addNewComment(projectId, data);
            if (res.status === 200) {
              dispatch(addCommentSuccess())  
              return;
            }
          } catch (error) {
            dispatch(addCommentFailure(error))
          }
        form.reset();
    };
  
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-2 w-auto">
                <Toast ref={toast} />
                <Controller
                    name="comment"
                    control={form.control}
                    rules={{ required: 'Comment is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <InputTextarea id={field.name} {...field} rows={2} cols={30} 
                            className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                    <Button 
                    disabled={loading}
                    label={loading ? 'Loading...' : 'Submit'} 
                    severity='success'
                    type="submit" 
                    size="small" 
                    className='min-w-max'
                    icon="pi pi-check"
                    />
                            
            </form>
            {error ? <Message severity="error" text={error.message}/> || 
                <Message severity="error" text="Something went wrong!"/> : ''}
        </div>
    )
}
        