import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import Adduser from './AddUser';
import {BlockedUserContext} from './Contexts'



const Users = () => {
    const [usersList, setUsersList] = useState([])
    const [layout, setLayout] = useState('grid')
    const [blocked, setBlocked] = useState(false)
    

    useEffect(() => {
        getAllUsers()
    });

    const getAllUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8888/api/users')
            setUsersList(res.data)

        } catch (e) {
            console.error(e)
        }
    }


    const deleteUser = async (id) => {
        try {
            debugger
            const res = await axios.delete('http://localhost:8888/api/users', { id })
            getAllUsers()

        } catch (e) {
            console.error(e)
        }
    }

    const listItem = (user, index) => {
        return (
            <div className="col-12" key={user._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{user.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-user"></i>
                                    <span className="font-semibold">{user.username}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-trash" className="p-button-rounded" severity="danger" onClick={() => deleteUser(user._id)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (user) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={user._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-user"></i>
                            <span className="font-semibold">{user.username}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{user.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-trash" className="p-button-rounded" severity="danger" onClick={() => deleteUser(user._id)}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (user, layout, index) => {
        if (!user) {
            return;
        }

        if (layout === 'list') return listItem(user, index);
        else if (layout === 'grid') return gridItem(user);
    };

    const listTemplate = (users, layout) => {
        return <div className="grid grid-nogutter">{users.map((user, index) => itemTemplate(user, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div>
                <span className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </span>
                <span className="flex justify-content-start">
                    <Button icon='pi pi-user-plus' onClick={() => { setBlocked(!blocked) }}></Button>
                </span>

            </div>
        );
    };



    return (
        <BlockUI blocked={blocked} template={
            <BlockedUserContext.Provider value={setBlocked}>
                <Adduser />
            </BlockedUserContext.Provider>}>
            <div className="card">
                <DataView value={usersList} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
        </BlockUI>
    )
}
export default Users