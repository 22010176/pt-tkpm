import {createContext, useContext, useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus, faArrowRotateRight, faMagnifyingGlass, faPencil, faTrashCan, faRectangleList, faFileExcel, faFileExport} from '@fortawesome/free-solid-svg-icons'
import {Modal, Button, Form, ModalBody, ModalFooter, FormGroup, FormControl, Image, FormLabel, FormSelect, InputGroup} from 'react-bootstrap'
import {v4} from 'uuid'

import {wait} from '../../../api'
import SideNavbar from '../../../components/layouts/sideBar'
import ToolBtn from '../../../components/buttons/toolBtn'
import Page2 from '../../../components/layouts/Page2'
import TableA from '../../../components/tables/tableA'
import HeaderModalA from '../../../components/modals/headerA'
import ContentA from '../../../components/layouts/blockContent'
import ErrorModal from '../../../components/modals/errorModal'
import exportExcel from '../../../components/excel'
import FlexForm from '../../../components/Forms/FlexForm'

import colors from '../../../utilities/colors'
import InputShadow from '../../../components/Forms/InputShadow'
import GroupShadow from '../../../components/Forms/GroupShadow'

import {colToName} from "../../../utilities/others";

const defaultSanPham = {
  maDanhMucSanPham: "",
  tenDanhMucSanPham: "",
  chipXuLy: "",
  dungLuongPin: "",
  kichThuongManHinh: "",
  cameraTruoc: "",
  cameraSau: "",
  phienBanHeDieuHanh: "",
  thoiGianBaoHanh: "",
  hinhAnh: "",
  xuatXu: "",
  heDieuHanh: "",
  thuongHieu: "",

}
const spHeader = [
  {key: "Mã SP", value: "maDanhMucSanPham"},
  {key: "Tên sản phẩm", value: "tenDanhMucSanPham"},
  {key: "Tồn kho", value: "soLuong"},
  {key: "Thương hiệu", value: "thuongHieu"},
  {key: "Hệ điều hành", value: "heDieuHanh"},
  {key: "Phiên bản HĐH", value: "phienBanHeDieuHanh"},
  {key: "Xuất xứ", value: "xuatXu"},
]


const imeiHeader = [
  {key: "IMEI", value: "imei"},
  {key: "Mã phiếu nhập", value: "phieuNhap"},
  {key: "Mã phiếu xuất", value: "phieuXuat"},
  {key: "Tình trạng", value: "tinhTrang"},
]


const defaultCauHinh = {ma: undefined, ram: "", rom: "", mauSac: "", giaNhap: "", giaXuat: ""}
const chHeader = [
  {key: "RAM", value: "ram"},
  {key: "ROM", value: "rom"},
  {key: "Màu sắc", value: "mauSac"},
  {key: "Giá nhập", value: "giaNhap"},
  {key: "Giá xuất", value: "giaXuat"}
]


function SanPham() {
  const [modal, setModal] = useState("");
  const [preModal, setPreModal] = useState("");

  const [sanPhamData, setSanPhamData] = useState([])


  useEffect(function () {
    getSPData();
  }, [])

  async function getSPData() {
    setSanPhamData([])
  }

  function openModal(key, e) {
    setPreModal(modal)
    setModal(key);
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
        sidebar={<SideNavbar/>}
        tools={<>
          <FormControl id='input-xlms' className='d-none'/>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm"/>
          <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa"/>
          <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa"/>
          <ToolBtn className="_border-blue-focus" color={colors.blue} icon={faRectangleList} title="DS IMEI" onClick={openModal.bind({}, "imei")}/>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExcel} title="Nhập Excel" onClick={onImportExcel}/>
          <ToolBtn className="_border-green-focus" color={colors.green} icon={faFileExport} title="Xuất Excel" onClick={onExportExcel}/>
        </>}
        rightSec={<FlexForm>
          <InputShadow as={FormControl} className="w-auto" placeholder="Tìm kiếm"/>
          <Button className='d-flex gap-2 align-items-center px-4 opacity-2' size='lg' variant='success'>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
          <Button className='d-flex gap-2 align-items-center' variant='primary'>
            <FontAwesomeIcon icon={faArrowRotateRight}/>
            <span>Làm mới</span>
          </Button>
        </FlexForm>}
        dataTable={<TableA headers={spHeader} data={sanPhamData}/>}
      />

      {/* Add SanPham */}
      <InsertSanPhamModal/>

      {/* Update SanPham */}
      <UpdateSanPhamModal/>

      {/* Cấu hình */}
      <CauHinhModal show={modal === "ch"} onModalHide={openModal.bind({}, preModal)}/>

      {/* IMEI */}
      <ImeiModal/>

      <ErrorModal show={modal === "error"} onHide={openModal.bind({})}>
        Phải chọn 1 sản phẩm!!!
      </ErrorModal>
    </>
  )
}

