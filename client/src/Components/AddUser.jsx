import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useContext, useRef } from 'react';
import axios from 'axios'
import { BlockedUserContext } from "./Contexts";

const Adduser = () => {
    const name = useRef('')
    const username = useRef('')
    const phone = useRef('')
    const email = useRef('')

    const setBlocked = useContext(BlockedUserContext)

    const add = async()=>{
        const user ={
            name:name.current.value,
            username:username.current.value,
            phone:phone.current.value,
            email:email.current.value
        }
        try {
            const res = await axios.post('http://localhost:8888/api/users',user)
            

        } catch (e) {
            console.error(e)
        }
        setBlocked(false)
    }
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" onClick={add}/>
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} onClick={()=>{setBlocked(false)}} />
        </>
    );

    return (
        <Card title="Create User" footer={footer} className="md:w-25rem">
            <div class="flex-row">
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="name" ref={name}/>
            </div>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Username" ref={username}/>
            </div>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="phone" ref={phone}/>
            </div>
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="email" ref={email}/>
            </div>
            </div>
        </Card>
    )
}

export default Adduser