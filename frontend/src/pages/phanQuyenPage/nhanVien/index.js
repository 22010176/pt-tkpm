import {createContext, useContext, useEffect, useState} from 'react'
import {UserContext} from "../../../api/authentication";
import {faArrowRotateRight, faCirclePlus, faFileExcel, faFileExport, faMagnifyingGlass, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, FormControl, FormSelect, Modal} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import InputShadow from '../../../components/Forms/InputShadow'
import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import HeaderModalA from '../../../components/modals/headerA'
import {deleteEmployee, getEmployees, insertEmployee, updateEmployee} from "../../../api/employees";
import {insertCustomer} from "../../../api/customers";
import ErrorModal from "../../../components/modals/errorModal";
import Error from "../../UtilitesPage/error";

const nhanVienContext = createContext()

const nhanVienHeader = [
  {key: "Mã NV", value: "maNhanVien"},
  {key: "Tên nhân viên", value: "hoTen"},
  {key: "Giới tính", value: "gioiTinh"},
  {key: "Ngày sinh", value: "ngaySinh"},
  {key: "Email", value: "mail"},
  {key: "Số điện thoại", value: "soDienThoai"},
  {key: "Vai trò", value: "tenNhomQuyen"},
]
const defaultNhanVien = {
  maNhanVien: "", hoTen: "", gioiTinh: "Nam", ngaySinh: "", mail: "", soDienThoai: ""
}

