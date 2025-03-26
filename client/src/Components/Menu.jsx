import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';


export default function Menu() {
    const navigate = useNavigate()
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
                navigate('/');
            }
        },
        {
            label: 'Todos',
            icon: 'pi pi-list-check',
            command: () => {
                navigate('/todos');
            }
        },
        {
            label: 'Posts',
            icon: 'pi pi pi-book',
            command: () => {
                navigate('/posts');
            }
        },
        {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => {
                navigate('/users');
            }
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
