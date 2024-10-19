import {
  faHouse, faLaptop, faWarehouse, faHandshakeSimple, faShieldHalved, faClipboardUser, faCircleUser, faCircleCheck, faUnlockKeyhole
} from "@fortawesome/free-solid-svg-icons"

import TrangChu from "../pages/OtherPage/trangChu"
import NhanVien from "../pages/OtherPage/nhanVien"
import PhanQuyen from "../pages/OtherPage/phanQuyen"

import SanPham from "../pages/SanPhamPage/sanPham"
import ThuocTinh from "../pages/SanPhamPage/thuocTinh"

import NhapKho from "../pages/XuatNhapPage/nhapKho"
import ThemNhapKho from "../pages/XuatNhapPage/themNhapKho"
import XuatKho from "../pages/XuatNhapPage/xuatKho"
import ThemXuatKho from "../pages/XuatNhapPage/themXuatKho"

import KhachHang from "../pages/DoiTacPage/khachHang"
import NhaCungCap from "../pages/DoiTacPage/nhaCungCap"

import DoiTraHang from "../pages/DichVuPage/doiTraHang"

export const navLinks = [
  { title: "Trang chủ", eventKey: "trangChu", link: "/", icon: faHouse, Component: TrangChu, links: [] },
  {
    title: "Sản phẩm", eventKey: "sanPham", icon: faLaptop, links: [
      { content: "Sản phẩm", href: "/san-pham", visible: true, Component: SanPham },
      { content: "Thuộc tính", href: "/thuoc-tinh", visible: true, Component: ThuocTinh }
    ]
  },
  {
    title: "Xuất nhập", eventKey: "xuatNhap", icon: faWarehouse, links: [
      { content: "Nhập kho", href: "/nhap-kho", visible: true, Component: NhapKho },
      { content: "Nhập kho", href: "/nhap-kho/them", visible: false, Component: ThemNhapKho },
      { content: "Xuất kho", href: "/xuat-kho", visible: true, Component: XuatKho },
      { content: "Xuất kho", href: "/xuat-kho/them", visible: false, Component: ThemXuatKho },
    ]
  },
  {
    title: "Đối tác", eventKey: "doiTac", icon: faHandshakeSimple, links: [
      { content: "Khách hàng", href: "/khach-hang", visible: true, Component: KhachHang },
      { content: "Nhà cung cấp", href: "/nha-cung-cap", visible: true, Component: NhaCungCap }
    ]
  },
  {
    title: "Dịch vụ", eventKey: "dichVu", icon: faShieldHalved, links: [
      { content: "Đổi trả hàng", href: "/doi-tra-hang", visible: true, Component: DoiTraHang },
      { content: "Bảo hành", href: "/bao-hanh", visible: true }
    ]
  },
  { title: "Nhân viên", eventKey: "nhanVien", link: "/nhan-vien", icon: faClipboardUser, Component: NhanVien, links: [] },
  { title: "Tài khoản", eventKey: "taiKhoan", link: "/tai-khoan", icon: faCircleUser, links: [] },
  { title: "Thống kê", eventKey: "thongKe", link: "/thong-ke", icon: faCircleCheck, links: [] },
  { title: "Phân quyền", eventKey: "phanQuyen", link: "/phan-quyen", icon: faUnlockKeyhole, Component: PhanQuyen, links: [] },
];

