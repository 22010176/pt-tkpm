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
import {deleteProduct, getProducts, insertProduct, updateProduct} from "../../../api/products";
import {getProductAttributes} from "../../../api/product-attributes";

const defaultSanPham = {
  maDanhMucSanPham: "", tenDanhMucSanPham: "", chipXuLy: "", dungLuongPin: "", kichThuongManHinh: "", cameraTruoc: "", cameraSau: "", phienBanHeDieuHanh: "", thoiGianBaoHanh: "", hinhAnh: "", xuatXu: "", heDieuHanh: "", thuongHieu: "",
}

const spHeader = [
  {key: "Mã SP", value: "maDanhMucSanPham"},
  {key: "Tên sản phẩm", value: "tenDanhMucSanPham"},
  {key: "Tồn kho", value: "soLuong"},
  {key: "Thương hiệu", value: "thuongHieu"},
  {key: "Hệ điều hành", value: "heDieuHanh"},
  {key: "Phiên bản HĐH", value: "phienBanHeDieuHanh"},
  {key: "Xuất xứ", value: "xuatXu"},

//   hide
  {key: "chipXuLy", value: "chipXuLy", hide: true}, {key: "dungLuongPin", value: "dungLuongPin", hide: true}, {key: "kichThuongManHinh", value: "kichThuongManHinh", hide: true},

  {key: "cameraTruoc", value: "cameraTruoc", hide: true}, {key: "cameraSau", value: "cameraSau", hide: true}, {key: "thoiGianBaoHanh", value: "thoiGianBaoHanh", hide: true}, {key: "hinhAnh", value: "hinhAnh", hide: true},]


const imeiHeader = [{key: "IMEI", value: "imei"}, {key: "Mã phiếu nhập", value: "phieuNhap"}, {key: "Mã phiếu xuất", value: "phieuXuat"}, {key: "Tình trạng", value: "tinhTrang"},]

const defaultCauHinh = {ma: undefined, ram: "", rom: "", mauSac: "", giaNhap: "", giaXuat: ""}
const chHeader = [{key: "RAM", value: "ram"}, {key: "ROM", value: "rom"}, {key: "Màu sắc", value: "mauSac"}, {key: "Giá nhập", value: "giaNhap"}, {key: "Giá xuất", value: "giaXuat"}]
const SanPhamContext = createContext({})