function InsertSanPhamModal({...props}) {
  const DataContext = createContext({})

  return (
    <Modal {...props} scrollable centered size='xl' backdrop="static">
      <HeaderModalA title={"THÊM SẢN PHẨM MỚI"}/>

      <ModalBody>
        <DataContext.Provider value={[]}>
          <SanPhamForm DataContext={DataContext}/>
        </DataContext.Provider>
      </ModalBody>

      <ModalFooter className='justify-content-center gap-5'>
        <Button variant='primary' style={{width: "15%"}}>Tạo cấu hình</Button>
        <Button variant='danger' style={{width: "15%"}}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

function UpdateSanPhamModal({...prop}) {
  const DataContext = createContext({})
  return (
    <Modal {...prop} scrollable centered size='xl' backdrop="static">
      <HeaderModalA title={"CHỈNH SỬA SẢN PHẨM MỚI"}/>

      <ModalBody>
        <DataContext.Provider value={[]}>
          <SanPhamForm DataContext={DataContext}/>
        </DataContext.Provider>
      </ModalBody>

      <ModalFooter className='justify-content-center gap-5'>
        <Button variant='primary' style={{width: "15%"}}>Lưu thông tin</Button>
        <Button variant='warning' style={{width: "15%"}}>Sửa cấu hình</Button>
        <Button variant='danger' style={{width: "15%"}}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

function ImeiModal({...prop}) {
  return (
    <Modal {...prop} scrollable size="xl" centered>
      <HeaderModalA title="DANH SÁCH IMEI"/>

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
            <InputShadow type='text'/>
          </FormGroup>
        </Form>

        <ContentA style={{height: "40vh"}}>
          <TableA index headers={imeiHeader}/>
        </ContentA>
      </ModalBody>

      <ModalFooter className='justify-content-center'>
        <Button variant='danger' style={{width: "15%"}}>Đóng</Button>
      </ModalFooter>
    </Modal>
  )
}

function SanPhamForm({DataContext}) {
  const [] = useContext(DataContext)
  const data = {}

  function onDataChange(key, e) {
    // if (key !== 'img') return setData(src => ({...src, [key]: e.target.value}))
    // setImg(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <Form className='d-flex gap-5 mx-5 justify-content-center'>
      <FormGroup className='d-flex flex-column gap-3 ' style={{width: "40%"}}>
        <InputShadow type='file' onChange={onDataChange.bind({}, "img")}/>
        <Image className='w-100 h-100 shadow'/>
        {/*src={img}*/}
      </FormGroup>
      <FormGroup className='d-flex gap-4 flex-wrap w-100'>
        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Tên sản phẩm</FormLabel>
          <InputShadow type='text' value={data.tenSP} onChange={onDataChange.bind({}, "tenSP")}/>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Xuất xứ</FormLabel>
          <InputShadow as={FormSelect} value={data.xuatXu} onChange={onDataChange.bind({}, "xuatXu")}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Chip xử lý</FormLabel>
          <InputShadow type='text' value={data.cpu} onChange={onDataChange.bind({}, "cpu")}/>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Dung lượng pin</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.pin} onChange={onDataChange.bind({}, "pin")}/>
            <InputGroup.Text>mAh</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Kích thước màn</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.kichThuocMan} onChange={onDataChange.bind({}, "kichThuocMan")}/>
            <InputGroup.Text>inch</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Camera trước</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.camTruoc} onChange={onDataChange.bind({}, "camTruoc")}/>
            <InputGroup.Text>MP</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Camera sau</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.camSau} onChange={onDataChange.bind({}, "camSau")}/>
            <InputGroup.Text>MP</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Hệ điều hành</FormLabel>
          <InputShadow as={FormSelect} value={data.heDieuHanh} onChange={onDataChange.bind({}, "heDieuHanh")}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Phiên bản hệ điều hành</FormLabel>
          <InputShadow type='text' value={data.pbHDH} onChange={onDataChange.bind({}, "pbHDH")}/>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Thời gian bảo hành</FormLabel>
          <GroupShadow>
            <FormControl type='number' min={0} value={data.baoHanh} onChange={onDataChange.bind({}, "baoHanh")}/>
            <InputGroup.Text>Tháng</InputGroup.Text>
          </GroupShadow>
        </FormGroup>

        <FormGroup className=' my-3' style={{width: "30%"}}>
          <FormLabel className='fs-6 fw-bold'>Thương hiệu</FormLabel>
          <InputShadow as={FormSelect} value={data.thuongHieu} onChange={onDataChange.bind({}, "thuongHieu")}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </InputShadow>
        </FormGroup>
      </FormGroup>
    </Form>
  )
}

