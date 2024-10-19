import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faRectangleList, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, ModalBody, ModalFooter, FormGroup, FormControl, Image, FormLabel, FormSelect, InputGroup } from 'react-bootstrap'
import { v4 } from 'uuid'

import { wait } from '../../../api'

import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import SearchForm from '../../../components/Forms/searchForm'
import TableA from '../../../components/tables/tableA'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'
import ErrorModal from '../../../components/modals/errorModal'
import CauHinhModal from '../cauHinh'

const SanPhamContext = createContext();
const ImageContext = createContext();

const defaultSanPham = {
  ma: undefined,
  tenSP: "",
  soLuong: "",
  thuongHieu: "",
  heDieuHanh: "",
  xuatXu: "",
  cpu: "",
  pin: "",
  kichThuocMan: "",
  camTruoc: "",
  camSau: "",
  pbHDH: "",
  baoHanh: ""
}
const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sản phẩm", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "soLuong" },
  { key: "Thương hiệu", value: "thuongHieu" },
  { key: "Hệ điều hành", value: "heDieuHanh" },
  { key: "Phiên bản HĐH", value: "pbHDH" },
  { key: "Xuất xứ", value: "xuatXu" },
]

const imeiHeader = [
  { key: "IMEI", value: "imei" },
  { key: "Mã phiếu nhập", value: "phieuNhap" },
  { key: "Mã phiếu xuất", value: "phieuXuat" },
  { key: "Tình trạng", value: "tinhTrang" },
]

function SanPham() {
  const [modal, setModal] = useState("");
  const [preModal, setPreModal] = useState("");

  const [sanPhamData, setSanPhamData] = useState([])

  const [formData, setFormData] = useState({ ...defaultSanPham })
  const [img, setImg] = useState();
  const [rowClick, setRowClick] = useState();

  useEffect(function () {
    getSPData();
  }, [])

  async function getSPData() {
    setSanPhamData([])
    await wait(.5)
    setSanPhamData(new Array(100).fill().map(i => ({
      ma: v4(), tenSP: "test3", soLuong: 44, thuongHieu: "aaa", heDieuHanh: "aaa", pbHDH: "aaa", xuatXu: "aa"
    })));
  }

  function openModal(key, e) {
    setPreModal(modal)
    setModal(key);
  }

  function onOpenInsertModal() {
    setFormData({ ...defaultSanPham })
    setImg()
    openModal("insertSP")
  }

  function onOpenUpdateModal() {
    if (!rowClick) return openModal("error")
    const data = { ...rowClick }

    // get all data from api

    setFormData(data)
    openModal("updateSP")
  }

  function onOpenCauHinhModal() {
    openModal("ch")
  }

  function onInsertSP(e) {
    // Send data to api

    onOpenCauHinhModal()

  }

  function onUpdateSP(e) {
    // send data to api

  }

  function onDeleteSP() {
    if (!rowClick) return openModal("error")

    // send request to api
  }

  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal} />
          <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={onOpenUpdateModal} />
          <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" onClick={onDeleteSP} />
          <ToolBtn color="#2b78e4" icon={faRectangleList} title="DS IMEI" onClick={openModal.bind({}, "imei")} />
          <ToolBtn color="#009e0f" icon={faFileExcel} title="Nhập Excel" />
          <ToolBtn color="#009e0f" icon={faFileExport} title="Xuất Excel" />
        </>}
        rightSec={<SearchForm />}
        dataTable={<TableA headers={spHeader} data={sanPhamData} index onClick={setRowClick} />}
      />

      <SanPhamContext.Provider value={[formData, setFormData]}>
        <ImageContext.Provider value={[img, setImg]}>

          {/* Add SanPham */}
          <Modal scrollable show={modal === "insertSP"} centered size='xl' backdrop="static">
            <HeaderModalA title={"THÊM SẢN PHẨM MỚI"} />

            <ModalBody >
              <SanPhamForm />
            </ModalBody>

            <ModalFooter className='justify-content-center gap-5'>
              <Button variant='primary' style={{ width: "15%" }} onClick={onInsertSP.bind({})}>Tạo cấu hình</Button>
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
              <Button variant='primary' style={{ width: "15%" }} onClick={onUpdateSP.bind({})}>Lưu thông tin</Button>
              <Button variant='warning' style={{ width: "15%" }} onClick={onOpenCauHinhModal.bind({})}>Sửa cấu hình</Button>
              <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, "")}>Hủy bỏ</Button>
            </ModalFooter>
          </Modal>

          {/* Cấu hình */}
          <CauHinhModal sanPham={formData} show={modal === "ch"} onModalHide={openModal.bind({}, preModal)} />

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

            <ModalFooter className='justify-content-center'>
              <Button variant='danger' style={{ width: "15%" }} onClick={openModal.bind({}, preModal || "")}>Đóng</Button>
            </ModalFooter>
          </Modal>

          <ErrorModal show={modal === "error"} onHide={openModal.bind({})}>
            Phải chọn 1 sản phẩm!!!
          </ErrorModal>
        </ImageContext.Provider>
      </SanPhamContext.Provider>
    </>
  )
}

