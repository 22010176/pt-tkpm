import { Button, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { faCircleInfo, faCircleXmark, faFileExport, faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import PageTemplateD from '../../components/layouts/pageD'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'
import HeaderModalA from '../../components/modals/headerA'
import PageTemplateC from '../../components/layouts/pageC'
import SideNavbar from '../../components/layouts/sideBar'
import SearchForm from '../../components/Forms/searchForm'

import style from './style.module.css'
import TableA from '../../components/tables/tableA'
import ToolLink from '../../components/buttons/toolLink'
import ContentA from '../../components/layouts/blockContent'
import { useState } from 'react'

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


function NhapKho() {
  const height = 15;
  const width = 25;

  const [modal, setModal] = useState("")

  function openModal(key, e) {
    setModal(key);
  }
  return (
    <>
      <PageTemplateD sidebarWidth={20} sidebar={<SideNavbar />}>
        <div className='d-flex gap-3 flex-column w-100 h-100 p-3'>
          <div className='rounded-3 d-flex justify-content-between px-3 align-items-center bg-light border border-info-subtle border-5' style={{ height: height + "%" }}>
            <div className='d-flex'>
              <ToolLink href="/nhap-kho/them" color="#63e6be" icon={faCirclePlus} title="Thêm" />
              <ToolBtn color="#2b78e4" icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "info")} />
              <ToolBtn color="#cf2a27" icon={faCircleXmark} title="Hủy" />
              <ToolBtn color="#009e0f" icon={faFileExport} title="Xuất Excel" />
            </div>

            <Form className={["d-flex align-items-center h-100 gap-3"].join(" ")}>
              <div>
                <Form.Select>
                  <option value="1">Tất cả</option>
                  <option value="2">Tên</option>
                  <option value="3">A</option>
                </Form.Select>
              </div>
              <div>
                <FormControl type='text' placeholder='Tìm kiếm' />
              </div>
              <div>
                <IconBtn icon={faMagnifyingGlass} title={"Tìm kiếm"} className="btn-primary" />
              </div>
              <div>
                <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-success " />
              </div>
            </Form>
          </div>

          <div className='d-flex gap-3' style={{ height: 100 - height + "%" }}>
            <Form className='d-flex flex-column justify-content-around gap-5 p-4 rounded-3 bg-light border border-info-subtle border-5' style={{ width: width + "%" }}>
              <Form.Group>
                <Form.Label className='fw-bold'>Nhà cung cấp</Form.Label>
                <Form.Select>
                  <option>a</option>
                  <option>b</option>
                  <option>c</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className='fw-bold'>Nhân viên nhập</Form.Label>
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
            </Form>

            <div className='rounded-3 bg-light border border-info-subtle border-5 mh-100 overflow-auto' style={{ width: 100 - width + "%" }}>
              <TableA headers={phieuNhapHd} />
            </div>
          </div>
        </div>
      </PageTemplateD>

      {/* Chi tiết */}
      <Modal show={modal === "info"} size='xl' scrollable backdrop="static" centered>
        <HeaderModalA title={"THÔNG TIN PHIẾU NHẬP"} />

        <ModalBody className='d-flex flex-column gap-3 p-4 overflow-hidden'>
          <Form className='d-flex justify-content-between gap-3'>
            <FormGroup>
              <FormLabel className='fw-bold'>Mã phiếu</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'> Nhân viên nhập</FormLabel>
              <FormControl type='text' disabled />
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Nhà cung cấp</FormLabel>
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
    </>
  )
}

export default NhapKho