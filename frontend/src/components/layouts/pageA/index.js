import { forwardRef, useEffect } from 'react';


import LayoutA from '../layoutA';
import TableA from '../../tables/tableA';
import SideNavbar from '../sideBar';

import styles from './style.module.css'

const PageTemplateA = function ({ children, navLinks, account }) {
  useEffect(function () {
    document.body.addEventListener("click", TableA.clearSelect)
  }, [])
  return (
    <LayoutA className="bg-primary-subtle">
      <LayoutA.Col className={"bg-dark"} style={{ width: "20%" }}>
        <SideNavbar navItem={navLinks} account={account} />
      </LayoutA.Col>

      <LayoutA.Col className={"bg-primary-subtle m-0 p-0 overflow-y-hidden"} style={{ width: "80%", height: "100%" }}>
        <div className='container-fluid h-100 w-100'>
          {children}
        </div>
      </LayoutA.Col>
    </LayoutA>
  )
}

PageTemplateA.Toolbar = function ({ children, className }) {
  return (
    <div className='row p-2' style={{ height: "15%" }}>
      <div className={[className, 'border border-primary-subtle border-3 bg-light rounded-3'].join(" ")}>
        {children}
      </div>
    </div>
  )
}


PageTemplateA.Table = function ({ children, className }) {
  return (
    <div className='row p-2' style={{ height: "85%" }}>
      <div className={[className, 'overflow-y-auto border border-primary-subtle border-3 bg-light rounded-3 p-0 h-100'].join(" ")} >
        {children}
      </div>
    </div>
  )
}


export default PageTemplateA;