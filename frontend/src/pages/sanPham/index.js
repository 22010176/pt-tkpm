import { createContext, useContext, useEffect, useState } from 'react'
import { faCirclePlus, faPencil, faTrashCan, faRectangleList, faFileExcel, faFileExport } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, ModalBody, ModalFooter, FormGroup, FormControl, Image, FormLabel, FormSelect, InputGroup } from 'react-bootstrap'
import { v4 } from 'uuid'

import { wait } from '../../api'

import SideNavbar from '../../components/layouts/sideBar'
import ToolBtn from '../../components/buttons/toolBtn'
import Page2 from '../../components/layouts/Page2'
import SearchForm from '../../components/Forms/searchForm'
import TableA from '../../components/tables/tableA'
import HeaderModalA from '../../components/modals/headerA'
import ContentA from '../../components/layouts/blockContent'
import ErrorModal from '../../components/modals/errorModal'

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
          <CauHinhModal show={modal === "ch"} onModalHide={openModal.bind({}, preModal)} />

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

function CauHinhModal({ onModalHide, ...prop }) {
  const [formData,] = useContext(SanPhamContext)
  const [data, setData] = useState({ ...defaultCauHinh })

  const [tableData, setTableData] = useState([]);

  useEffect(function () {
    getCHData()
  }, [])

  function getCHData() {
    setTableData([])
    wait(.5).then(() => setTableData(new Array(100).fill().map(i => ({
      ma: v4(), ram: 4, rom: 2, mauSac: "Dd", giaNhap: 55, giaXuat: 55
    }))))
    setData({ ...defaultCauHinh })
  }

  function onHide() {
    if (typeof onModalHide === 'function') onModalHide();
  }

  function onDataChange(key, e) {
    setData(src => ({ ...src, [key]: e.target.value }))
  }

  function onInsertCauHinh() {
    // send data
    console.log(formData.ma)

    getCHData();
  }

  function onUpdateCauHinh() {
    // send data
    console.log(formData.ma)

    getCHData();
  }

  function onDeleteCauHinh() {
    // send data
    console.log(formData.ma)

    getCHData();
  }

  return (
    <Modal {...prop} scrollable size='xl' centered backdrop="static">
      <HeaderModalA title="TẠO CẤU HÌNH" />

      <ModalBody className='d-flex p-5 flex-column gap-4'>
        <Form className='d-flex justify-content-between gap-4'>
          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>ROM</FormLabel>
            <FormSelect value={data.rom} onChange={onDataChange.bind({}, "rom")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>RAM</FormLabel>
            <FormSelect value={data.ram} onChange={onDataChange.bind({}, "ram")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Màu sắc</FormLabel>
            <FormSelect value={data.mauSac} onChange={onDataChange.bind({}, "mauSac")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </FormSelect>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Giá nhập</FormLabel>
            <InputGroup>
              <FormControl type='number' value={data.giaNhap} onChange={onDataChange.bind({}, "giaNhap")} />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Giá xuất</FormLabel>
            <InputGroup>
              <FormControl type='number' value={data.giaXuat} onChange={onDataChange.bind({}, "giaXuat")} />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </FormGroup>
        </Form>

        <div className='d-flex gap-4' style={{ height: "40vh" }}>
          <ContentA style={{ width: "80%" }}>
            <TableA index headers={chHeader} data={tableData} onClick={setData} />
            {/* <div style={{ height: "1000px" }}></div> */}
          </ContentA>
          <div className='d-flex flex-column justify-content-around flex-grow-1'>
            <Button className='py-2 fw-semibold' variant='primary' onClick={onInsertCauHinh}>Thêm cấu hình</Button>
            <Button className='py-2 fw-semibold' variant='warning' onClick={onUpdateCauHinh}>Sửa cấu hình</Button>
            <Button className='py-2 fw-semibold' variant='danger' onClick={onDeleteCauHinh}>Xóa cấu hình</Button>
            <Button className='py-2 fw-semibold' variant='success' onClick={getCHData}>Làm mới</Button>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className='justify-content-center gap-5'>
        <Button variant='primary' style={{ width: "15%" }}>Tạo cấu hình</Button>
        <Button variant='danger' style={{ width: "15%" }} onClick={onHide}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

export default SanPhamB;