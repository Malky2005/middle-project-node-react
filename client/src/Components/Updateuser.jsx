import { Card } from 'primereact/card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';

const Updateuser = (props) => {
    const { setBlocked } = props
    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);

    const { currentUser } = props
    const defaultValues = {
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phone,
        street: currentUser.address ? currentUser.address.street : '',
        city: currentUser.address ? currentUser.address.city : '',
        building: currentUser.address ? currentUser.address.building : ''

    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues })
    const onSubmit = async (data) => {
        try {
            data._id = currentUser._id
            const res = await axios.put('http://localhost:8888/api/users', data);

            setShowMessage(true)

        } catch (e) {
            console.error(e);
        }
        reset();
    };
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowMessage(false)
        setBlocked(false)
    }} /></div>;
    const dialogErrorFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {
        setShowError(false)
    }} /></div>;
    return (
        <>
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Updated {currentUser.name} Successful!</h5>
                </div>
            </Dialog>
            <Dialog visible={showError} onHide={() => setShowError(false)} position="top" footer={dialogErrorFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-exclamation-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>user name exists!!</h5>
                </div>
            </Dialog>
            <Card title="Update user">
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="card">
                            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="username" control={control} rules={{ required: 'username is required.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>username*</label>
                                    </span>
                                    {getFormErrorMessage('username')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <Controller name="email" control={control}
                                            rules={{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />

                                        <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email</label>
                                    </span>
                                    {getFormErrorMessage('email')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="phone" control={control}
                                            rules={{ pattern: { value: /^\d{9,10}$/, message: 'Invalid phone number. It must be 9 or 10 digits long and contain only numbers.' } }}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        <label htmlFor="phone" className={classNames({ 'p-error': errors.phone })}>phone</label>
                                    </span>
                                    {getFormErrorMessage('phone')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="city" control={control}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        <label htmlFor="city" className={classNames({ 'p-error': errors.city })}>city</label>
                                    </span>
                                    {getFormErrorMessage('city')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="street" control={control}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        <label htmlFor="street" className={classNames({ 'p-error': errors.street })}>street</label>
                                    </span>
                                    {getFormErrorMessage('street')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Controller name="building" control={control}
                                            rules={{
                                                pattern: {
                                                    value: /^[0-9]+$/, // Regex to ensure only numbers
                                                    message: 'Invalid building number. It must consist of only numbers.'
                                                }
                                            }}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                        <label htmlFor="building" className={classNames({ 'p-error': errors.building })}>building number</label>
                                    </span>
                                    {getFormErrorMessage('building')}
                                </div>

                                <Button type="submit" label="Submit" className="mt-2" />

                                <Button label="cancel" className="mt-2" onClick={() => setBlocked(false)} style={{ background: 'gray' }} />
                            </form>
                        </div>
                    </div>

                </div>
            </Card>
        </>
    );
};
export default Updateuser;
