import {createContext, useContext, useEffect, useState} from 'react'
import {faArrowRotateRight, faCirclePlus, faMagnifyingGlass, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {Button, Form, FormControl, Modal} from 'react-bootstrap'


import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import TableA from '../../../components/tables/tableA'
import Page2 from '../../../components/layouts/Page2'
import IconBtn from '../../../components/buttons/iconBtn'
import HeaderModalA from '../../../components/modals/headerA'
import ErrorModal from '../../../components/modals/errorModal'
import FlexForm from '../../../components/Forms/FlexForm'
import colors from '../../../utilities/colors'
import {deleteSupplier, getSuppliers, insertSupplier, updateSupplier} from "../../../api/Partners/suppliers";

const NCCContext = createContext()
const defaultNCC = {ma: undefined, tennhacungcap: "", diachi: "", mail: "", sodienthoai: ""}

const nhaCungCapHeader = [
  {key: "Mã NCC", value: "manhacungcap"},
  {key: "Tên nhà cung cấp", value: "tennhacungcap"},
  {key: "Địa chỉ", value: "diachi"},
  {key: "Email", value: "mail"},
  {key: "Số điện thoại", value: "sodienthoai"},
]

function NhaCungCapForm() {
  const [data, setData] = useContext(NCCContext)

  function onDataChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  return (
    <Form className='mx-5 px-5 my-4'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Tên nhà cung cấp</Form.Label>
        <Form.Control type="text" value={data.tennhacungcap} onChange={onDataChange.bind({}, "tennhacungcap")}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Địa chỉ</Form.Label>
        <Form.Control type="text" value={data.diachi} onChange={onDataChange.bind({}, "diachi")}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Số điện thoại</Form.Label>
        <Form.Control type="email" value={data.sodienthoai} onChange={onDataChange.bind({}, "sodienthoai")}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="text" value={data.mail} onChange={onDataChange.bind({}, "mail")}/>
      </Form.Group>
    </Form>
  )
}

function NhaCungCap() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])

  const [formData, setFormData] = useState({...defaultNCC})
  const [rowClick, setRowClick] = useState()

  useEffect(function () {
    updateTableData()
  }, [])

  function updateTableData() {
    setTableData([])
    getSuppliers().then(data => setTableData(data.Data))
  }

  function openModal(modal) {
    setModal(modal)
  }

  function onRowClick(data) {
    if (data) setRowClick(data)
  }

  function onOpenInsertModal() {
    setFormData({...defaultNCC})
    openModal("add")
  }

  function onOpenUpdateModal() {
    if (!rowClick) return setModal("error")

    setFormData({...rowClick})
    openModal("edit")
  }

  async function onInsert() {
    const result = await insertSupplier([formData])
    console.log(result)
    if (!result.success) return

    setFormData({...defaultNCC})
    updateTableData()
  }

  async function onUpdate() {
    const result = await updateSupplier(formData)
    console.log(result)
    if (!result.success) return

    console.log(formData)
    setFormData({...defaultNCC})
    updateTableData()
    setModal("")
  }

  async function onDelete() {
    if (!rowClick) return setModal("error")
    const result = await deleteSupplier([rowClick])
    if (!result.success) return

    setFormData({...defaultNCC})
    updateTableData()
  }

  return (
    <>
      <Page2
        sidebarWidth={20}
        toolbarHeight={15}
        sidebar={<SideNavbar/>}
        tools={<>
          <ToolBtn color={colors.green} icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal}/>
          <ToolBtn color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenUpdateModal}/>
          <ToolBtn color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDelete}/>
          {/*<ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "lichSu")}/>*/}
        </>}
        rightSec={<FlexForm>
          <FormControl className='w-auto' type='text' placeholder='Tìm kiếm'/>
          <IconBtn className='w-auto btn-primary btn-lg' icon={faMagnifyingGlass}/>
          <IconBtn className='w-auto btn-success' icon={faArrowRotateRight} title={"Làm mới"} onClick={updateTableData}/>
        </FlexForm>}
        dataTable={<TableA headers={nhaCungCapHeader} data={tableData} onClick={onRowClick}/>}
      />

      <NCCContext.Provider value={[formData, setFormData]}>
        {/* Add Form */}
        <Modal show={modal === "add"} size='lg' centered backdrop="static">
          <HeaderModalA title={"THÊM NHÀ CUNG CẤP"}/>

          <Modal.Body>
            <NhaCungCapForm/>
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{width: "25%"}} onClick={onInsert}>Thêm nhà cung cấp</Button>
            <Button variant='danger' style={{width: "25%"}} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        {/* Update form */}
        <Modal show={modal === "edit"} size='lg' centered backdrop="static">
          <HeaderModalA title={"CHỈNH SỬA NHÀ CUNG CẤP"}/>

          <Modal.Body>
            <NhaCungCapForm/>
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{width: "25%"}} onClick={onUpdate}>Lưu thông tin</Button>
            <Button variant='danger' style={{width: "25%"}} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
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