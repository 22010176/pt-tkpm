import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrangChu from './trangChu';
import SanPham from './sanPham';
import ThuocTinh from './thuocTinh';
import KhachHang from './khachHang';
import NhaCungCap from './nhaCungCap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TrangChu />} />
        <Route path='/san-pham' element={<SanPham />} />
        <Route path='/thuoc-tinh' element={<ThuocTinh />} />
        <Route path='/khach-hang' element={<KhachHang />} />
        <Route path='/nha-cung-cap' element={<NhaCungCap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
