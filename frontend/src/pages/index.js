import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrangChu from './trangChu';
import SanPhamA from './sanPham/sanPhamA';
import ThuocTinh from './thuocTinh';
import KhachHang from './khachHang';
import NhaCungCap from './nhaCungCap';
import ErrorPage from './error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TrangChu />} />
        <Route path='/san-pham' element={<SanPhamA />} />
        <Route path='/thuoc-tinh' element={<ThuocTinh />} />
        <Route path='/khach-hang' element={<KhachHang />} />
        <Route path='/nha-cung-cap' element={<NhaCungCap />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
