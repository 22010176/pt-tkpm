import { createContext, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faArrowRotateRight, faMagnifyingGlass, faPencil, faTrashCan, faRectangleList, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, ModalBody, ModalFooter, FormGroup, FormControl, Image, FormLabel, FormSelect, InputGroup } from 'react-bootstrap'
import { v4 } from 'uuid'

import { wait } from '../../../api'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import TableA from '../../../components/tables/tableA'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'
import ErrorModal from '../../../components/modals/errorModal'
import CauHinhModal from '../cauHinh'
import exportExcel from '../../../components/excel'
import FlexForm from '../../../components/Forms/FlexForm'

import colors from '../../../utilities/colors'
import InputShadow from '../../../components/Forms/InputShadow'
import GroupShadow from '../../../components/Forms/GroupShadow'

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

const colToName = Object.fromEntries(spHeader.map(({ key, value }) => [value, key]))

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
      ma: v4(), tenSP: "test3", soLuong: Math.floor(Math.random() * 1000), thuongHieu: "aaa", heDieuHanh: "aaa", pbHDH: "aaa", xuatXu: "aa"
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

  function onImportExcel() {
    const elem = document.getElementById("input-xlms")
    elem.click()
    const file = elem.value
    console.log(file)
  }

  function onExportExcel() {
    const result = sanPhamData.map(i => Object.fromEntries(Object.entries(i).map(([key, value]) => [colToName[key], value])))
    exportExcel(result, "sản phẩm")
  }
  return (
    <>
      <Page2
        sidebar={<SideNavbar />}
        tools={<>
          <FormControl id='input-xlms' type='file' className='d-none' />
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={onOpenInsertModal} />
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenUpdateModal} />
          <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDeleteSP} />
          <ToolBtn className="_border-blue-focus" color={colors.blue} icon={faRectangleList} title="DS IMEI" onClick={openModal.bind({}, "imei")} />
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExcel} title="Nhập Excel" onClick={onImportExcel} />
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExport} title="Xuất Excel" onClick={onExportExcel} />
        </>}
        rightSec={<FlexForm>
          <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm" />
          <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success' >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <Button className='d-flex gap-2 align-items-center' variant='primary'>
            <FontAwesomeIcon icon={faArrowRotateRight} />
            <span>Làm mới</span>
          </Button>
        </FlexForm>}
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
                  <InputShadow as={FormSelect}>
                    <option>test1</option>
                    <option>test2</option>
                    <option>test3</option>
                  </InputShadow>
                </FormGroup>

                <FormGroup className='flex-grow-1'>
                  <FormLabel className='fw-bold'>Tình trạng</FormLabel>
                  <InputShadow as={FormSelect}>
                    <option>test1</option>
                    <option>test2</option>
                    <option>test3</option>
                  </InputShadow>
                </FormGroup>

                <FormGroup className='flex-grow-1'>
                  <FormLabel className='fw-bold'>Tìm kiếm</FormLabel>
                  <InputShadow type='text' />
                </FormGroup>
              </Form>

              <ContentA style={{ height: "40vh" }}>
                <TableA index headers={imeiHeader} />
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
    <Form className='d-flex gap-5 mx-5 justify-content-center'>
      <FormGroup className='d-flex flex-column gap-3 ' style={{ width: "40%" }}>
        <InputShadow type='file' onChange={onDataChange.bind({}, "img")} />
        <Image className='w-100 h-100 shadow' src={img} />
      </FormGroup>

      <FormGroup className='d-flex gap-4 flex-wrap w-100'>
        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Tên sản phẩm</FormLabel>
          <InputShadow type='text' value={data.tenSP} onChange={onDataChange.bind({}, "tenSP")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Xuất xứ</FormLabel>
          <InputShadow as={FormSelect} value={data.xuatXu} onChange={onDataChange.bind({}, "xuatXu")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Chip xử lý</FormLabel>
          <InputShadow type='text' value={data.cpu} onChange={onDataChange.bind({}, "cpu")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Dung lượng pin</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.pin} onChange={onDataChange.bind({}, "pin")} />
            <InputGroup.Text>mAh</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Kích thước màn</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.kichThuocMan} onChange={onDataChange.bind({}, "kichThuocMan")} />
            <InputGroup.Text>inch</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera trước</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.camTruoc} onChange={onDataChange.bind({}, "camTruoc")} />
            <InputGroup.Text>MP</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Camera sau</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.camSau} onChange={onDataChange.bind({}, "camSau")} />
            <InputGroup.Text>MP</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Hệ điều hành</FormLabel>
          <InputShadow as={FormSelect} value={data.heDieuHanh} onChange={onDataChange.bind({}, "heDieuHanh")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Phiên bản hệ điều hành</FormLabel>
          <InputShadow type='text' value={data.pbHDH} onChange={onDataChange.bind({}, "pbHDH")} />
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thời gian bảo hành</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.baoHanh} onChange={onDataChange.bind({}, "baoHanh")} />
            <InputGroup.Text>Tháng</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{ width: "30%" }}>
          <FormLabel className='fs-6 fw-bold'>Thương hiệu</FormLabel>
          <InputShadow as={FormSelect} value={data.thuongHieu} onChange={onDataChange.bind({}, "thuongHieu")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>
      </FormGroup>
    </Form >
  )
}

export default SanPham;