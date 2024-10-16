import { faCirclePlus, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../components/buttons/toolBtn'
import PageTemplateC from '../../components/layouts/pageC'
import SideNavbar from '../../components/layouts/sideBar'
import SearchForm2 from '../../components/Forms/searchForm2'
import TableA from '../../components/tables/tableA'

import styles from './style.module.css'

const doiTraHeader = [
  { key: "Mã phiếu đổi trả", value: "" },
  { key: "Mã khách hàng", value: "" },
  { key: "Tên khách hàng", value: "" },
  { key: "Số lượng đổi trả", value: "" },
  { key: "Ngày đổi trả", value: "" },
  { key: "Mã NV CSKH", value: "" },
  { key: "Tên NV", value: "" },
  { key: "Ghi chú", value: "" },
]

function DoiTraHang() {
  return (
    <PageTemplateC
      sidebar={<SideNavbar />}
      tools={<>
        <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" />
        <ToolBtn color="#e69138" icon={faPencil} title="Sửa" />
        <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
      </>}
      rightSec={<SearchForm2 />}
      dataTable={<TableA headers={doiTraHeader} />}
    />
  )
}

export default DoiTraHang