function SanPham() {
  const [modal, setModal] = useState([]);
  const [table, setTable] = useState([])
  const [rowClick, setRowClick] = useState()

  useEffect(function () {
    getSPData();
  }, [])

  async function getSPData() {
    setTable([])
    getProducts().then(data => setTable(data.products))
  }


  function openModal(key, e) {
    setModal(src => [key, ...src]);
  }

  function closeModal() {
    setModal(src => src.splice(1));
  }

  function onImportExcel() {
    const elem = document.getElementById("input-xlms")
    elem.click()
    const file = elem.value
  }

  function onExportExcel() {
    const result = table.map(i => Object.fromEntries(Object.entries(i).map(([key, value]) => [colToName[key], value])))
    exportExcel(result, "sản phẩm")
  }

  async function onOpenUpdateModal() {
    if (!rowClick) return openModal("error")
    openModal("edit")
  }

  async function onInsert() {
    await getSPData()
  }

  async function onUpdate() {
    await getSPData()
  }

  async function onDelete() {
    if (!rowClick) return openModal("error")
    const result = await deleteProduct(rowClick)

    console.log(result)
    if (!result.success) return;

    setRowClick(undefined)
    await getSPData()
  }

  return (<>
    <Page2
      sidebar={<SideNavbar/>}
      tools={<>
        <FormControl id='input-xlms' className='d-none'/>
        <ToolBtn className="_border-green-focus" color={colors.green} icon={faCirclePlus} title="Thêm" onClick={openModal.bind({}, "add")}/>
        <ToolBtn className="_border-orange-focus-2" color={colors.orange_2} icon={faPencil} title="Sửa" onClick={onOpenUpdateModal}/>
        <ToolBtn className="_border-yellow-focus-2" color={colors.yellow_2} icon={faTrashCan} title="Xóa" onClick={onDelete}/>
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
      dataTable={<TableA headers={spHeader} data={table} onClick={setRowClick}/>}
    />

    <SanPhamContext.Provider value={[rowClick, setRowClick]}>
      {/* Add SanPham */}
      <InsertSanPhamModal show={modal[0] === 'add'} onSubmit={onInsert} onHide={closeModal}/>

      {/* Update SanPham */}
      <UpdateSanPhamModal show={modal[0] === 'edit'} onSubmit={onUpdate} onHide={closeModal}/>

      {/* IMEI */}
      <ImeiModal show={modal[0] === 'imei'} onHide={closeModal}/>
    </SanPhamContext.Provider>

    <ErrorModal show={modal[0] === "error"} onHide={closeModal}>
      Phải chọn 1 sản phẩm!!!
    </ErrorModal>
  </>)
}

function InsertSanPhamModal({onHide, onSubmit, ...props}) {
  // const DataContext = createContext({})

  const [data, setData] = useState({})

  async function onInsert() {
    const result = await insertProduct(data)

    if (!result.success) return;

    setData({...defaultSanPham})
    if (typeof onSubmit === 'function') onSubmit()
  }

  return (<Modal {...props} scrollable centered size='xl' backdrop="static">
    <HeaderModalA title={"THÊM SẢN PHẨM MỚI"}/>

    <ModalBody>
      <SanPhamForm data={data} setData={setData}/>
    </ModalBody>

    <ModalFooter className='justify-content-center gap-5'>
      <Button variant='primary' style={{width: "15%"}} onClick={onInsert}>Tạo cấu hình</Button>
      <Button variant='danger' style={{width: "15%"}} onClick={onHide}>Hủy bỏ</Button>
    </ModalFooter>
  </Modal>)
}

function UpdateSanPhamModal({onHide, onSubmit, ...prop}) {
  const [rowClick, setRowClick] = useContext(SanPhamContext)

  const [data, setData] = useState()

  useEffect(() => {
    setData(rowClick)
  }, [rowClick])

  async function onUpdate() {
    const result = await updateProduct(data)

    if (!result.success) return;

    if (typeof onSubmit === 'function') onSubmit()
    if (typeof onHide === 'function') onHide()
  }

  return (
    <Modal {...prop} scrollable centered size='xl' backdrop="static">
      <HeaderModalA title={"CHỈNH SỬA SẢN PHẨM MỚI"}/>

      <ModalBody>
        <SanPhamForm data={data} setData={setData}/>
      </ModalBody>

      <ModalFooter className='justify-content-center gap-5'>
        <Button variant='primary' style={{width: "15%"}} onClick={onUpdate}>Lưu thông tin</Button>
        <Button variant='warning' style={{width: "15%"}}>Sửa cấu hình</Button>
        <Button variant='danger' style={{width: "15%"}} onClick={onHide}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

function ImeiModal({onHide, ...prop}) {
  return (<Modal {...prop} scrollable size="xl" centered>
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
      <Button variant='danger' style={{width: "15%"}} onClick={onHide}>Đóng</Button>
    </ModalFooter>
  </Modal>)
}

function SanPhamForm({data, setData, ...props}) {
  const [xuatXu, setXuatXu] = useState([])
  const [heDieuHanh, setHeDieuHanh] = useState([])
  const [thuongHieu, setThuongHieu] = useState([])

  useEffect(() => {
    updateInfo()
  }, [])

  function updateInfo() {
    getProductAttributes('xuatXu')
    .then(({attributes}) => {
      setXuatXu(attributes)
      if (!data?.xuatXu) setData(src => ({...src, xuatXu: attributes[0]?.maXuatXu}))
    })

    getProductAttributes('heDieuHanh')
    .then(({attributes}) => {
      setHeDieuHanh(attributes)
      if (!data?.heDieuHanh) setData(src => ({...src, heDieuHanh: attributes[0]?.maHeDieuHanh}))
    })

    getProductAttributes('thuongHieu')
    .then(({attributes}) => {
      setThuongHieu(attributes)
      if (!data?.thuongHieu) setData(src => ({...src, thuongHieu: attributes[0]?.maThuongHieu}))
    })
  }

  function onDataChange(key, e) {
    if (key !== 'hinhAnh') return setData(src => ({...src, [key]: e.target.value}))

    setData(src => ({...src, [key]: URL.createObjectURL(e.target.files[0])}))
  }

  return (<Form className='d-flex gap-5 mx-5 justify-content-center'>
    <FormGroup className='d-flex flex-column gap-3 ' style={{width: "40%"}}>
      <InputShadow type='file' onChange={onDataChange.bind({}, "hinhAnh")}/>
      <Image className='w-100 h-100 shadow' src={data?.hinhAnh}/>
      {/*src={img}*/}
    </FormGroup>
    <FormGroup className='d-flex gap-4 flex-wrap w-100'>
      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Tên sản phẩm</FormLabel>
        <InputShadow type='text' value={data?.tenDanhMucSanPham} onChange={onDataChange.bind({}, "tenDanhMucSanPham")}/>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Xuất xứ</FormLabel>
        <InputShadow as={FormSelect} value={data.xuatXu} onChange={onDataChange.bind({}, "xuatXu")}>
          {xuatXu.map((i, j) => <option key={j} value={i.maXuatXu}>{i.tenXuatXu}</option>)}
        </InputShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Chip xử lý</FormLabel>
        <InputShadow type='text' value={data?.chipXuLy} onChange={onDataChange.bind({}, "chipXuLy")}/>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Dung lượng pin</FormLabel>
        <GroupShadow>
          <FormControl type='number' min={0} value={data?.dungLuongPin} onChange={onDataChange.bind({}, "dungLuongPin")}/>
          <InputGroup.Text>mAh</InputGroup.Text>
        </GroupShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Kích thước màn</FormLabel>
        <GroupShadow>
          <FormControl type='number' min={0} value={data?.kichThuongManHinh} onChange={onDataChange.bind({}, "kichThuongManHinh")}/>
          <InputGroup.Text>inch</InputGroup.Text>
        </GroupShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Camera trước</FormLabel>
        <GroupShadow>
          <FormControl type='number' min={0} value={data?.cameraTruoc} onChange={onDataChange.bind({}, "cameraTruoc")}/>
          <InputGroup.Text>MP</InputGroup.Text>
        </GroupShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Camera sau</FormLabel>
        <GroupShadow>
          <FormControl type='number' min={0} value={data?.cameraSau} onChange={onDataChange.bind({}, "cameraSau")}/>
          <InputGroup.Text>MP</InputGroup.Text>
        </GroupShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Hệ điều hành</FormLabel>
        <InputShadow as={FormSelect} value={data?.heDieuHanh} onChange={onDataChange.bind({}, "heDieuHanh")}>
          {heDieuHanh.map((i, j) => <option key={j} value={i.maHeDieuHanh}>{i.tenHeDieuHanh}</option>)}
        </InputShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Phiên bản hệ điều hành</FormLabel>
        <InputShadow type='text' value={data?.phienBanHeDieuHanh} onChange={onDataChange.bind({}, "phienBanHeDieuHanh")}/>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Thời gian bảo hành</FormLabel>
        <GroupShadow>
          <FormControl type='number' min={0} value={data?.thoiGianBaoHanh} onChange={onDataChange.bind({}, "thoiGianBaoHanh")}/>
          <InputGroup.Text>Tháng</InputGroup.Text>
        </GroupShadow>
      </FormGroup>

      <FormGroup className=' my-3' style={{width: "30%"}}>
        <FormLabel className='fs-6 fw-bold'>Thương hiệu</FormLabel>
        <InputShadow as={FormSelect} value={data?.thuongHieu} onChange={onDataChange.bind({}, "thuongHieu")}>
          {thuongHieu.map((i, j) => <option key={j} value={i.maThuongHieu}>{i.tenThuongHieu}</option>)}
        </InputShadow>
      </FormGroup>
    </FormGroup>
  </Form>)
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

  return (<Modal {...prop} scrollable size='xl' centered backdrop="static">
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
  </Modal>)
}

export default SanPham;