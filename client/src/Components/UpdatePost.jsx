import { Card } from 'primereact/card';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';

const AddPost = (props)=>{
  { setBlocked,currentPost } = props
  const [showMessage, setShowMessage] = useState(false);
  const defaultValues = {
      title: currentPost.title,
      body: currentPost.body
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
  const onSubmit = async (data) => {
      try {
          data._id = currentPost._id
          const res = await axios.put('http://localhost:8888/api/posts', data)
          setShowMessage(true)
  
      } catch (e) {
          console.error(e)
      }
      reset();
  };
  const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowMessage(false)
        setBlocked(false)
    }} /></div>;
  return(
      <>
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>update post {currentPost.title } Successful!</h5>
                </div>
            </Dialog>
        <Card title="Update Post">
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
                                        <Controller name="body" control={control} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="body" className={classNames({ 'p-error': errors.body })}>body</label>
                                    </span>
                                    {getFormErrorMessage('body')}
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


export default AddPost
