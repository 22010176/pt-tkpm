import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faFileExcel, faFileExport, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Form, FormControl, FormSelect, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputShadow from '../../../components/Forms/InputShadow'
import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'

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
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" />
        <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" />
        <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa" />
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExcel} title="Nhập Excel" />
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExport} title="Xuất Excel" />
      </>}
      rightSec={<FlexForm>
        <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm" />
        <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success' >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
        <Button className='d-flex gap-2 align-items-center' variant='primary'>
          <FontAwesomeIcon icon={faArrowRotateRight} />
          <span>Làm mới</span>
        </Button>
      </FlexForm>
      }
      dataTable={<TableA headers={nhanVienHeader} />}
    />
  )
}

export default NhanVien