import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'


// import { navLinks } from '../utilities/navLinks';
import {getPermissions, getUserData, UserContext} from '../api/authentication';

import TrangChu from "../pages/OtherPage/trangChu"
import NhanVien from "./phanQuyenPage/nhanVien"
import PhanQuyen from "./phanQuyenPage/phanQuyen"
import TaiKhoan from "../pages/OtherPage/TaiKhoanPage"

import SanPham from "../pages/SanPhamPage/sanPham"
import ThuocTinh from "../pages/SanPhamPage/thuocTinh"

import NhapKho from "./DichVuPage/nhapKho"
import ThemNhapKho from "./DichVuPage/themNhapKho"
import XuatKho from "./DichVuPage/xuatKho"
import ThemXuatKho from "./DichVuPage/themXuatKho"

import KhachHang from "../pages/DoiTacPage/khachHang"
import NhaCungCap from "../pages/DoiTacPage/nhaCungCap"

import DoiTraHang from "../pages/DichVuPage/doiTraHang"
import DangSuat from "../pages/OtherPage/dangSuat"
import QuanLyTaiKhoan from "./phanQuyenPage/qlTaiKhoang"
import DangNhap from "../pages/OtherPage/dangNhap"
import ErrorPage from './UtilitesPage/error';
import ThongKe from "./thongKePage";


const pagePerm = {
  QuanLySanPham: {
    Xem: [
      {path: "/san-pham", element: SanPham}
    ],
  }
  ,
  QuanLyThuocTinh: {
    Xem: [{path: "/thuoc-tinh", element: ThuocTinh}]
  }
  ,
  QuanLyNhapKho: {
    Xem: [
      {path: "/nhap-kho", element: NhapKho},
      {path: "/nhap-kho/them", element: ThemNhapKho},
    ]
  },
  QuanLyXuatKho: {
    Xem: [
      {path: "/xuat-kho", element: XuatKho},
      {path: "/xuat-kho/them", element: ThemXuatKho}
    ]
  },
  QuanLyDoiTraHang: {
    Xem: [
      {path: "/doi-tra-hang", element: DoiTraHang},
    ]
  },
  QuanLyKhachHang: {
    Xem: [
      {path: "/khach-hang", element: KhachHang}
    ]
  },
  QuanLyNhaCungCap: {
    Xem: [{path: "/nha-cung-cap", element: NhaCungCap},]
  },
  QuanLyNhanVien: {
    Xem: [
      {path: "/nhan-vien", element: NhanVien}
    ]
  },
  QuanLyTaiKhoan: {
    XemCaNhan: [
      {path: "/tai-khoan-ca-nhan", element: TaiKhoan},
    ],
    Xem: [
      {path: "/tai-khoan-ca-nhan", element: TaiKhoan},
      {path: "/tai-khoan", element: QuanLyTaiKhoan},
    ]
  },
  ThongKe: {
    Xem: [
      {path: "/thong-ke", element: ThongKe}
    ]
  },
  QuanLyQuyenHan: {
    Xem: [
      {path: "/phan-quyen", element: PhanQuyen}
    ]
  }
}

function App() {
  const [auth, setAuth] = useState({token: "", perm: [], user: {}})
  // const [token, setToken] = useState('')
  // const [perm, setPerm] = useState([])
  // const [user, setUser] = useState({})


  useEffect(function () {
    const token = sessionStorage.getItem("accountToken");

    if (!token && document.location.pathname !== "/dang-nhap")
      document.location.replace("/dang-nhap")
    setAuth(src => ({...src, token}))
    // setToken(token)
    getPermissions(token).then(data => setAuth(src => ({...src, perm: data})))
    getUserData(token).then(data => setAuth(src => ({...src, user: data})))
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={auth}>
        <Routes>
          <Route index element={<TrangChu/>}/>
          <Route path='/dang-suat' element={<DangSuat/>}/>
          <Route path='/dang-nhap' element={<DangNhap/>}/>

          {auth.perm.map(({tenChucNang, tenHanhDong}) => pagePerm[tenChucNang]?.[tenHanhDong])
          .filter(i => !!i)
          .flat()
          .map(({path, element: Elem}, j) => (
            <Route key={j} path={path} element={<Elem/>}/>
          ))}

          {/*<Route path='/tai-khoan-ca-nhan' element={<TaiKhoan/>}/>*/}

          {/*<Route path='/san-pham' element={<SanPham/>}/>*/}
          {/*<Route path='/thuoc-tinh' element={<ThuocTinh/>}/>*/}

          {/*<Route path='/nhap-kho' element={<NhapKho/>}/>*/}
          {/*<Route path='/nhap-kho/them' element={<ThemNhapKho/>}/>*/}
          {/*<Route path='/xuat-kho' element={<XuatKho/>}/>*/}
          {/*<Route path='/xuat-kho/them' element={<ThemXuatKho/>}/>*/}

          {/*<Route path='/khach-hang' element={<KhachHang/>}/>*/}
          {/*<Route path='/nha-cung-cap' element={<NhaCungCap/>}/>*/}

          {/*<Route path='/doi-tra-hang' element={<DoiTraHang/>}/>*/}

          {/*<Route path='/nhan-vien' element={<NhanVien/>}/>*/}

          {/*<Route path='/thong-ke' element={<Page1/>}/>*/}
          {/*<Route path='/tai-khoan' element={<QuanLyTaiKhoan/>}/>*/}
          {/*<Route path='/phan-quyen' element={<PhanQuyen/>}/>*/}

          <Route path='/*' element={<ErrorPage/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
