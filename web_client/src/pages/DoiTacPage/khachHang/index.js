import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  faArrowRotateRight,
  faCircleInfo,
  faCirclePlus,
  faMagnifyingGlass,
  faPencil,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter
} from 'react-bootstrap'

import ContentA     from '../../../components/layouts/blockContent'
import SideNavbar   from '../../../components/layouts/sideBar'
import ToolBtn      from '../../../components/buttons/toolBtn'
import Page2        from '../../../components/layouts/Page2'
import TableA       from '../../../components/tables/tableA'
import IconBtn      from '../../../components/buttons/iconBtn'
import HeaderModalA from '../../../components/modals/headerA'
import ErrorModal   from '../../../components/modals/errorModal'
import FlexForm     from '../../../components/Forms/FlexForm'
import InputShadow  from '../../../components/Forms/InputShadow'
import colors       from '../../../utilities/colors'
import {
  deleteCustomer,
  getCustomers,
  insertCustomer,
  updateCustomer
}                   from "../../../api/customers";

const KhachHangContext = createContext()

const defaultKhachHang = {
  makhachhang: undefined, tenkhachhang: "", ngaysinh: new Date().toISOString().split('T')[0], diachi: "", mail: "", sodienthoai: ""
}

const khachHangHeader = [
  {key: "Mã KH", value: "makhachhang"},
  {key: "Tên khách hàng", value: "tenkhachhang"},
  {key: "Ngày sinh", value: "ngaysinh"},
  {key: "Địa chỉ", value: "diachi"},
  {key: "Email", value: "mail"},
  {key: "Số điện thoại", value: "sodienthoai"},
  {key: "Ngày tham gia", value: "ngaythamgia"},
]

const lichSuMuaHangHeader = [
  {key: "Ngày mua hàng", value: "ma"},
  {key: "Mã phiếu xuất hàng", value: "tenNCC"},
  {key: "Số lượng", value: "diachi"},
  {key: "Thành tiền", value: "mail"},
  {key: "Ghi chú", value: "sdt"},
]

function KhachHangForm() {
  const [data, setData] = useContext(KhachHangContext)

  function onDataChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  return (
    <Form className='mx-5 px-5 my-4'>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Tên khách hàng</Form.Label>
        <Form.Control type="text" value={data.tenkhachhang} onChange={onDataChange.bind({}, "tenkhachhang")}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Ngày sinh</Form.Label>
        <Form.Control type="date" value={data.ngaysinh} onChange={onDataChange.bind({}, "ngaysinh")}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Địa chỉ</Form.Label>
        <Form.Control type="text" value={data.diachi} onChange={onDataChange.bind({}, "diachi")}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Số điện thoại</Form.Label>
        <Form.Control type="email" value={data.sodienthoai} onChange={onDataChange.bind({}, "sodienthoai")}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='fw-bold'>Email</Form.Label>
        <Form.Control type="email" value={data.mail} onChange={onDataChange.bind({}, "mail")}/>
      </Form.Group>
    </Form>
  )
}

