import React from 'react';

import {
  IconLayoutDashboardFilled,
  IconBook,
  IconUsers,
  IconCalendarCheck,
  IconClipboardList,
  IconFileText,
  IconDatabase,
  IconUpload,
  IconChartBar,
  IconUser,
  IconContract
} from "@tabler/icons-react";
import { Avatar, Text} from '@mantine/core';
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", url: "/dashboard", icon: <IconLayoutDashboardFilled stroke={1.5} /> },

  { name: "My Courses", url: "/courses", icon: <IconBook stroke={1.5} /> },

  { name: "My Students", url: "/students", icon: <IconUsers stroke={1.5} /> },

  { name: "Mark Attendance", url: "/attendance", icon: <IconCalendarCheck stroke={1.5} /> },

  { name: "Assignments", url: "/assignments", icon: <IconClipboardList stroke={1.5} /> },

  { name: "Create Quiz", url: "/quiz", icon: <IconFileText stroke={1.5} /> },

  { name: "Question Bank", url: "/question-bank", icon: <IconDatabase stroke={1.5} /> },

  { name: "Upload Materials", url: "/materials", icon: <IconUpload stroke={1.5} /> },

  { name: "Reports", url: "/reports", icon: <IconChartBar stroke={1.5} /> },

  { name: "Announcements", url: "/announcements", icon: <IconContract stroke={1.5} /> },

  { name: "Profile", url: "/profile", icon: <IconUser stroke={1.5} /> },
];

const Sidebart = () => {
  return ( 
    <div className='flex'>
      <div className='w-64'>

      </div>
    <div className='w-64 fixed bg-dark hidden-scroll flex flex-col items-center gap-10 h-screen overflow-y-auto'>
        <div className='fixed z-[500] bg-dark text-primary-400 flex gap-1 items-center py-3'>
            <span className='font-heading font-semibold text-2xl'>Campus Sphere</span>
        </div>
       
        <div className='flex flex-col gap-5 mt-20'>
        <div  className='flex flex-col gap-1 items-center'>
            <div className='p-1 bg-white rounded-full shadow-xl'>
               <Avatar variant='filled' src="srms.png" size='xl' alt="it's me" />
            </div>
            <span className='font-medium text-light'>XYZ</span>
         <Text c="dimmed" size='xs'>Admin</Text>
        </div>
       
        <div className="flex flex-col gap-1">
            {links.map((link) => {
              return (
                <NavLink
                  to={link.url}
                  key={link.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full font-medium text-light px-5 py-4 rounded-lg
                     ${isActive ? "bg-primary-400 text-dark" : "hover:bg-gray-100 hover:text-dark"}`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
        </div>

    </div>
    </div>
    </div>
  )
}

export default Sidebart