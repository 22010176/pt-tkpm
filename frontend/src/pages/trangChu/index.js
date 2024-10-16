import PageTemplateD from '../../components/layouts/pageD'
import SideNavbar from '../../components/layouts/sideBar'

function TrangChu() {

  return (
    <PageTemplateD sidebar={<SideNavbar />}>
      <h1 className='m-3'>Trang chu</h1>
    </PageTemplateD>
  )
}

export default TrangChu