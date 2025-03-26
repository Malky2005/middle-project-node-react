import { Card } from 'primereact/card';
import React, { useState } from 'react';
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const AddTodo = (props) => {
    const { setBlocked } = props
    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const defaultValues = {
        title: '',
        tags: ''
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8888/api/todos', data)
            setShowMessage(true)

        } catch (e) {
            console.error(e)
            console.error(e)
            if (e.status == 409)
                setShowError(true)
        }
    };
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const dialogErrorFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowError(false)
    }} /></div>;

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowMessage(false)
        setBlocked(false)
    }} /></div>;
    return(
        <>
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Add Todo Successful!</h5>
                </div>
            </Dialog>
            <Dialog visible={showError} onHide={() => setShowError(false)} position="top" footer={dialogErrorFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-exclamation-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>title exists!!</h5>
                </div>
            </Dialog>
            <Card title="New post">
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="card" >
                            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>Title*</label>
                                    </span>
                                    {getFormErrorMessage('title')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="tags" control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="tags" className={classNames({ 'p-error': errors.tags })}>tags</label>
                                    </span>
                                    {getFormErrorMessage('tags')}
                                </div>

                                <Button type="submit" label="Submit" className="mt-2" />

                                <Button label="cancel" className="mt-2" onClick={() => setBlocked(false)} style={{ background: 'gray' }} />
                            </form>
                        </div>
                    </div>

                </div>
            </Card>
        </>
    )
}
export default AddTodo