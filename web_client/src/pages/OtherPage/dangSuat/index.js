import {useEffect}       from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faRightToBracket
}                        from '@fortawesome/free-solid-svg-icons'

import colors from '../../../utilities/colors';

function DangSuat() {
  useEffect(function () {
    sessionStorage.removeItem("Authorization")
    setTimeout(function () {
      // document.location.replace("/dang-nhap")
    }, 5000)
  }, [])

  return (
    <div className='d-flex flex-column vw-100 vh-100 bg-light'>
      <div className='_bg-blue-1 px-5 py-3 text-light'>
        <h1>HỆ THỐNG QUẢN LÝ KHO HÀNG ĐIỆN THOẠI</h1>
      </div>
      <div className='d-flex h-100'>
        <div className='w-100 bg-light'></div>
        <div className='w-100 d-flex flex-column align-items-center justify-content-center gap-4'>
          <FontAwesomeIcon icon={faCircleCheck} color={colors.green} size='10x'/>
          <h1>Bạn đã đăng xuất thành công</h1>

          <div className='d-flex justify-content-center gap-4 align-items-center'>
            <FontAwesomeIcon icon={faRightToBracket} size='4x'/>
            <a className='fs-3' href='/dang-nhap'>Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  )
}


export default DangSuat;