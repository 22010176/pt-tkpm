import styles from './style.module.css'
import PageTemplateC from '../../components/layouts/pageC'
import SideNavbar from '../../components/layouts/sideBar'


function ErrorPage() {
  return (
    <PageTemplateC sidebar={<SideNavbar />} />
  )
}

export default ErrorPage