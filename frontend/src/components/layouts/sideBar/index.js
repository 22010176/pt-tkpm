import { useState, useContext, useEffect, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/esm/AccordionButton';
import { AccordionContext, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWarehouse, faAngleRight, faRightFromBracket, faHandshakeSimple, faShieldHalved, faClipboardUser, faLaptop, faUnlockKeyhole, faCircleCheck, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.css'
import { navLinks } from '../../../utilities/navLinks';

function NavLinks({ className, icon, link, eventKey, title, links = [], onClick }) {
  const { activeEventKey } = useContext(AccordionContext);
  const [active, setActive] = useState(false)

  useEffect(function () {
    setActive(links.some(i => window.location.pathname.includes(i.href)))
  }, [links])


  function onUserClick() {
    if (typeof onClick == 'function') onClick(eventKey);
  }

  return (
    <Accordion.Item className={[className, 'bg-light'].join(" ")} eventKey={eventKey}>
      {/* header */}
      <div className={[styles.nav_header, "px-4 py-2"].join(" ")} onClick={useAccordionButton(eventKey, onUserClick)} >
        <FontAwesomeIcon className={active ? "text-danger" : ""} size='2xl' width={35} icon={icon} />

        {links.length
          ? <>
            <p className={[active && "text-danger", "fs-5 fw-semibold my-0"].join(" ")}>{title}</p>
            <FontAwesomeIcon className={[styles.arrow_icon].join()} icon={faAngleRight} rotation={activeEventKey !== eventKey ? 0 : 90} />
          </>
          : <a href={link} className="fs-5 text-decoration-none fw-semibold">{title}</a>}
      </div>

      {/* hidden nav-links */}
      {!!links.length && <Accordion.Collapse eventKey={eventKey} >
        <ul className='mx-4'>
          {links?.map(({ href, content, visible }, j) => visible && (
            <li key={j} className={["py-1"].join(" ")}>
              <a className={[window.location.pathname.includes(href) && 'text-danger', 'text-decoration-none'].join(" ")} href={href}>{content}</a>
            </li>
          ))}
        </ul>
      </Accordion.Collapse>}
    </Accordion.Item>
  );
}

export default function SideNavbar({ navItem = navLinks, account }) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(function () {
    const activeItem = navLinks.find(i => i.links.some(j => window.location.pathname.includes(j.href)))
    setActiveTab(activeItem?.eventKey)
  }, [])

  function onNavlinkClick(key) {
    setActiveTab(key === activeTab ? "" : key)
  }

  return (
    <div className={["bg-light h-100 user-select-none"].join(" ")}>
      {/* Tài khoản */}
      <div className={[styles.account_sec, "d-flex gap-3 align-items-center border-bottom p-3 m-0"].join(" ")}>
        <div className={[styles.avatar, "align-self-center d-grid"].join(" ")}>
          <Image className='bg-primary' src={account?.img || ""} roundedCircle />
          {/* <img className={[styles.avatar, "rounded-circle bg-primary"].join(" ")} src={account?.img || ""} alt='avartar' /> */}
        </div>
        <div className={[].join(" ")}>
          <p className={["fs-5 fw-bold m-0"].join(" ")}>{account?.name || "User"}</p>
          <p className={["fs-6 m-0"].join(" ")}>{account?.role || "Quản lý kho"}</p>
        </div>
      </div>

      {/* Trang chủ */}
      <div className={[styles.nav_container, "d-flex flex-column justify-content-between"].join(" ")}>
        {/* nav link */}
        <Accordion flush activeKey={activeTab}>
          {navItem.map((i, j) => <NavLinks {...i} key={j} onClick={onNavlinkClick} />)}
        </Accordion>

        {/* Đăng xuất */}
        <div className="border-top my-3">
          <NavLinks icon={faRightFromBracket} title={"Đăng xuất"} />
        </div>

      </div>
    </div>
  )
}