function SanPhamForm() {
  const [data, setData] = useContext(SanPhamContext)
  const [img, setImg] = useContext(ImageContext)

  function onDataChange(key, e) {
    if (key !== 'img') return setData(src => ({ ...src, [key]: e.target.value }))
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <Form className='d-flex gap-5 m-5 justify-content-center'>
      <FormGroup className='d-flex flex-column gap-3 ' style={{ width: "40%" }}>
        <FormControl type='file' onChange={onDataChange.bind({}, "img")} />
        <Image className='w-100 h-100' src={img} />
      </FormGroup>

      <FormGroup className='d-flex gap-4 flex-wrap w-100'>
        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Tên sản phẩm</FormLabel>
          <FormControl type='text' value={data.tenSP} onChange={onDataChange.bind({}, "tenSP")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Xuất xứ</FormLabel>
          <FormSelect value={data.xuatXu} onChange={onDataChange.bind({}, "xuatXu")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Chip xử lý</FormLabel>
          <FormControl type='text' value={data.cpu} onChange={onDataChange.bind({}, "cpu")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Dung lượng pin</FormLabel>
          <InputGroup>
            <FormControl type='number' min={0} value={data.pin} onChange={onDataChange.bind({}, "pin")} />
            <InputGroup.Text>mAh</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Kích thước màn</FormLabel>
          <InputGroup>
            <FormControl type='number' min={0} value={data.kichThuocMan} onChange={onDataChange.bind({}, "kichThuocMan")} />
            <InputGroup.Text>inch</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera trước</FormLabel>
          <InputGroup>
            <FormControl type='number' min={0} value={data.camTruoc} onChange={onDataChange.bind({}, "camTruoc")} />
            <InputGroup.Text>MP</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera sau</FormLabel>
          <InputGroup>
            <FormControl type='number' min={0} value={data.camSau} onChange={onDataChange.bind({}, "camSau")} />
            <InputGroup.Text>MP</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Hệ điều hành</FormLabel>
          <FormSelect value={data.heDieuHanh} onChange={onDataChange.bind({}, "heDieuHanh")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Phiên bản hệ điều hành</FormLabel>
          <FormControl type='text' value={data.pbHDH} onChange={onDataChange.bind({}, "pbHDH")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thời gian bảo hành</FormLabel>
          <InputGroup>
            <FormControl type='number' min={0} value={data.baoHanh} onChange={onDataChange.bind({}, "baoHanh")} />
            <InputGroup.Text>Tháng</InputGroup.Text>
          </InputGroup>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thương hiệu</FormLabel>
          <FormSelect value={data.thuongHieu} onChange={onDataChange.bind({}, "thuongHieu")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </FormSelect>
        </FormGroup>
      </FormGroup>
    </Form >
  )
}

export default SanPham;