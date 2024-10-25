import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// import { navLinks } from '../utilities/navLinks';
import { getPermissions, getUserData } from '../api/authentication';

import { UserContext } from '../api/authentication';

import TrangChu from "../pages/OtherPage/trangChu"
import NhanVien from "../pages/OtherPage/nhanVien"
import PhanQuyen from "../pages/OtherPage/phanQuyen"
import TaiKhoan from "../pages/OtherPage/TaiKhoanPage"

import SanPham from "../pages/SanPhamPage/sanPham"
import ThuocTinh from "../pages/SanPhamPage/thuocTinh"

import NhapKho from "../pages/XuatNhapPage/nhapKho"
import ThemNhapKho from "../pages/XuatNhapPage/themNhapKho"
import XuatKho from "../pages/XuatNhapPage/xuatKho"
import ThemXuatKho from "../pages/XuatNhapPage/themXuatKho"

import KhachHang from "../pages/DoiTacPage/khachHang"
import NhaCungCap from "../pages/DoiTacPage/nhaCungCap"

import DoiTraHang from "../pages/DichVuPage/doiTraHang"
import DangSuat from "../pages/OtherPage/dangSuat"
import QuanLyTaiKhoan from "../pages/OtherPage/qlTaiKhoang"
import DangNhap from "../pages/OtherPage/dangNhap"
import ErrorPage from './UtilitesPage/error';
import Page1 from '../components/layouts/Page1';


function App() {
  const [token, setToken] = useState()
  const [perm, setPerm] = useState([])
  const [user, setUser] = useState()
  const links = navLinks.map(({ link, Component, links }) => {
    if (links.length === 0) return Component && { path: link, element: <Component /> }
    return links.map(({ href, Component }) => Component && ({ path: href, element: <Component /> }))
  }).flat().filter(i => !!i)

  useEffect(function () {
    const token = sessionStorage.getItem("accountToken");


    if (!token && document.location.pathname !== "/dang-nhap")
      document.location.replace("/dang-nhap")

    setToken(token)
    getPermissions(token).then(data => setPerm(data))
    getUserData(token).then(data => setUser(data))
  }, [token])
  // console.log(token, perm, user)


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, perm, user }}>
        <Routes>
          <Route index element={<TrangChu />} />
          <Route path='/dang-suat' element={<DangSuat />} />
          <Route path='/dang-nhap' element={<DangNhap />} />

          <Route path='/tai-khoan-ca-nhan' element={<TaiKhoan />} />

          <Route path='/san-pham' element={<SanPham />} />
          <Route path='/thuoc-tinh' element={<ThuocTinh />} />

          <Route path='/nhap-kho' element={<NhapKho />} />
          <Route path='/nhap-kho/them' element={<ThemNhapKho />} />
          <Route path='/xuat-kho' element={<XuatKho />} />
          <Route path='/xuat-kho/them' element={<ThemXuatKho />} />

          <Route path='/khach-hang' element={<KhachHang />} />
          <Route path='/nha-cung-cap' element={<NhaCungCap />} />

          <Route path='/doi-tra-hang' element={<DoiTraHang />} />

          <Route path='/nhan-vien' element={<NhanVien />} />
          <Route path='/tai-khoan' element={<QuanLyTaiKhoan />} />
          <Route path='/thong-ke' element={<Page1 />} />
          <Route path='/tai-khoan' element={<QuanLyTaiKhoan />} />
          <Route path='/phan-quyen' element={<Page1 />} />



          {/* {links.map((i, j) => <Route key={j} {...i} />)} */}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const navLinks = [
  { title: "", hidden: true, eventKey: "QuanLyTaiKhoan", link: "/tai-khoan-ca-nhan", Component: TaiKhoan, links: [] },
  { title: "", hidden: true, eventKey: "dangSuat", link: "/dang-suat", Component: DangSuat, links: [] },
  { title: "", hidden: true, eventKey: "dangNhap", link: "/dang-nhap", Component: DangNhap, links: [] },
  { title: "Trang chủ", eventKey: "trangChu", link: "/", Component: TrangChu, links: [] },
  {
    title: "Sản phẩm", eventKey: "sanPham", links: [
      { content: "Sản phẩm", eventKey: "QuanLySanPham", href: "/san-pham", visible: true, Component: SanPham },
      { content: "Thuộc tính", eventKey: "QuanLyThuocTinh", href: "/thuoc-tinh", visible: true, Component: ThuocTinh }
    ]
  },
  {
    title: "Xuất nhập", eventKey: "xuatNhap", links: [
      { content: "Nhập kho", eventKey: "", href: "/nhap-kho", visible: true, Component: NhapKho },
      { content: "Nhập kho", eventKey: "", href: "/nhap-kho/them", visible: false, Component: ThemNhapKho },
      { content: "Xuất kho", eventKey: "", href: "/xuat-kho", visible: true, Component: XuatKho },
      { content: "Xuất kho", eventKey: "", href: "/xuat-kho/them", visible: false, Component: ThemXuatKho },
    ]
  },
  {
    title: "Đối tác", eventKey: "doiTac", links: [
      { content: "Khách hàng", eventKey: "", href: "/khach-hang", visible: true, Component: KhachHang },
      { content: "Nhà cung cấp", eventKey: "", href: "/nha-cung-cap", visible: true, Component: NhaCungCap }
    ]
  },
  {
    title: "Dịch vụ", eventKey: "dichVu", links: [
      { content: "Đổi trả hàng", eventKey: "", href: "/doi-tra-hang", visible: true, Component: DoiTraHang },
      // { content: "Bảo hành", eventKey: "", href: "/bao-hanh", visible: true }
    ]
  },
  { title: "Nhân viên", eventKey: "QuanLyNhanVien", link: "/nhan-vien", Component: NhanVien, links: [] },
  { title: "Tài khoản", eventKey: "QuanLyTaiKhoan", link: "/tai-khoan", Component: QuanLyTaiKhoan, links: [] },
  { title: "Thống kê", eventKey: "thongKe", link: "/thong-ke", links: [] },
  { title: "Phân quyền", eventKey: "QuanLyNhomQuyen", link: "/phan-quyen", Component: PhanQuyen, links: [] },
];




export default App;
