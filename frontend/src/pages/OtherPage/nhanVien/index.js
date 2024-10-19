import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Form, FormControl, FormSelect } from 'react-bootstrap'

import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import IconBtn from '../../../components/buttons/iconBtn'
import SearchForm2 from '../../../components/Forms/searchForm2'
import FlexForm from '../../../components/Forms/FlexForm'

import styles from './style.module.css'

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
    <Page2
      sidebar={<SideNavbar />}
      tools={<>
        <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" />
        <ToolBtn color="#e69138" icon={faPencil} title="Sửa" />
        <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
        <ToolBtn color="#009e0f" icon={faFileExport} title="Nhập Excel" />
        <ToolBtn color="#009e0f" icon={faFileExcel} title="Xuất Excel" />
      </>}
      rightSec={<FlexForm>
        <FormSelect className='w-auto'>
          <option>test1</option>
          <option>test2</option>
          <option>test3</option>
          <option>test4</option>
        </FormSelect>
        <FormControl className='w-auto d-block' type='text' placeholder='Tìm kiếm' />
        <IconBtn className="w-auto btn-success" icon={faArrowRotateRight} title={"Làm mới"} />
      </FlexForm>
      }
      dataTable={<TableA headers={nhanVienHeader} />}
    />
  )
}

export default NhanVien