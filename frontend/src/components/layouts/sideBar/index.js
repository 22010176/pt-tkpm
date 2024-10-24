import { useState, useContext, useEffect, useRef } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/esm/AccordionButton';
import { AccordionContext, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faLaptop, faWarehouse, faHandshakeSimple, faShieldHalved, faClipboardUser, faAngleRight, faRightFromBracket, faCircleUser, faCircleCheck, faUnlockKeyhole
} from "@fortawesome/free-solid-svg-icons"
// import { navLinks } from '../../../utilities/navLinks';
import { UserContext } from '../../../api/authentication';
import styles from './style.module.css'


const navLinks = [
  { title: "Trang chủ", eventKey: "trangChu", link: "/", icon: faHouse, links: [] },
  {
    title: "Sản phẩm", eventKey: "sanPham", icon: faLaptop, links: [
      { content: "Sản phẩm", eventKey: "QuanLySanPham", href: "/san-pham", visible: true, },
      { content: "Thuộc tính", eventKey: "QuanLyThuocTinh", href: "/thuoc-tinh", visible: true, }
    ]
  },
  {
    title: "Xuất nhập", eventKey: "xuatNhap", icon: faWarehouse, links: [
      { content: "Nhập kho", eventKey: "", href: "/nhap-kho", visible: true, },
      { content: "Nhập kho", eventKey: "", href: "/nhap-kho/them", visible: false, },
      { content: "Xuất kho", eventKey: "", href: "/xuat-kho", visible: true, },
      { content: "Xuất kho", eventKey: "", href: "/xuat-kho/them", visible: false, },
    ]
  },
  {
    title: "Đối tác", eventKey: "doiTac", icon: faHandshakeSimple, links: [
      { content: "Khách hàng", eventKey: "", href: "/khach-hang", visible: true, },
      { content: "Nhà cung cấp", eventKey: "", href: "/nha-cung-cap", visible: true, }
    ]
  },
  {
    title: "Dịch vụ", eventKey: "dichVu", icon: faShieldHalved, links: [
      { content: "Đổi trả hàng", eventKey: "", href: "/doi-tra-hang", visible: true, },
      { content: "Bảo hành", eventKey: "", href: "/bao-hanh", visible: true }
    ]
  },
  { title: "Nhân viên", eventKey: "QuanLyNhanVien", link: "/nhan-vien", icon: faClipboardUser, links: [] },
  { title: "Tài khoản", eventKey: "QuanLyTaiKhoan", link: "/tai-khoan", icon: faCircleUser, links: [] },
  { title: "Thống kê", eventKey: "thongKe", link: "/thong-ke", icon: faCircleCheck, links: [] },
  { title: "Phân quyền", eventKey: "QuanLyNhomQuyen", link: "/phan-quyen", icon: faUnlockKeyhole, links: [] },
];



function NavLinks({ className, icon, link, eventKey, title, links = [], onClick, perm }) {
  const { activeEventKey } = useContext(AccordionContext);
  const [active, setActive] = useState(false)

  useEffect(function () {
    setActive(links.some(i => window.location.pathname.includes(i.href)) || window.location.pathname === link)
  }, [links, link])

  console.log(perm)
  function onUserClick() {
    if (typeof onClick == 'function') onClick(eventKey);
  }
  const clsName = active && "_bg-yellow-0"
  return (
    <Accordion.Item className={[className, 'bg-light'].join(" ")} eventKey={eventKey}>
      {/* header */}
      <div className={[clsName, styles.nav_header, "px-4 py-2"].join(" ")} onClick={useAccordionButton(eventKey, onUserClick)} >
        <FontAwesomeIcon size='2xl' width={35} icon={icon} />

        {links.length
          ? <>
            <p className={["fs-5 fw-semibold my-0"].join(" ")}>{title}</p>
            <FontAwesomeIcon className={[styles.arrow_icon].join()} icon={faAngleRight} rotation={activeEventKey !== eventKey ? 0 : 90} />
          </>
          : <a href={link} className={["fs-5 text-decoration-none fw-semibold text-dark"].join(" ")}>{title}</a>}
      </div>

      {!!links.length && <Accordion.Collapse eventKey={eventKey}>
        <div className='position-relative my-1'>
          <div className={[styles.leftBar, "position-absolute rounded-5"].join(" ")}></div>
          {links?.map(({ href, content, visible }, j) => visible && (
            <div key={j} className={["py-1 position-relative"].join(" ")}>
              <div className={[styles.heading, "position-absolute rounded-5", window.location.pathname.includes(href) ? '_bg-yellow-2' : "bg-dark"].join(" ")}></div>
              <a className={[styles.links, window.location.pathname.includes(href) ? '_text-yellow-2' : "text-dark", 'text-decoration-none fs-5'].join(" ")} href={href}>{content}</a>
            </div>
          ))}
        </div>
      </Accordion.Collapse>}
    </Accordion.Item >
  );
}

export default function SideNavbar({ navItem = navLinks }) {
  const { token, perm, user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState("");
  console.log(perm)
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
        <a href='/tai-khoan-ca-nhan' className={[styles.avatar, "align-self-center d-grid"].join(" ")}>
          <Image className='bg-primary' src={""} roundedCircle />
        </a>
        <a href='/tai-khoan-ca-nhan' className={["text-decoration-none text-dark"].join(" ")}>
          <p className={["fs-5 fw-bold m-0"].join(" ")}>{user?.hoTen || "User"}</p>
          <p className={["fs-6 m-0"].join(" ")}>{user?.tenNhomQuyen || "Quản lý kho"}</p>
        </a>
      </div>

      {/* Trang chủ */}
      <div className={[styles.nav_container, "d-flex flex-column justify-content-between"].join(" ")}>
        {/* nav link */}
        <Accordion flush activeKey={activeTab}>
          {navItem.filter(i => !i.hidden).map((i, j) => <NavLinks {...i} key={j} onClick={onNavlinkClick} perm={perm.find(j => {
            // const a = j.tenChucNang === i.eventKey && j.tenChucNang === "xem"
            // console.log(i.links.map(i => i.eventKey).concat(i.eventKey), j.tenChucNang)
            // console.log(i.links?.map(i => i.eventKey).includes(j.tenChucNang) && j.tenHanhDong === 'Xem')
            return (i.links.map(i => i.eventKey).includes(j.tenChucNang) || j.tenChucNang === i.eventKey) && j.tenHanhDong === 'Xem'
            // console.log({ i, j })
            // return false
          })} />)}
        </Accordion>

        {/* Đăng xuất */}
        <div className="border-top ">
          <NavLinks icon={faRightFromBracket} title={"Đăng xuất"} link="/dang-suat" />
        </div>
      </div>
    </div>
  )
}