function CauHinhModal({sanPham, onModalHide, ...prop}) {
  const [data, setData] = useState({...defaultCauHinh})
  const [tableData, setTableData] = useState([]);

  useEffect(function () {
    getCHData()
  }, [])

  function getCHData() {
    setTableData([])
    wait(.5).then(() => setTableData(new Array(100).fill().map(i => ({
      ma: v4(), ram: 4, rom: 2, mauSac: "Dd", giaNhap: 55, giaXuat: 55
    }))))
    setData({...defaultCauHinh})
  }

  function onHide() {
    if (typeof onModalHide === 'function') onModalHide();
  }

  function onDataChange(key, e) {
    setData(src => ({...src, [key]: e.target.value}))
  }

  function onInsertCauHinh() {
    // send data
    console.log(sanPham.ma)

    getCHData();
  }

  function onUpdateCauHinh() {
    // send data
    console.log(sanPham.ma)

    getCHData();
  }

  function onDeleteCauHinh() {
    // send data
    console.log(sanPham.ma)

    getCHData();
  }

  return (
    <Modal {...prop} scrollable size='xl' centered backdrop="static">
      <HeaderModalA title="TẠO CẤU HÌNH"/>

      <ModalBody className='d-flex p-5 flex-column gap-4'>
        <Form className='d-flex justify-content-between gap-4'>
          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>ROM</FormLabel>
            <InputShadow as={FormSelect} value={data?.rom} onChange={onDataChange.bind({}, "rom")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </InputShadow>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>RAM</FormLabel>
            <InputShadow as={FormSelect} value={data?.ram} onChange={onDataChange.bind({}, "ram")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </InputShadow>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Màu sắc</FormLabel>

            <InputShadow as={FormSelect} value={data?.mauSac} onChange={onDataChange.bind({}, "mauSac")}>
              <option>test1</option>
              <option>test2</option>
              <option>test3</option>
            </InputShadow>
          </FormGroup>

          <FormGroup className='shadow-1 flex-grow-1'>
            <FormLabel className='fw-bold'>Giá nhập</FormLabel>
            <InputGroup className='shadow-sm'>
              <FormControl type='number' value={data?.giaNhap} onChange={onDataChange.bind({}, "giaNhap")}/>
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Giá xuất</FormLabel>
            <GroupShadow className='shadow-sm'>
              <FormControl type='number' value={data?.giaXuat} onChange={onDataChange.bind({}, "giaXuat")}/>
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </GroupShadow>
          </FormGroup>
        </Form>

        <div className='d-flex gap-4' style={{height: "40vh"}}>
          <ContentA style={{width: "80%"}}>
            <TableA index headers={chHeader} data={tableData} onClick={setData}/>
          </ContentA>
          <div className='d-flex flex-column justify-content-around flex-grow-1'>
            <Button className='py-2 fw-semibold shadow-sm' variant='primary' onClick={onInsertCauHinh}>Thêm cấu hình</Button>
            <Button className='py-2 fw-semibold shadow-sm' variant='warning' onClick={onUpdateCauHinh}>Sửa cấu hình</Button>
            <Button className='py-2 fw-semibold shadow-sm' variant='danger' onClick={onDeleteCauHinh}>Xóa cấu hình</Button>
            <Button className='py-2 fw-semibold shadow-sm' variant='success' onClick={getCHData}>Làm mới</Button>
          </div>
        </div>
      </ModalBody>

      <ModalFooter className='justify-content-center gap-5'>
        <Button className="shadow-sm" variant='primary' style={{width: "15%"}}>Tạo cấu hình</Button>
        <Button className="shadow-sm" variant='danger' style={{width: "15%"}} onClick={onHide}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

export default SanPham;