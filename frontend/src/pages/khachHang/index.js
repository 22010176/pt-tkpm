import { faCirclePlus, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalFooter, Form, Button } from 'react-bootstrap'
import { v4 } from 'uuid'

import SideNavbar from '../../components/layouts/sideBar'
import ToolBtn from '../../components/buttons/toolBtn'
import PageTemplateC from '../../components/layouts/pageC'
import TableA from '../../components/tables/tableA'

import styles from './style.module.css'
import SearchForm from '../../components/Forms/searchForm'
import HeaderModalA from '../../components/modals/headerA'
import { createContext, useContext, useEffect, useState } from 'react'
import ErrorModal from '../../components/modals/errorModal'

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
    document.body.addEventListener("click", resetRowSelect)
    return () => document.body.removeEventListener("click", resetRowSelect)
  }, [])

  function resetRowSelect() {
    TableA.clearSelect();
    setRowClick(undefined)
  }

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
      <PageTemplateC
        sidebarWidth={20}
        toolbarHeight={15}
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal} />
          <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={onOpenUpdateModal} />
          <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" onClick={onDeleteKhachHang} />
        </>}
        rightSec={<SearchForm />}
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
    </>
  )
}

export default KhachHang