function NhanVien() {
  const {perm} = useContext(UserContext)

  const [modal, setModal] = useState("")
  const [formData, setFormData] = useState({...defaultNhanVien})
  const [rowClick, setRowClick] = useState()

  const [tableData, setTableData] = useState()

  useEffect(() => {
    updateTableData()
  }, []);

  function updateTableData() {
    setTableData([])
    getEmployees().then(data => setTableData(data.employees.map(i => {
        i.ngaySinh = i.ngaySinh.split('T')[0]
        return i;
      }))
    )
  }

  async function onRowClick(row) {
    console.log(row)
    setRowClick(row);
  }

  async function onOpenEditModal() {
    if (!rowClick) return setModal("error")
    setFormData(rowClick)

    setModal("edit")
  }


  async function onInsert() {
    const result = await insertEmployee(formData)
    console.log(result)
    if (!result.success) return

    setFormData({...defaultNhanVien})
    updateTableData()
  }

  async function onUpdate() {
    const result = await updateEmployee(formData)

    if (!result.success) return

    setFormData({...defaultNhanVien})
    updateTableData()
    setModal('')
  }

  async function onDelete() {
    if (!rowClick) return setModal("error")
    const result = await deleteEmployee(rowClick)

    if (!result.success) return

    setFormData({...defaultNhanVien})
    updateTableData()
  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar/>}
        tools={<>
          {/*Them btn*/}
          <ToolBtn
            className={[
              // !perm.find(i => i.tenHanhDong === 'Them' && i.tenChucNang === 'QuanLyNhanVien') && 'pe-none opacity-50',
              "_border-green-focus"
            ].join(' ')}
            color={colors.green} icon={faCirclePlus} title="Thêm" onClick={setModal.bind({}, "add")}/>

          {/*Sua btn*/}
          <ToolBtn
            className={[
              // !perm.find(i => i.tenHanhDong === 'Sua' && i.tenChucNang === 'QuanLyNhanVien') && 'pe-none opacity-50',
              "_border-orange-focus-2"
            ].join(' ')}
            color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenEditModal}/>

          {/*Xoa btn*/}
          <ToolBtn
            className={[
              // !perm.find(i => i.tenHanhDong === 'Xoa' && i.tenChucNang === 'QuanLyNhanVien') && 'pe-none opacity-50',
              "_border-yellow-focus-2"
            ].join(' ')}
            color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDelete}/>

          {/*NhapFile btn*/}
          <ToolBtn
            className={[
              // !perm.find(i => i.tenHanhDong === 'NhapFile' && i.tenChucNang === 'QuanLyNhanVien') && 'pe-none opacity-50',
              "_border-green-focus"
            ].join(' ')}
            color={colors.green} icon={faFileExcel} title="Nhập Excel"/>

          {/*XuatFile btn*/}
          <ToolBtn
            className={[
              // !perm.find(i => i.tenHanhDong === 'XuatFile' && i.tenChucNang === 'QuanLyNhanVien') && 'pe-none opacity-50',
              "_border-green-focus"
            ].join(' ')}
            color={colors.green} icon={faFileExport} title="Xuất Excel"/>
        </>}
        rightSec={<FlexForm>
          <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm"/>
          <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
          <Button className='d-flex gap-2 align-items-center' variant='primary'>
            <FontAwesomeIcon icon={faArrowRotateRight}/>
            <span className="text-nowrap">Làm mới</span>
          </Button>
        </FlexForm>
        }
        dataTable={<TableA headers={nhanVienHeader} data={tableData} onClick={onRowClick}/>}
      />
      <nhanVienContext.Provider value={[formData, setFormData]}>
        {/* Them khach hang */}
        {perm.find(i => i.tenHanhDong === 'Them' && i.tenChucNang === 'QuanLyNhanVien')
          || <Modal show={modal === "add"} centered backdrop="static" size='lg'>
            <HeaderModalA title={"THÊM NHÂN VIÊN"}/>

            <Modal.Body>
              <NhanVienForm/>
            </Modal.Body>

            <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
              <Button variant='primary' style={{width: "25%"}} onClick={onInsert}>Thêm nhân viên</Button>
              <Button variant='danger' style={{width: "25%"}} onClick={setModal.bind({}, "")}>Hủy bỏ</Button>
            </Modal.Footer>
          </Modal>}

        {/* Sua thong tin khach hang */}
        {perm.find(i => i.tenHanhDong === 'Sua' && i.tenChucNang === 'QuanLyNhanVien')
          || <Modal show={modal === "edit"} centered backdrop="static" size='lg'>
            <HeaderModalA title={"CHỈNH SỬA NHÂN VIÊN"}/>

            <Modal.Body>
              <NhanVienForm/>
            </Modal.Body>

            <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
              <Button variant='primary' style={{width: "25%"}} onClick={onUpdate}>Lưu thông tin</Button>
              <Button variant='danger' style={{width: "25%"}} onClick={setModal.bind({}, "")}>Hủy bỏ</Button>
            </Modal.Footer>
          </Modal>}

        <ErrorModal show={modal === "error"} onHide={setModal.bind(({}, ""))}>
          <p>Phải chọn 1 nhân viên</p>
        </ErrorModal>
      </nhanVienContext.Provider>
    </>
  )
}


function NhanVienForm() {
  const [data, setData] = useContext(nhanVienContext)

  function onDataChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  return (
    <Form className='mx-5 px-5 my-4'>
      {/*Tên nhân viên*/}
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Tên nhân viên</Form.Label>
        <Form.Control type="text" value={data.hoTen} onChange={onDataChange.bind({}, "hoTen")}/>
      </Form.Group>

      {/*Giới tính*/}
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Giới tính</Form.Label>
        <InputShadow as={FormSelect} value={data.gioiTinh} onChange={onDataChange.bind({}, "gioiTinh")}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </InputShadow>
      </Form.Group>

      {/*Ngày sinh*/}
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Ngày sinh</Form.Label>
        <Form.Control type="date" value={data.ngaySinh} onChange={onDataChange.bind({}, "ngaySinh")}/>
      </Form.Group>

      {/*Số điện thoại*/}
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Số điện thoại</Form.Label>
        <Form.Control type="email" value={data.soDienThoai} onChange={onDataChange.bind({}, "soDienThoai")}/>
      </Form.Group>

      {/*Email*/}
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="email" value={data.mail} onChange={onDataChange.bind({}, "mail")}/>
      </Form.Group>
    </Form>
  )
}

export default NhanVien