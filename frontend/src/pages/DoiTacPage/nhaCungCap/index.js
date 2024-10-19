import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import { v4 } from 'uuid'

import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import IconBtn from '../../../components/buttons/iconBtn'
import SearchForm from '../../../components/Forms/searchForm'
import HeaderModalA from '../../../components/modals/headerA'
import ErrorModal from '../../../components/modals/errorModal'
import { wait } from '../../../api'
import FlexForm from '../../../components/Forms/FlexForm'

const NCCContext = createContext()
const defaultNCC = { ma: undefined, tenNCC: "", diaChi: "", mail: "", sdt: "" }

const nhaCungCapHeader = [
  { key: "Mã NCC", value: "ma" },
  { key: "Tên nhà cung cấp", value: "tenNCC" },
  { key: "Địa chỉ", value: "diaChi" },
  { key: "Email", value: "mail" },
  { key: "Số điện thoại", value: "sdt" },
]

function NhaCungCapForm() {
  const [data, setData] = useContext(NCCContext)

  function onDataChange(key, e) {
    setData(src => ({ ...src, [key]: e.target.value }))
  }

  return (
    <Form className='mx-5 px-5 my-4'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Tên nhà cung cấp</Form.Label>
        <Form.Control type="text" value={data.tenNCC} onChange={onDataChange.bind({}, "tenNCC")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Địa chỉ</Form.Label>
        <Form.Control type="text" value={data.diaChi} onChange={onDataChange.bind({}, "diaChi")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Số điện thoại</Form.Label>
        <Form.Control type="email" value={data.sdt} onChange={onDataChange.bind({}, "sdt")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="text" value={data.mail} onChange={onDataChange.bind({}, "mail")} />
      </Form.Group>
    </Form>
  )
}

function NhaCungCap() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])

  const [formData, setFormData] = useState({ ...defaultNCC })
  const [rowClick, setRowClick] = useState()

  useEffect(function () {
    updateTableData()
  }, [])

  function updateTableData() {
    setTableData([])
    wait(.5).then(() => setTableData(new Array(100).fill().map(i => ({ ma: v4(), tenNCC: "t", diaChi: "tt", sdt: "" }))))
  }

  function openModal(modal) {
    setModal(modal)
  }

  function onRowClick(data) {
    setRowClick(data)
  }

  function onOpenInsertModal() {
    setFormData({ ...defaultNCC })
    openModal("add")
  }

  function onOpenUpdateModal() {
    if (!rowClick) return setModal("error")

    setFormData({ ...rowClick })
    openModal("edit")
  }

  function onInsert() {
    console.log(formData)
  }

  function onUpdate() {

    console.log(formData)
  }

  function onDelete() {
    if (!rowClick) return setModal("error")
  }


  return (
    <>
      <Page2
        sidebarWidth={20}
        toolbarHeight={15}
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal} />
          <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={onOpenUpdateModal} />
          <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" onClick={onDelete} />
        </>}
        rightSec={<FlexForm>
          <FormControl className='w-auto' type='text' placeholder='Tìm kiếm' />
          <IconBtn className='w-auto btn-primary' icon={faMagnifyingGlass} title={"Tìm kiếm"} />
          <IconBtn className='w-auto btn-success' icon={faArrowRotateRight} title={"Làm mới"} />
        </FlexForm>}
        dataTable={<TableA headers={nhaCungCapHeader} data={tableData} onClick={onRowClick} />}
      />

      <NCCContext.Provider value={[formData, setFormData]}>
        <Modal show={modal === "add"} size='lg' centered backdrop="static">
          <HeaderModalA title={"THÊM NHÀ CUNG CẤP"} />

          <Modal.Body>
            <NhaCungCapForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }} onClick={onInsert}>Thêm nhà cung cấp</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modal === "edit"} size='lg' centered backdrop="static">
          <HeaderModalA title={"CHỈNH SỬA NHÀ CUNG CẤP"} />

          <Modal.Body>
            <NhaCungCapForm />
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{ width: "25%" }} onClick={onUpdate}>Lưu thông tin</Button>
            <Button variant='danger' style={{ width: "25%" }} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        <ErrorModal show={modal === "error"} onHide={openModal.bind({})}>
          Phải chọn 1 nhà cung cấp!!!
        </ErrorModal>
      </NCCContext.Provider>
    </>
  )
}

export default NhaCungCap