
import React from 'react';
import './DashBoard.css';
import { useData } from '../utils/DataContext';

import BlueCard from '../components/card/BlueCard';
import ScreeningCard from '../components/card/ScreeningCard';
import ClinicianCard from '../components/card/ClinicianCard';
import CenterCard from '../components/card/CenterCard';
import NodeCard from '../components/card/NodeCard';
import ExaminerCard from '../components/card/ExaminerCard';
import ClientCard from '../components/card/ClientCard';

const Dashboard = () => {
  const { userData } = useData();

  return (
    <section className="custom-overview">
      {/* Display BlueCard and ScreeningCard for Nodal users */}
      {userData.role?.toLowerCase() === 'nodal' && (
        <div className="custom-navigation-buttons">
          <BlueCard />
          <ScreeningCard />
        </div>
      )}

      {/* Display InstituteCard when logged in as Institute */}
      {userData.role?.toLowerCase() === 'institute' && (
        <div className='custom-navigation-buttons'>
     <CenterCard/>
     <NodeCard/>
        </div>
      )}

   {/* Display SchoolListCard when logged in as School */}
   {userData.role?.toLowerCase() === 'school' && (
        <div className='custom-navigation-buttons'>
    <ExaminerCard/>
        </div>
      )}
       {userData.role?.toLowerCase() === 'teacher' && (
        <div className='custom-navigation-buttons'>
    <ClientCard/>
        </div>
      )}
         {userData.role?.toLowerCase() === 'clinician' && (
        <div className='custom-navigation-buttons'>
   <ClinicianCard/>
        </div>
      )}
      {/* Display UserCard for other roles (excluding Nodal and Institute) */}
      {/* {userData.role?.toLowerCase() !== 'nodal' && userData.role?.toLowerCase() !== 'institute' && (
        <UserCard />
      )} */}
    </section>
  );
};

export default Dashboard;