function KhachHang() {
  const [modal, setModal] = useState("")
  const [tableData, setTableData] = useState([])

  const [formData, setFormData] = useState({...defaultKhachHang})
  const [rowClick, setRowClick] = useState()

  useEffect(function () {
    updateTableData()
  }, [])


  function openModal(modal) {
    setModal(modal)
  }

  function updateTableData() {
    setTableData([])
    getCustomers().then(data => setTableData(data.customers.map(customer => {

      customer.ngaysinh = customer.ngaysinh.split('T')[0]
      customer.ngaythamgia = customer.ngaythamgia.split('T')[0]
      return customer;
    })))

  }

  function onRowClick(data) {
    if (data) setRowClick(data)
  }

  function onOpenInsertModal() {
    setFormData({...defaultKhachHang})
    setModal("add")
  }

  function onOpenUpdateModal() {
    if (!rowClick) return openModal("error")

    setFormData({...rowClick})
    openModal("edit")
  }

  async function onInsertKhachHang() {
    const result = await insertCustomer([formData])
    console.log(result)

    if (!result.success) return

    setFormData({...defaultKhachHang})
    updateTableData()
  }

  async function onUpdateKhachHang() {
    const result = await updateCustomer(formData)
    console.log(result)

    if (!result.success) return

    setFormData({...defaultKhachHang})
    updateTableData()
    setModal("")
  }

  async function onDeleteKhachHang() {
    if (!rowClick) return openModal("error")

    const result = await deleteCustomer([rowClick])

    if (!result.success) return

    setFormData({...defaultKhachHang})
    updateTableData()
    setModal("")
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
          <ToolBtn color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDeleteKhachHang}/>
          <ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "lichSu")}/>
        </>}
        rightSec={<FlexForm>
          <FormControl className='w-auto' type='text' placeholder='Tìm kiếm'/>
          <IconBtn className='w-auto btn-primary btn-lg btn-success' icon={faMagnifyingGlass}/>
          <IconBtn className='w-auto btn-primary' icon={faArrowRotateRight} title={"Làm mới"}/>
        </FlexForm>}
        dataTable={<TableA headers={khachHangHeader} data={tableData} onClick={onRowClick}/>}
      />

      <KhachHangContext.Provider value={[formData, setFormData]}>
        {/* Them khach hang */}
        <Modal show={modal === "add"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"THÊM KHÁCH HÀNG"}/>

          <Modal.Body>
            <KhachHangForm/>
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{width: "25%"}} onClick={onInsertKhachHang}>Thêm khách hàng</Button>
            <Button variant='danger' style={{width: "25%"}} onClick={openModal.bind({})}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        {/* Sua thong tinn khach hang */}
        <Modal show={modal === "edit"} centered backdrop="static" size='lg'>
          <HeaderModalA title={"CHỈNH SỬA KHÁCH HÀNG"}/>

          <Modal.Body>
            <KhachHangForm/>
          </Modal.Body>

          <Modal.Footer className='d-flex justify-content-center gap-5 py-3'>
            <Button variant='primary' style={{width: "25%"}} onClick={onUpdateKhachHang}>Lưu thông tin</Button>
            <Button variant='danger' style={{width: "25%"}} onClick={openModal.bind({})}>Hủy bỏ</Button>
          </Modal.Footer>
        </Modal>

        <ErrorModal show={modal === "error"} onHide={openModal.bind({})}>
          Hãy chọn một khách hàng!!!
        </ErrorModal>
      </KhachHangContext.Provider>


      <Modal centered size="xl" show={modal === "lichSu"} backdrop="static" className='vh-100' scrollable>
        <HeaderModalA title="LỊCH SỬ MUA HÀNG"/>

        <ModalBody className='d-flex flex-column h-100 gap-4 px-5 py-4'>
          <Form className='d-flex flex-column gap-4'>
            <FormGroup className='d-flex gap-5'>
              <FormGroup className='_w-20'>
                <FormLabel className='fw-bold'>Mã khách hàng</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
              <FormGroup className='_w-40'>
                <FormLabel className='fw-bold'>Tên khách hàng</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
              <FormGroup className='_w-20'>
                <FormLabel className='fw-bold'>Ngày sinh</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
              <FormGroup className='_w-20'>
                <FormLabel className='fw-bold'>Ngày tham gia</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
            </FormGroup>

            <FormGroup className='d-flex gap-5'>
              <FormGroup className='_w-60'>
                <FormLabel className='fw-bold'>Địa chỉ</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
              <FormGroup className='_w-20'>
                <FormLabel className='fw-bold'>Số điện thoại</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
              <FormGroup className='_w-20'>
                <FormLabel className='fw-bold'>Email</FormLabel>
                <InputShadow as={FormControl} size="sm" disabled/>
              </FormGroup>
            </FormGroup>
          </Form>

          <ContentA>
            <TableA headers={lichSuMuaHangHeader}/>
            <div style={{height: "10000px"}}></div>
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