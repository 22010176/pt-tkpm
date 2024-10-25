import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'


// import { navLinks } from '../utilities/navLinks';
import {getPermissions, getUserData, UserContext} from '../api/authentication';

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
      {path: "/thong-ke", element: Page1}
    ]
  },
  QuanLyQuyenHan: {
    Xem: [
      {path: "/phan-quyen", element: PhanQuyen}
    ]
  }
}

function App() {
  const [token, setToken] = useState('')
  const [perm, setPerm] = useState([])
  const [user, setUser] = useState({})


  useEffect(function () {
    const token = sessionStorage.getItem("accountToken");


    if (!token && document.location.pathname !== "/dang-nhap")
      document.location.replace("/dang-nhap")

    setToken(token)
    getPermissions(token).then(data => setPerm(data))
    getUserData(token).then(data => setUser(data))
  }, [token])

  useEffect(() => {
    console.log(pagePerm, perm)
    console.log()
  }, [perm]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{token, perm, user}}>
        <Routes>
          <Route index element={<TrangChu/>}/>
          <Route path='/dang-suat' element={<DangSuat/>}/>
          <Route path='/dang-nhap' element={<DangNhap/>}/>
          {perm.map(({tenChucNang, tenHanhDong}) => pagePerm[tenChucNang]?.[tenHanhDong])
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
