import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faLaptop, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

import Page1 from '../../../components/layouts/Page1'
import SideNavbar from '../../../components/layouts/sideBar'

function TrangChu() {

  return (
    <Page1 sidebar={<SideNavbar />}>
      <div className='w-100 bg-primary-subtle h-100 pt-2 d-flex flex-wrap justify-content-center gap-2 align-items-center gap-5'>
        <div className='d-flex flex-wrap gap-4'>
          <h1 className='fs-1 fw-bold w-100  text-primary-emphasis text-center'>
            CHÀO MỪNG ĐẾN VỚI HỆ THỐNG<br /> QUẢN LÝ ĐIỆN THOẠI THÔNG MINH
          </h1>
          <h3 className='fst-italic text-center w-100'>
            Hệ thống hỗ trợ quản lý các sản phẩm điện thoại thông qua mã IMEI
            <br />
            một cách chính xác, dễ dàng và hiệu quả.
          </h3>
          <Button size='lg' variant='outline-dark' className='w-25 m-auto'>Xem hướng dẫn</Button>
        </div>

        <div className='h-25 border border-dark border-3 d-flex flex-column w-75'>
          <div className='bg-dark h-25 text-light lh-100 d-flex align-items-center px-3 fs-4 fw-bold'>QUICK GUIDE</div>
          <div className='bg-light h-75 d-flex p-2 justify-content-around gap-4 '>
            <div className='d-flex gap-4 align-items-center border border-dark border-3 p-2'>
              <FontAwesomeIcon size='2x' icon={faLaptop} />
              <a className='fs-6' href='/'>Hướng dẫn sử dụng tính năng quản lý sản phẩm</a>
            </div>

            <div className='d-flex gap-4 align-items-center border border-dark border-3 p-2'>
              <FontAwesomeIcon size='2x' icon={faWarehouse} />
              <a className='fs-6' href='/'>Hướng dẫn sử dụng tính năng quản lý nhập/xuất kho</a>
            </div>

            <div className='d-flex gap-4 align-items-center border border-dark border-3 p-2'>
              <FontAwesomeIcon size='2x' icon={faChartLine} />
              <a className='fs-6' href='/'>Hướng dẫn xem báo cáo thống kê</a>
            </div>
          </div>
        </div>

        <div className='w-100 h-25 align-self-end bg-primary d-flex gap-5 p-5 justify-content-around align-items-center'>
          <div className='fs-5 text-light fw-semibold'>
            <p className='m-0 p-0 lh-base' >
              Chính sách bảo mật
            </p>
          </div>
          <div className='fs-5 text-light fw-semibold'>
            <p className='m-0 p-0 lh-base'>
              Điều khoản sử dụng
            </p>
          </div>
          <div className='fs-5 text-light fw-semibold'>
            <p className='m-0 p-0 lh-base'>Liên hệ</p>
            <p className='m-0 p-0 lh-base'>SĐT: 0845.xxx.xxx</p>
            <p className='m-0 p-0 lh-base'>Email: dienthoai@gmail.com</p>
            <p className='m-0 p-0 lh-base'>Địa chỉ: Phường X, Quận Y, TP Z</p>
          </div>
        </div>
      </div>
    </Page1>
  )
}

export default TrangChu