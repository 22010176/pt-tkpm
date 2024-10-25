import {useState} from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter
} from 'react-bootstrap'
import {
  faArrowRotateRight,
  faCircleInfo,
  faCirclePlus,
  faCircleXmark,
  faFileExport,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

import ToolBtn from '../../../components/buttons/toolBtn'
import HeaderModalA from '../../../components/modals/headerA'
import IconBtn from '../../../components/buttons/iconBtn'
import ContentA from '../../../components/layouts/blockContent'
import TableA from '../../../components/tables/tableA'
import Page3 from '../../../components/layouts/Page3'
import SideNavbar from '../../../components/layouts/sideBar'
import colors from '../../../utilities/colors'
import InputShadow from '../../../components/Forms/InputShadow'
import HeaderModalB from "../../../components/modals/headerB";

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

const phieuXuatHeader = [
  {key: "Mã sp", value: "tenSP"},
  {key: "Tên sản phẩm", value: "tonKho"},
  {key: "RAM", value: "tonKho"},
  {key: "ROM", value: "tonKho"},
  {key: "Màu sắc", value: "tonKho"},
  {key: "Mã IMEI", value: "tonKho"},
  {key: "Đơn giá", value: "tonKho"},
]

const phieuBaoHanhHD = [
  {key: "Mã SP", value: ""},
  {key: "Tên sản phẩm", value: ""},
  {key: "RAM", value: ""},
  {key: "ROM", value: ""},
  {key: "Màu sắc", value: ""},
  {key: "Mã IMEI", value: ""},
  {key: "Đơn giá", value: ""},
  {key: "Thời gian bảo hành", value: ""},
]

function XuatKho() {
  const [modal, setModal] = useState("")

  function openModal(key, e) {
    setModal(key);
  }

  return (
    <>
      <Page3
        sidebar={<SideNavbar/>}
        tools={<>
          <ToolBtn as="a" className="_border-focus-green" href="/xuat-kho/them" color={colors.green} icon={faCirclePlus}
                   title="Thêm"/>
          <ToolBtn color={colors.blue} icon={faCircleInfo} title="Chi tiết" onClick={openModal.bind({}, "info")}/>
          <ToolBtn color={colors.red} icon={faCircleXmark} title="Hủy"/>
          <ToolBtn color={colors.green} icon={faFileExport} title="Xuất Excel"/>
        </>}
        rightForm={<>
          <InputShadow as={FormControl} className='w-auto' type='text' placeholder='Tìm kiếm'/>
          <IconBtn icon={faMagnifyingGlass} className="btn-primary w-auto btn-lg"/>
          <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-success w-auto'"/>
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
            <Form.Control type='date'/>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Đến ngày</Form.Label>
            <Form.Control type='date'/>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Từ số tiền</Form.Label>
            <InputGroup>
              <Form.Control type='number'/>
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label className='fw-bold'>Đến số tiền</Form.Label>
            <InputGroup>
              <Form.Control type='number'/>
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </>}
        table={<TableA headers={phieuNhapHd}/>}
      />


      <Modal centered scrollable size='xl' show={modal === "info"} className='vh-100'>
        <HeaderModalA title="THÔNG TIN PHIẾU XUẤT"/>

        <ModalBody className='d-flex flex-column gap-5 p-5'>
          <Form className='d-flex gap-5 justify-content-between'>
            <FormGroup>
              <FormLabel className='fw-bold'>Mã phiếu</FormLabel>
              <InputShadow disabled/>
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Nhân viên xuất</FormLabel>
              <InputShadow disabled/>
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Khách hàng</FormLabel>
              <InputShadow disabled/>
            </FormGroup>
            <FormGroup>
              <FormLabel className='fw-bold'>Thời gian</FormLabel>
              <InputShadow disabled type="date"/>
            </FormGroup>
          </Form>

          <ContentA>
            <TableA headers={phieuXuatHeader}/>
            <div style={{height: "1000px"}}></div>
          </ContentA>
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button variant='primary' style={{width: "20%"}}>Xuất PDF</Button>
          <Button variant='danger' style={{width: "20%"}} onClick={openModal.bind({}, "")}>Hủy</Button>
          <Button variant='success' style={{width: "20%"}} onClick={openModal.bind({}, "baoHanh")}>Xem phiếu bảo
            hành</Button>
        </ModalFooter>
      </Modal>

      <Modal show={modal === "baoHanh"} size='xl' className='vh-100' centered scrollable>
        <HeaderModalB className={"d-flex flex-column gap-2 text-center"}>
          <h1 className={"fs-3"}> PHIẾU BẢO HÀNH </h1>
          <h2 className="fs-5 fst-italic">Vui lòng trình phiếu bảo hành khi có nhu cầu sửa chữa, bảo hành!</h2>
        </HeaderModalB>

        <ModalBody className="_vh-70 d-flex flex-column gap-2">
          <div className="mx-5">
            <h3 className="text-center mb-4 fw-bold">Thông tin khách hàng</h3>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Họ và tên: </p>
                  <span>Tst</span>
                </div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Email: </p>
                  <span>Tst</span>
                </div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Số điện thoại:</p>
                  <span>Tst</span>
                </div>
              </div>

              <div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Mã khách hàng: </p>
                  <span>Tst</span>
                </div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Mã hóa đơn mua hàng: </p>
                  <span>Tst</span>
                </div>
                <div className="d-flex gap-2 fs-5">
                  <p className="fw-bold">Ngày mua hàng: </p>
                  <span>Tst</span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex h-100 w-100 flex-column overflow-hidden">
            <h3 className="text-center mb-4 fw-bold">Danh sách sản phẩm đã mua</h3>
            <div className="h-100 overflow-auto border">
              <TableA headers={phieuBaoHanhHD}/>
              <div style={{height: "1000px"}}></div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className='justify-content-center p-3 d-flex gap-5'>
          <Button variant='primary' style={{width: "20%"}}>Xuất PDF</Button>
          <Button variant='danger' style={{width: "20%"}} onClick={openModal.bind({}, "")}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default XuatKho