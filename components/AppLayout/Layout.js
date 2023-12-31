import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import { BurgerIcon } from './BurgerIcon';
import { Sidebar } from './Sidebar';

export const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed: setSidebarCollapsed }}
    >
      <div>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setSidebarCollapsed}
          shown={showSidebar}
          {...props} // Pass down all props from Layout to Sidebar
        >
          <div className="fixed z-40 top-0 right-0 pr-4 pt-4 ">
            <BurgerIcon
              onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
            />
          </div>
          <div className="">{props.children}</div>
        </Sidebar>
      </div>
    </SidebarContext.Provider>
  );
};