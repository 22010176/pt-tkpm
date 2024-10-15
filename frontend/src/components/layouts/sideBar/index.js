import { useState, useContext, useEffect, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/esm/AccordionButton';
import { Card, ContextAwareToggle } from 'react-bootstrap';
import { AccordionContext, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWarehouse, faAngleRight, faRightFromBracket, faHandshakeSimple, faShieldHalved, faClipboardUser, faLaptop, faUnlockKeyhole, faCircleCheck, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import styles from './style.module.css'

const navLinks = [
  { title: "Trang chủ", eventKey: "trangChu", link: "/", icon: faHouse, links: [] },
  {
    title: "Sản phẩm", eventKey: "sanPham", icon: faLaptop, links: [
      { content: "Sản phẩm", href: "/san-pham" },
      { content: "Thuộc tính", href: "/thuoc-tinh" }
    ]
  },
  {
    title: "Xuất nhập", eventKey: "xuatNhap", icon: faWarehouse, links: [
      { content: "Nhập kho", href: "/nhap-kho" },
      { content: "Xuất kho", href: "/xuat-kho" }
    ]
  },
  {
    title: "Đối tác", eventKey: "doiTac", icon: faHandshakeSimple, links: [
      { content: "Khách hàng", href: "/khach-hang" },
      { content: "Nhà cung cấp", href: "/nha-cung-cap" }
    ]
  },
  {
    title: "Dịch vụ", eventKey: "dichVu", icon: faShieldHalved, links: [
      { content: "Đổi hàng", href: "/doi-hang" },
      { content: "Trả hàng", href: "/tra-hang" },
      { content: "Bảo hành", href: "/bao-hanh" }
    ]
  },
  { title: "Nhân viên", eventKey: "nhanVien", link: "/nhan-vien", icon: faClipboardUser, links: [] },
  { title: "Tài khoản", eventKey: "taiKhoan", link: "/tai-khoan", icon: faCircleUser, links: [] },
  { title: "Thống kê", eventKey: "thongKe", link: "/thong-ke", icon: faCircleCheck, links: [] },
  { title: "Phân quyền", eventKey: "phanQuyen", link: "/phan-quyen", icon: faUnlockKeyhole, links: [] },
]

function NavLinks({ className, icon, link, eventKey, title, links = [], onClick }) {
  const { activeEventKey } = useContext(AccordionContext);
  const [active, setActive] = useState(false)

  useEffect(function () {
    setActive(links.some(i => i.href === window.location.pathname))
  }, [])


  function onUserClick() {
    if (typeof onClick == 'function') onClick(eventKey);
  }

  return (
    <Accordion.Item className={[className, 'bg-light'].join(" ")} eventKey={eventKey}>
      {/* header */}
      <div className={[styles.nav_header, "px-4 py-2"].join(" ")} onClick={useAccordionButton(eventKey, onUserClick)} >
        <FontAwesomeIcon size='2xl' width={35} icon={icon} />

        {links.length
          ? <>
            <p className={[active && "text-danger", "fs-5 fw-semibold my-0"].join(" ")}>{title}</p>
            <FontAwesomeIcon className={styles.arrow_icon} icon={faAngleRight} rotation={activeEventKey !== eventKey ? 0 : 90} />
          </>
          : <a href={link} className="fs-5 text-decoration-none fw-semibold">{title}</a>}
      </div>

      {/* hidden nav-links */}
      {!!links.length && <Accordion.Collapse eventKey={eventKey} >
        <ul className='mx-4'>
          {links?.map(({ href, content }, j) => (
            <li className={["py-1"].join(" ")} key={j} >
              <a className={[href === window.location.pathname && 'text-danger', 'text-decoration-none'].join(" ")} href={href}>{content}</a>
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
    switch (window.location.pathname) {
      case "/san-pham":
      case "/thuoc-tinh":
        setActiveTab("sanPham")
        break;
      case "/nhap-kho":
      case "/xuat-kho":
        setActiveTab("xuatNhap")
        break;
      case "/khach-hang":
      case "/nha-cung-cap":
        setActiveTab("doiTac")
        break;
      case "/doi-hang":
      case "/tra-hang":
      case "/bao-hanh":
        setActiveTab("dichVu")
        break;
      default:
        setActiveTab("trangChu")
    }
  }, [])

  function onNavlinkClick(key) {
    setActiveTab(key === activeTab ? "" : key)
  }

  return (
    <div className={["bg-light h-100"].join(" ")}>
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