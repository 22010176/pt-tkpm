import LayoutA from '../layoutA';
import SideNavbar from '../../components/layouts/sideBar';

import styles from './style.module.css'

const PageTemplateB = function ({ children, navLinks, account }) {
  return (
    <LayoutA className="bg-primary-subtle">
      <LayoutA.Col className={"bg-dark"} style={{ width: "20%" }}>
        <SideNavbar navItem={navLinks} account={account} />
      </LayoutA.Col>

      <LayoutA.Col className={"bg-primary-subtle m-0 p-0 overflow-y-hidden"} style={{ width: "80%", height: "100%" }}>
        {children}
      </LayoutA.Col>
    </LayoutA>
  )
}




export default PageTemplateB;