import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Form, FormControl, FormSelect } from 'react-bootstrap'

import TableA from '../../components/tables/tableA'
import PageTemplateC from '../../components/layouts/pageC'
import SideNavbar from '../../components/layouts/sideBar'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'

import styles from './style.module.css'
import SearchForm2 from '../../components/Forms/searchForm2'

const nhanVienHeader = [
  { key: "Mã NV", value: "" },
  { key: "Tên nhân viên", value: "" },
  { key: "Giới tính", value: "" },
  { key: "Ngày sinh", value: "" },
  { key: "Email", value: "" },
  { key: "Số điện thoại", value: "" },
  { key: "Vai trò", value: "" },
]

function NhanVien() {
  return (
    <PageTemplateC
      sidebar={<SideNavbar />}
      tools={<>
        <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" />
        <ToolBtn color="#e69138" icon={faPencil} title="Sửa" />
        <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
        <ToolBtn color="#009e0f" icon={faFileExport} title="Nhập Excel" />
        <ToolBtn color="#009e0f" icon={faFileExcel} title="Xuất Excel" />
      </>}
      rightSec={<SearchForm2 />}
      dataTable={<TableA headers={nhanVienHeader} />}
    />
  )
}

export default NhanVien