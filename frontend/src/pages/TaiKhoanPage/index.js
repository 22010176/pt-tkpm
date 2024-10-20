import Page1 from '../../components/layouts/Page1'
import SideNavbar from '../../components/layouts/sideBar'

import styles from './style.module.css'

function TaiKhoan() {
  return (
    <Page1 sidebar={<SideNavbar />}>
      <div className='w-100 h-100 _bg-blue-0'>
        <h1>
          Tài khoản
        </h1>
      </div>
    </Page1>
  )
}

export default TaiKhoan