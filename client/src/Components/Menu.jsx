import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
//import { useRouter } from 'next/router';


export default function Router() {
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-list-check',
            url: '/home'
        },
        {
            label: 'Todos',
            icon: 'pi pi-list-check',
            url: '/todos'
        },
        {
            label: 'Posts',
            icon: 'pi pi-palette',
            url: '/Posts'
        },
        {
            label: 'Users',
            icon: 'pi pi-users',
            url: '/Users'
        }
    ];

    return (
        <TabMenu model={items} />
    )
}
