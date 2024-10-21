import { useState } from 'react'
import { Form, FormControl, InputGroup, FormGroup, Modal, ModalBody, ModalFooter, FormLabel, Button } from 'react-bootstrap'
import { faCircleInfo, faCircleXmark, faFileExport, faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../../components/buttons/toolBtn'
import HeaderModalA from '../../../components/modals/headerA'
import IconBtn from '../../../components/buttons/iconBtn'
import ContentA from '../../../components/layouts/blockContent'
import TableA from '../../../components/tables/tableA'
import Page3 from '../../../components/layouts/Page3'
import SideNavbar from '../../../components/layouts/sideBar'
import colors from '../../../utilities/colors'
import InputShadow from '../../../components/Forms/InputShadow'

import style from './style.module.css'

const phieuNhapHd = [
  { key: "Mã phiếu nhập", value: "ma" },
  { key: "Nhà cung cấp", value: "nhaCungCap" },
  { key: "Nhân viên nhập", value: "nhanVien" },
  { key: "Thời gian", value: "thoiGian" },
  { key: "Tổng tiền", value: "tongTien" },
]

const chiTietPhieuHd = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sản phẩm", value: "tenSP" },
  { key: "RAM", value: "ram" },
  { key: "rom", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Đơn giá", value: "gia" },
]

const phieuXuatHeader = [
  { key: "Mã sp", value: "tenSP" },
  { key: "Tên sản phẩm", value: "tonKho" },
  { key: "RAM", value: "tonKho" },
  { key: "ROM", value: "tonKho" },
  { key: "Màu sắc", value: "tonKho" },
  { key: "Mã IMEI", value: "tonKho" },
  { key: "Đơn giá", value: "tonKho" },
]
function XuatKho() {
  const [modal, setModal] = useState("")

  function openModal(key, e) {
    setModal(key);
  }

  return (
    <>
      <Page3
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn as="a" className="_border-focus-green" href="/xuat-kho/them" color={colors.green} icon={faCirclePlus} title="Thêm" />
          <ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "info")} />
          <ToolBtn color={colors.red} icon={faCircleXmark} title="Hủy" />
          <ToolBtn color={colors.green} icon={faFileExport} title="Xuất Excel" />
        </>}
        rightForm={<>
          <InputShadow as={FormControl} className='w-auto' type='text' placeholder='Tìm kiếm' />
          <IconBtn icon={faMagnifyingGlass} className="btn-primary w-auto btn-lg" />
          <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-success w-auto'" />
        </>}
        leftForm={<>
          <Form.Group>
            <Form.Label className='fw-bold'>Khách hàng</Form.Label>
            <Form.Select>
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Nhân viên xuất</Form.Label>
            <Form.Select>
              <option>a</option>
              <option>b</option>
              <option>c</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Từ ngày</Form.Label>
            <Form.Control type='date' />
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Đến ngày</Form.Label>
            <Form.Control type='date' />
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Từ số tiền</Form.Label>
            <InputGroup>
              <Form.Control type='number' />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Đến số tiền</Form.Label>
            <InputGroup>
              <Form.Control type='number' />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </>}
        table={<TableA headers={phieuNhapHd} />}
      />

      <Modal show={modal === "info"} size='xl' scrollable backdrop="static">
        <HeaderModalA title={"THÔNG TIN PHIẾU XUẤT"} />

        <ModalBody className='d-flex flex-column gap-3 p-4 overflow-hidden'>
          <Form className='d-flex justify-content-between gap-3'>
            <FormGroup>
              <FormLabel className='fw-bold'>Mã phiếu</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'> Nhân viên xuất</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Khách hàng</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Thời gian tạo</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>
          </Form>

          <ContentA style={{ maxHeight: "100%" }}>
            <TableA headers={chiTietPhieuHd} />
            <div style={{ height: "1000px" }}></div>
          </ContentA>
          <p className='text-end m-0 fw-bold mx-4'>Tổng số: <span>2</span> chiếc</p>
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button variant='primary' style={{ width: "20%" }}>Xuất PDF</Button>
          <Button variant='danger' style={{ width: "20%" }} onClick={openModal.bind({}, "")}>Hủy</Button>
        </ModalFooter>
      </Modal>

      <Modal centered scrollable size='xl' show={modal === "phieuSuat"} className='vh-100'>
        <HeaderModalA title="THÔNG TIN PHIẾU XUẤT" />

        <ModalBody className='d-flex flex-column gap-5 p-5'>
          <Form className='d-flex gap-5 justify-content-between'>
            <FormGroup>
              <FormLabel className='fw-bold'>Mã phiếu</FormLabel>
              <InputShadow disabled />
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Nhân viên xuất</FormLabel>
              <InputShadow disabled />
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Khách hàng</FormLabel>
              <InputShadow disabled />
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Thời gian</FormLabel>
              <InputShadow disabled type="date" />
            </FormGroup>
          </Form>

          <ContentA>
            <TableA headers={phieuXuatHeader} />
            <div style={{ height: "1000px" }}></div>
          </ContentA>
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button variant='primary' style={{ width: "20%" }}>Xuất PDF</Button>
          <Button variant='danger' style={{ width: "20%" }} onClick={openModal.bind({}, "")}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default XuatKho