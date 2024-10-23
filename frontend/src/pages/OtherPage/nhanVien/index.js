import { createContext, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faFileExcel, faFileExport, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Form, FormControl, FormSelect, Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InputShadow from '../../../components/Forms/InputShadow'
import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'

import styles from './style.module.css'


const nhanVienContext = createContext()

const nhanVienHeader = [
  { key: "Mã NV", value: "ma" },
  { key: "Tên nhân viên", value: "hoTen" },
  { key: "Giới tính", value: "gioiTinh" },
  { key: "Ngày sinh", value: "ngaySinh" },
  { key: "Email", value: "email" },
  { key: "Số điện thoại", value: "soDienThoai" },
  { key: "Vai trò", value: "" },
]
const defaultNhanVien = {
  ma: "", hoTen: "", gioiTinh: "", ngaySinh: "", email: "", soDienThoai: ""
}
function NhanVien() {
  const [modal, setModal] = useState("")
  const [formData, setFormData] = useState({})

  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={setModal.bind({}, "add")} />
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={setModal.bind({}, "edit")} />
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
      <nhanVienContext.Provider value={[formData, setFormData]}>


        {/* Them khach hang */}
        <Modal show={modal === "add"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"THÊM KHÁCH HÀNG"} />

          <Modal.Body>
            <KhachHangForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }}>Thêm khách hàng</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={setModal.bind({}, "")}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        {/* Sua thong tin khach hang */}
        <Modal show={modal === "edit"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"CHỈNH SỬA KHÁCH HÀNG"} />

          <Modal.Body>
            <KhachHangForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }}>Lưu thông tin</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={setModal.bind({}, "")}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>
      </nhanVienContext.Provider>
    </>
  )
}


function KhachHangForm() {
  const [data, setData] = useState({})

  function onDataChange(key, e) {
    setData(src => ({ ...src, [key]: e.target.value }))
  }

  return (
    <Form className='mx-5 px-5 my-4'>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Tên khách hàng</Form.Label>
        <Form.Control type="text" value={data.hoTen} onChange={onDataChange.bind({}, "hoTen")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Ngày sinh</Form.Label>
        <Form.Control type="date" value={data.ngaySinh} onChange={onDataChange.bind({}, "ngaySinh")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Địa chỉ</Form.Label>
        <Form.Control type="text" value={data.diaChi} onChange={onDataChange.bind({}, "diaChi")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Số điện thoại</Form.Label>
        <Form.Control type="email" value={data.sdt} onChange={onDataChange.bind({}, "sdt")} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="email" value={data.mail} onChange={onDataChange.bind({}, "mail")} />
      </Form.Group>
    </Form>
  )
}
export default NhanVien