import classNames from 'classnames';
import React, { useState } from 'react';
import { BurgerIcon } from './BurgerIcon';
import { Sidebar } from './Sidebar';

export const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
        {...props} // Pass down all props from Layout to Sidebar
      >
        <div className="absolute top-0 right-0 pr-4 pt-3 ">
          <BurgerIcon
            onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
          />
        </div>
        <div className="">{props.children}</div>
      </Sidebar>
    </div>
  );
};
