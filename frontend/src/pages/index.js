import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrangChu from './trangChu';
import ThuocTinh from './thuocTinh';
import KhachHang from './khachHang';
import NhaCungCap from './nhaCungCap';
import ErrorPage from './error';
import SanPhamB from './sanPham/sanPhamB';
import NhapKho from './nhapKho';
import XuatKho from './xuatKho';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TrangChu />} />
        <Route path='/san-pham' element={<SanPhamB />} />
        <Route path='/thuoc-tinh' element={<ThuocTinh />} />
        <Route path='/nhap-kho' element={<NhapKho />} />
        <Route path='/xuat-kho' element={<XuatKho />} />
        <Route path='/khach-hang' element={<KhachHang />} />
        <Route path='/nha-cung-cap' element={<NhaCungCap />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
