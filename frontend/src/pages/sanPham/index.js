import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faRectangleList, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, ModalBody, ModalFooter, FormGroup, FormControl, Image, FormLabel, FormSelect, InputGroup } from 'react-bootstrap'
import { v4 } from 'uuid'

import SideNavbar from '../../components/layouts/sideBar'
import ToolBtn from '../../components/buttons/toolBtn'
import PageTemplateC from '../../components/layouts/pageC'
import SearchForm from '../../components/Forms/searchForm'
import TableA from '../../components/tables/tableA'
import HeaderModalA from '../../components/modals/headerA'
import ContentA from '../../components/layouts/blockContent'

const defaultSanPham = { ma: undefined, tenSP: "", soLuong: "", thuongHieu: "", heDieuHanh: "", phienBanHDH: "", xuatXu: "" }
const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sản phẩm", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "soLuong" },
  { key: "Thương hiệu", value: "thuongHieu" },
  { key: "Hệ điều hành", value: "heDieuHanh" },
  { key: "Phiên bản HĐH", value: "phienBanHDH" },
  { key: "Xuất xứ", value: "xuatXu" },
]

const defaultCauHinh = { ma: undefined, ram: "", rom: "", mauSac: "", giaNhap: "", giaXuat: "" }
const chHeader = [
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Giá nhập", value: "giaNhap" },
  { key: "Giá xuất", value: "giaXuat" }
]

const imeiHeader = [
  { key: "IMEI", value: "imei" },
  { key: "Mã phiếu nhập", value: "phieuNhap" },
  { key: "Mã phiếu xuất", value: "phieuXuat" },
  { key: "Tình trạng", value: "tinhTrang" },
]

function SanPhamB() {
  const [modal, setModal] = useState("");
  const [preModal, setPreModal] = useState("");

  function openModal(key, e) {
    setPreModal(modal)
    setModal(key);
  }

  return (
    <>
      <PageTemplateC
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={openModal.bind({}, "insertSP")} />
          <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={openModal.bind({}, "updateSP")} />
          <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
          <ToolBtn color="#2b78e4" icon={faRectangleList} title="DS IMEI" onClick={openModal.bind({}, "imei")} />
          <ToolBtn color="#009e0f" icon={faFileExcel} title="Nhập Excel" />
          <ToolBtn color="#009e0f" icon={faFileExport} title="Xuất Excel" />
        </>}
        rightSec={<SearchForm />}
        dataTable={<TableA headers={spHeader} />}
      />

      {/* Add SanPham */}
      <Modal scrollable show={modal === "insertSP"} centered size='xl' backdrop="static">
        <HeaderModalA title={"THÊM SẢN PHẨM MỚI"} />

        <ModalBody >
          <SanPhamForm />
        </ModalBody>

        <ModalFooter className='justify-content-center gap-5'>
          <Button variant='primary' style={{ width: "15%" }} onClick={openModal.bind({}, "ch")}>Tạo cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>

      {/* Update SanPham */}
      <Modal scrollable show={modal === "updateSP"} centered size='xl' backdrop="static">
        <HeaderModalA title={"CHỈNH SỬA SẢN PHẨM MỚI"} />

        <ModalBody >
          <SanPhamForm />
        </ModalBody>

        <ModalFooter className='justify-content-center gap-5'>
          <Button variant='primary' style={{ width: "15%" }}>Lưu thông tin</Button>
          <Button variant='warning' style={{ width: "15%" }} onClick={openModal.bind({}, "ch")}>Sửa cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>

      {/* Cấu hình */}
      <Modal scrollable show={modal === "ch"} size="xl" centered>
        <HeaderModalA title="TẠO CẤU HÌNH" />

        <ModalBody className='d-flex p-5 flex-column'>
          <Form className='d-flex justify-content-between gap-4 mb-3'>
            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>ROM</FormLabel>
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>RAM</FormLabel>
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Màu sắc</FormLabel>
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Giá nhập</FormLabel>
              <InputGroup>
                <FormControl type='number' />
                <InputGroup.Text>VNĐ</InputGroup.Text>
              </InputGroup>
            </FormGroup>

            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Giá xuất</FormLabel>
              <InputGroup>
                <FormControl type='number' />
                <InputGroup.Text>VNĐ</InputGroup.Text>
              </InputGroup>
            </FormGroup>
          </Form>

          <ContentA style={{ height: "40vh" }}>
            <TableA index headers={chHeader} />
            <div style={{ height: "1000px" }}></div>
          </ContentA>
        </ModalBody>

        <ModalFooter className='justify-content-center gap-5'>
          <Button variant='primary' style={{ width: "15%" }}>Tạo cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, preModal || "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>

      {/* IMEI */}
      <Modal scrollable show={modal === "imei"} size="xl" centered>
        <HeaderModalA title="DANH SÁCH IMEI" />

        <ModalBody className='d-flex p-5 flex-column'>
          <Form className='d-flex justify-content-between gap-4 mb-3'>
            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Phiên bản</FormLabel>
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Tình trạng</FormLabel>
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
              </FormSelect>
            </FormGroup>


            <FormGroup className='flex-grow-1'>
              <FormLabel className='fw-bold'>Tìm kiếm</FormLabel>
              <FormControl type='text' />
            </FormGroup>
          </Form>

          <ContentA style={{ height: "40vh" }}>
            <TableA index headers={imeiHeader} />
            {/* <div style={{ height: "1000px" }}></div> */}
          </ContentA>
        </ModalBody>

        <ModalFooter className='justify-content-center gap-5'>
          <Button variant='primary' style={{ width: "15%" }}>Tạo cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, preModal || "")}>Hủy bỏ</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function SanPhamForm() {
  return (
    <Form className='d-flex gap-5 m-5 justify-content-center'>
      <FormGroup className='d-flex flex-column gap-3 ' style={{ width: "40%" }}>
        <FormControl type='file' />
        <Image className='bg-dark w-100 h-100' />
      </FormGroup>

      <FormGroup className='d-flex gap-4 flex-wrap w-100'>
        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Tên sản phẩm</FormLabel>
          <FormControl />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Xuất xứ</FormLabel>
          <FormSelect>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Chip xử lý</FormLabel>
          <FormControl />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Dung lượng pin</FormLabel>
          <InputGroup>
            <FormControl type='number' />
            <InputGroup.Text>mAh</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Kích thước màn</FormLabel>
          <InputGroup>
            <FormControl type='number' />
            <InputGroup.Text>inch</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera trước</FormLabel>
          <InputGroup>
            <FormControl type='number' />
            <InputGroup.Text>MP</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera sau</FormLabel>
          <InputGroup>
            <FormControl type='number' />
            <InputGroup.Text>MP</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Hệ điều hành</FormLabel>
          <FormSelect>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Phiên bản hệ điều hành</FormLabel>
          <FormControl />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thời gian bảo hành</FormLabel>
          <InputGroup>
            <FormControl type='number' />
            <InputGroup.Text>Tháng</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thương hiệu</FormLabel>
          <FormSelect>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>
      </FormGroup>
    </Form >
  )
}

export default SanPhamB;