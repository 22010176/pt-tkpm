import {useEffect, useReducer, useState} from 'react'
import {
  Button, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader
} from 'react-bootstrap'
import {
  faCircleInfo, faCircleXmark, faFileExport, faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight
} from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../../components/buttons/toolBtn'
import IconBtn from '../../../components/buttons/iconBtn'
import HeaderModalA from '../../../components/modals/headerA'
import SideNavbar from '../../../components/layouts/sideBar'
import SearchForm from '../../../components/Forms/searchForm'
import TableA from '../../../components/tables/tableA'
import ContentA from '../../../components/layouts/blockContent'
import Page3 from '../../../components/layouts/Page3'

import styles from './style.module.css'
import ExcelExport from '../../../components/excel'
import colors from '../../../utilities/colors'
import InputShadow from '../../../components/Forms/InputShadow'
import GroupShadow from '../../../components/Forms/GroupShadow'
import {getSuppliers} from "../../../api/suppliers";
import {getEmployees} from "../../../api/employees";

const phieuNhapHd = [
  {key: "Mã phiếu nhập", value: "ma"},
  {key: "Nhà cung cấp", value: "nhaCungCap"},
  {key: "Nhân viên nhập", value: "nhanVien"},
  {key: "Thời gian", value: "thoiGian"},
  {key: "Tổng tiền", value: "tongTien"},
]

const chiTietPhieuHd = [
  {key: "Mã SP", value: "ma"},
  {key: "Tên sản phẩm", value: "tenSP"},
  {key: "RAM", value: "ram"},
  {key: "rom", value: "rom"},
  {key: "Màu sắc", value: "mauSac"},
  {key: "Đơn giá", value: "gia"},
]


function NhapKho() {
  const [nhaCungCap, setNhaCungCap] = useState([])
  const [nhanVien, setNhanVien] = useState([])

  const [formData, setFormData] = useState({
    nhaCungCap: "", nhanVien: "", tuNgay: "", denNgay: "", tienMin: 0, tienMax: 100_000_000_000
  })

  useEffect(() => {
    getSuppliers().then(data => {
      setNhaCungCap(data.suppliers)
      setFormData(src=>({...src, nhaCungCap: data.suppliers[0].maNhaCungCap}))
    })
    getEmployees().then(data => {
      setNhanVien(data.employees)
      setFormData(src=>({...src, nhanVien: data.employees[0].maNhanVien}))
    })
  }, []);
console.log(nhanVien,nhaCungCap)
  console.log(formData)

  return (<>
    <Page3
      sidebar={<SideNavbar/>}
      tools={<>
        <ToolBtn as="a" className="_border-green-focus" href="/nhap-kho/them" color={colors.green} icon={faCirclePlus} title="Thêm"/>
        <ToolBtn className="_border-blue-focus" color={colors.blue} icon={faCircleInfo} title="Chi tiết"/>
        <ToolBtn className="_border-red-focus" color={colors.red} icon={faCircleXmark} title="Hủy"/>
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExport} title="Xuất Excel"/>
      </>}
      rightForm={<>
        <InputShadow type='text' className="w-auto" placeholder='Tìm kiếm'/>
        <IconBtn icon={faMagnifyingGlass} className="btn-success btn-lg"/>
        <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-primary"/>
      </>}
      leftForm={<>
        <Form.Group>
          <Form.Label className='fw-bold'>Nhà cung cấp</Form.Label>
          <InputShadow as={FormSelect} value={formData.nhaCungCap}
                       onChange={e => setFormData(src => ({...src, nhaCungCap: e.target.value}))}>
            {nhaCungCap.map((i, j) => <option key={j} value={i.maNhaCungCap}>{i.tenNhaCungCap}</option>)}
          </InputShadow>
        </Form.Group>

        <Form.Group>
          <Form.Label className='fw-bold'>Nhân viên nhập</Form.Label>
          <InputShadow as={FormSelect} value={formData.nhanVien} onChange={e => setFormData(src => ({...src, nhanVien: e.target.value}))}>
            {nhanVien.map((i, j) => <option key={j} value={i.manhanvien}>{i.hoten}</option>)}
          </InputShadow>
        </Form.Group>

        <Form.Group>
          <Form.Label className='fw-bold'>Từ ngày</Form.Label>
          <InputShadow type="date" value={formData.tuNgay} onChange={e => setFormData(src => ({...src, tuNgay: e.target.value}))}/>
        </Form.Group>

        <Form.Group>
          <Form.Label className='fw-bold'>Đến ngày</Form.Label>
          <InputShadow type="date" value={formData.denNgay}
                       onChange={e => setFormData(src => ({...src, denNgay: e.target.value}))}/>
        </Form.Group>

        <Form.Group>
          <Form.Label className='fw-bold'>Từ số tiền</Form.Label>
          <GroupShadow>
            <Form.Control type='number' value={formData.tienMin}
                          onChange={e => setFormData(src => ({...src, tienMin: e.target.value}))}/>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </GroupShadow>
        </Form.Group>

        <Form.Group>
          <Form.Label className='fw-bold'>Đến số tiền</Form.Label>
          <GroupShadow>
            <Form.Control type='number' value={formData.tienMax}
                          onChange={e => setFormData(src => ({...src, tienMax: e.target.value}))}/>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </GroupShadow>
        </Form.Group>
      </>}
      table={<TableA index headers={phieuNhapHd}/>}
    />

    {/* Chi tiết */}
    <InfoModal/>
  </>)
}

function InfoModal({...props}) {
  return (
    <Modal {...props} size='xl' scrollable backdrop="static" centered>
      <HeaderModalA title={"THÔNG TIN PHIẾU NHẬP"}/>

      <ModalBody className='d-flex flex-column gap-3 p-4 overflow-hidden'>
        <Form className='d-flex justify-content-between gap-3'>
          <FormGroup>
            <FormLabel className='fw-bold'>Mã phiếu</FormLabel>
            <FormControl type='text' disabled/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'> Nhân viên nhập</FormLabel>
            <FormControl type='text' disabled/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Nhà cung cấp</FormLabel>
            <FormControl type='text' disabled/>
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Thời gian tạo</FormLabel>
            <FormControl type='text' disabled/>
          </FormGroup>
        </Form>

        <ContentA style={{maxHeight: "100%"}}>
          <TableA headers={chiTietPhieuHd}/>
          <div style={{height: "1000px"}}></div>
        </ContentA>
        <p className='text-end m-0 fw-bold mx-4'>Tổng số: <span>2</span> chiếc</p>
      </ModalBody>

      <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
        <Button variant='primary' style={{width: "20%"}}>Xuất PDF</Button>
        <Button variant='danger' style={{width: "20%"}}>Hủy</Button>
      </ModalFooter>
    </Modal>
  )
}

export default NhapKho