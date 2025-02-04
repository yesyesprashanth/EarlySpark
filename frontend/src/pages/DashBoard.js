// import React from 'react';
// import { useData } from '../utils/DataContext';
// import { MaterialCard, ScreeningCard, UserCard } from '../components/Card';
// import './DashBoard.css';

// const Dashboard = () => {
//   const { userData } = useData();

//   return (
//     <div className="custom-dashboard">

//         <section className="custom-overview">
//           {userData.role?.toLowerCase() === 'nodal' && (
//             <div className="custom-navigation-buttons">
//               <MaterialCard />

//               <ScreeningCard /> 

//             </div>
//           )}

//           {userData.role?.toLowerCase() !== 'nodal' && (
//             <UserCard />
//           )}
//         </section>

//     </div>
//   );
// };

// export default Dashboard;


// src/components/Dashboard.js
import React from 'react';
import './DashBoard.css'
import { useData } from '../utils/DataContext';
import { MaterialCard, ScreeningCard, UserCard } from '../components/Card';


const Dashboard = () => {
  const { userData } = useData();
  return (
 
      <section className="custom-overview">
        {userData.role?.toLowerCase() === 'nodal' && (
          <div className="custom-navigation-buttons">
            <MaterialCard />

          </div>
        )}

        {userData.role?.toLowerCase() !== 'nodal' && (
          <UserCard />
        )}
      </section>

  );
};

export default Dashboard;
