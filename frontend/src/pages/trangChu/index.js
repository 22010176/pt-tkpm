import SideNavbar from '../../components/layouts/sideBar'

import styles from './style.module.css'

function TrangChu() {
  return (
    <main className={["container-fluid vw-100 vh-100 p-0 bg-primary-subtle"].join(" ")}>
      <div className='row h-100 w-100'>
        <div className='col-auto' style={{ width: "25%" }}>
          <SideNavbar />
        </div>

        <div className='col-auto'>

        </div>
      </div>
    </main>
  )
}

export default TrangChu