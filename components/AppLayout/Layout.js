
import classNames from 'classnames';
import React, { useState } from 'react';
import { StickyNavbar } from './Navbar';
import { AppLayout } from './AppLayout';

// export const Layout = (props) => {
//   const [collapsed, setSidebarCollapsed] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(true);

//   return (
//     <div
      // className={classNames({
      //   'grid bg-zinc-100 min-h-screen': true,
      //   'grid-cols-sidebar': !collapsed,
      //   'grid-cols-sidebar-collapsed': collapsed,
      //   'transition-[grid-template-columns] duration-300 ease-in-out': true,
      // })}
//     >
//       <AppLayout
//         collapsed={collapsed}
//         setCollapsed={setSidebarCollapsed}
//         shown={showSidebar}
//         {...props} // Pass down all props from Layout to AppLayout
//       >
//         <div className="">
//           <StickyNavbar
//             onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
//           />
//           {props.children}
//         </div>
//       </AppLayout>
//     </div>
//   );
// };


export const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div>
      <AppLayout
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
        {...props} // Pass down all props from Layout to AppLayout
      >
        <div className="">
          <StickyNavbar
            onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
          />
          {props.children}
        </div>
      </AppLayout>
    </div>
  );
};
