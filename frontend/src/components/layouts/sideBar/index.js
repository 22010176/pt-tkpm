
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/esm/AccordionButton';
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWarehouse, faAngleRight, faRightFromBracket, faHandshakeSimple } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css'
import { useState } from 'react';

const navLinks = [
  { title: "Trang chủ", eventKey: "trangChu", link: "/", icon: faHouse, links: [] },
  {
    title: "Sản phẩm", eventKey: "sanPham", icon: faWarehouse, links: [
      { content: "Sản phẩm", href: "/san-pham" },
      { content: "Thuộc tính", href: "/thuoc-tinh" }
    ]
  },
  {
    title: "Đối tác", eventKey: "doiTac", icon: faHandshakeSimple, links: [
      { content: "Khách hàng", href: "/khach-hang" },
      { content: "Nhà cung cấp", href: "/nha-cung-cap" }
    ]
  },
]


function NavLinks({ icon, link, eventKey, title, links = [] }) {
  const [rotation, setRotation] = useState(0);
  const onClick = useAccordionButton(eventKey, setRotation.bind({}, rotation === 90 ? 0 : 90))

  return (
    <Accordion.Item className='bg-light'>
      <div className={[styles.nav_header, "collapsed px-4 py-2"].join(" ")} onClick={onClick}>
        <FontAwesomeIcon className={styles.nav_icon} icon={icon} />
        {links.length
          ? <>
            <p className="fs-5 fw-semibold my-0">{title}</p>
            <FontAwesomeIcon className={styles.arrow_icon} icon={faAngleRight} rotation={rotation} />
          </>
          : <a href={link} className="fs-5 text-decoration-none fw-semibold">{title}</a>}
      </div>
      {!!links.length && <Accordion.Collapse eventKey={eventKey}>
        <ul className='mx-3'>
          {links?.map(({ href, content }, j) => (
            <li className={["py-1"].join(" ")} key={j} >
              <a className='text-decoration-none' href={href}>{content}</a>
            </li>
          ))}
        </ul>
      </Accordion.Collapse>}
    </Accordion.Item>
  );
}

export default function SideNavbar({ navItem = navLinks, bottom = [], account }) {
  return (
    <div className={["bg-light p-0 h-100"].join(" ")}>
      {/* Tài khoản */}
      <div className={[styles.account_sec, "d-flex gap-3 align-items-center border-bottom px-2 m-0"].join(" ")}>
        <div className={[styles.avatar, "align-self-center"].join(" ")}>
          <img className={[styles.avatar, "rounded-circle"].join(" ")} src={account?.img || ""} alt='avartar' />
        </div>
        <div className={[].join(" ")}>
          <p className={["fs-6 fw-bold m-0"].join(" ")}>{account?.name || "User"}</p>
          <p className={["fs-6 m-0"].join(" ")}>{account?.role || "Quản lý kho"}</p>
        </div>
      </div>

      {/* Trang chủ */}
      <div className={[styles.nav_container, "d-flex flex-column justify-content-between"].join(" ")}>
        <Accordion defaultActiveKey="0" flush>
          {navItem.map((i, j) => <NavLinks {...i} key={j} />)}
        </Accordion>

        {/* Đăng xuất */}
        <div className="px-4 py-3 border-top d-flex flex-column gap-4">
          <div className={[styles.nav_header].join(" ")}>
            <FontAwesomeIcon className={styles.nav_icon} icon={faRightFromBracket} />
            <p className="fs-5 fw-semibold my-0 text-decoration-none">Đăng xuất</p>
          </div>
        </div>
      </div>
    </div>
  )
}