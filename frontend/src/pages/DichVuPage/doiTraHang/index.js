import { faCirclePlus, faPencil, faTrashCan, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import SearchForm2 from '../../../components/Forms/searchForm2'
import TableA from '../../../components/tables/tableA'

import styles from './style.module.css'
import colors from '../../../utilities/colors'

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
    <Page2
      sidebar={<SideNavbar />}
      tools={<>
        <ToolBtn color={colors.green} icon={faCirclePlus} title="Thêm" />
        <ToolBtn color={colors.orange} icon={faPencil} title="Sửa" />
        <ToolBtn color={colors.yellow_2} icon={faTrashCan} title="Xóa" />
        <ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" />
      </>}
      rightSec={<SearchForm2 />}
      dataTable={<TableA headers={doiTraHeader} />}
    />
  )
}

export default DoiTraHang