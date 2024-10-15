import styles from './style.module.css'
import PageTemplateD from '../../components/layouts/pageD'
import SideNavbar from '../../components/layouts/sideBar'


function ErrorPage() {
  return (
    <PageTemplateD sidebar={<SideNavbar />}>
      <h1 className='m-3'>Lỗi</h1>
    </PageTemplateD>
  )
}

export default ErrorPage