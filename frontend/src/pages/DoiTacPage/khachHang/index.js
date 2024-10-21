import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalFooter, Form, Button, FormControl, ModalBody, ModalHeader, FormGroup, FormLabel } from 'react-bootstrap'
import { v4 } from 'uuid'

import ContentA from '../../../components/layouts/blockContent'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import TableA from '../../../components/tables/tableA'
import IconBtn from '../../../components/buttons/iconBtn'
import HeaderModalA from '../../../components/modals/headerA'
import ErrorModal from '../../../components/modals/errorModal'
import FlexForm from '../../../components/Forms/FlexForm'
import InputShadow from '../../../components/Forms/InputShadow'
import colors from '../../../utilities/colors'

import styles from './style.module.css'

const KhachHangContext = createContext()

const defaultKhachHang = {
  ma: undefined, hoTen: "", ngaySinh: new Date().toISOString().split('T')[0], diaChi: "", mail: "", sdt: ""
}


const khachHangHeader = [
  { key: "Mã KH", value: "ma" },
  { key: "Tên khách hàng", value: "hoTen" },
  { key: "Ngày sinh", value: "ngaySinh" },
  { key: "Địa chỉ", value: "diaChi" },
  { key: "Email", value: "mail" },
  { key: "Số điện thoại", value: "sdt" },
  { key: "Ngày tham gia", value: "ngayThamGia" },
]

const lichSuMuaHangHeader = [
  { key: "Ngày mua hàng", value: "ma" },
  { key: "Mã phiếu xuất hàng", value: "tenNCC" },
  { key: "Số lượng", value: "diaChi" },
  { key: "Thành tiền", value: "mail" },
  { key: "Ghi chú", value: "sdt" },
]

function KhachHangForm() {
  const [data, setData] = useContext(KhachHangContext)

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

function KhachHang() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])

  const [formData, setFormData] = useState({ ...defaultKhachHang })
  const [rowClick, setRowClick] = useState()

  useEffect(function () {
    updateTableData()
    // document.body.addEventListener("click", resetRowSelect)
    // return () => document.body.removeEventListener("click", resetRowSelect)
  }, [])


  function openModal(modal) {
    setModal(modal)
  }

  function updateTableData() {
    setTableData([])
    setTableData(new Array(100).fill().map(i => ({ ma: v4(), hoTen: v4(), ngaySinh: "t", diaChi: "t", mail: "", sdt: "", ngayThamGia: "" })))
  }

  function onRowClick(data) {
    setRowClick(data)
  }
  function onOpenInsertModal() {
    setFormData({ ...defaultKhachHang })
    setModal("add")
  }

  function onOpenUpdateModal() {
    if (!rowClick) return openModal("error")
    setFormData({ ...rowClick })
    openModal("edit")
  }

  function onUpdateKhachHang() {

  }

  function onDeleteKhachHang() {
    if (!rowClick) return openModal("error")
  }

  return (
    <>
      <Page2
        sidebarWidth={20}
        toolbarHeight={15}
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color={colors.green} icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal} />
          <ToolBtn color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenUpdateModal} />
          <ToolBtn color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDeleteKhachHang} />
          <ToolBtn color={colors.blue} icon={faCircleInfo} title="Sửa" onClick={openModal.bind({}, "lichSu")} />
        </>}
        rightSec={<FlexForm>
          <FormControl className='w-auto' type='text' placeholder='Tìm kiếm' />
          <IconBtn className='w-auto btn-primary btn-lg btn-success' icon={faMagnifyingGlass} />
          <IconBtn className='w-auto btn-primary' icon={faArrowRotateRight} title={"Làm mới"} />
        </FlexForm>}
        dataTable={<TableA headers={khachHangHeader} data={tableData} onClick={onRowClick} />}
      />

      <KhachHangContext.Provider value={[formData, setFormData]}>
        {/* Them khach hang */}
        <Modal show={modal === "add"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"THÊM KHÁCH HÀNG"} />

          <Modal.Body>
            <KhachHangForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }}>Thêm khách hàng</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={openModal.bind({})}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        {/* Sua thong tinn khach hang */}
        <Modal show={modal === "edit"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"CHỈNH SỬA KHÁCH HÀNG"} />

          <Modal.Body>
            <KhachHangForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }} onClick={onUpdateKhachHang}>Lưu thông tin</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={openModal.bind({})}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        <ErrorModal show={modal === "error"} onHide={openModal.bind({})}>
          Hãy chọn một khách hàng!!!
        </ErrorModal>
      </KhachHangContext.Provider>


      <Modal centered size="xl" show={modal === "lichSu"} backdrop="static" className='vh-100' scrollable>
        <HeaderModalA title="LỊCH SỬ MUA HÀNG" />

        <ModalBody className='d-flex flex-column h-100 gap-4 px-5 py-4'>
          <Form className='d-flex flex-column gap-4'>
            <FormGroup className='d-flex gap-5'>
              <FormGroup className='_w-40'>
                <FormLabel className='fw-bold'>Mã khách hàng</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
              <FormGroup className='_w-100'>
                <FormLabel className='fw-bold'>Tên khách hàng</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
              <FormGroup className='_w-50'>
                <FormLabel className='fw-bold'>Ngày sinh</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
              <FormGroup className='_w-50'>
                <FormLabel className='fw-bold'>Ngày tham gia</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
            </FormGroup>

            <FormGroup className='d-flex gap-5'>
              <FormGroup className='_w-100'>
                <FormLabel className='fw-bold'>Địa chỉ</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
              <FormGroup className='_w-25'>
                <FormLabel className='fw-bold'>Số điện thoại</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
              <FormGroup className='_w-25'>
                <FormLabel className='fw-bold'>Email</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled />
              </FormGroup>
            </FormGroup>
          </Form>

          <ContentA>
            <TableA headers={lichSuMuaHangHeader} />
            <div style={{ height: "10000px" }}></div>
          </ContentA>
        </ModalBody>

        <ModalFooter className='d-flex justify-content-center gap-5'>
          <Button className='_w-15' variant='primary'>Xuất PDF</Button>
          <Button className='_w-15' variant='danger' onClick={openModal.bind({}, "")}>Đóng</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default KhachHang