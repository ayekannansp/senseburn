import Link from 'next/link'
import React from 'react'

function SideNav() {
    return (
        <div className='sidenav'>
            <ul>
                <li><Link href=''><i className="pi pi-database"></i>Containers</Link> </li>
                <li><Link href=''><i className="pi pi-chart-line"></i>Data <br />Analysis</Link></li>
                <li>
                    <Link href=''>
                        <i className="pi pi-mobile"></i>
                        Devices
                    </Link>
                </li>
                <li><Link href=''> <i className="pi pi-map-marker"></i>Location</Link></li>
                <li><Link href=''> <i className="pi pi-tags"></i>Tags</Link></li>
                <li><Link href=''><i className="pi pi-user"></i>Users</Link></li>
            </ul>
        </div>
    )
}

export default SideNav