import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router';

function SideNav() {
    const router = useRouter();

    const isActive = (path) => router.pathname === path;
    return (
        <div className='sidenav'>
            <ul>
                <li className={isActive('/containers') ? 'active' : ''}><Link href='/containers'><i className="pi pi-database"></i>Containers</Link> </li>
                
                <li className={isActive('/devices') ? 'active' : ''}><Link href='/devices'><i className="pi pi-mobile"></i>Devices</Link></li>
                <li className={isActive('/location') ? 'active' : ''}><Link href='/location'> <i className="pi pi-map-marker"></i>Location</Link></li>
                <li className={isActive('/tags') ? 'active' : ''}><Link href='/tags'> <i className="pi pi-tags"></i>Tags</Link></li>
                <li className={isActive('/users') ? 'active' : ''}><Link href='/users'><i className="pi pi-user"></i>Users</Link></li>
            </ul>
        </div>
    )
}

export default SideNav