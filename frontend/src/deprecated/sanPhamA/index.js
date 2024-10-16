import { faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { useState } from 'react'

// import PageTemplateA from '../../../components/layouts/pageA'
import PageTemplateA from '../../../components/layouts/deprecated'
import TableA from '../../../components/tables/tableA'
import ToolBtn from '../../../components/buttons/toolBtn'
import IconBtn from '../../../components/buttons/iconBtn'
import styles from './style.module.css'
import ErrorModal from '../../../components/modals/errorModal'
import HeaderModalA from '../../../components/modals/headerA'

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

function SanPhamForm({ data = {}, setData }) {
  const [file, setFile] = useState();

  function onChange(e) {
    try {
      setFile(URL.createObjectURL(e.target.files[0]))
    } catch (error) { }
  }

  return (
    <Form className='container-fluid p-5'>
      <div className='row gx-5'>
        <div className='col-3 '>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Hình minh họa</Form.Label>
            <Form.Control type="file" onChange={onChange} />
          </Form.Group>
          <div className='w-100 mh-100'>
            <img src={file} alt='' className='w-100 h-auto' />
          </div>
        </div>

        <div className='col-9'>
          <div className='row row-cols-4'>
            <Form.Group className="fw-bold mb-5">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="fw-bold mb-5">
              <Form.Label>Thương hiệu</Form.Label>
              <Form.Select >
                <option value={0}>Test1</option>
                <option value={1}>Test2</option>
                <option value={3}>Test3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="fw-bold mb-5">
              <Form.Label>Phiên bản hệ điều hành</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="fw-bold mb-5">
              <Form.Label>Chip xử lý</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="fw-bold mb-5">
              <Form.Label>Xuất xứ</Form.Label>
              <Form.Select>
                <option value={0}>Test1</option>
                <option value={1}>Test2</option>
                <option value={3}>Test3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='fw-bold mb-5'>
              <Form.Label>Camera trước</Form.Label>
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Text>MP</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className='fw-bold mb-5'>
              <Form.Label>Thời gian bảo hành</Form.Label>
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Text >tháng</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className='fw-bold mb-5'>
              <Form.Label>Dung lượng pin</Form.Label>
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Text>mAh</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="fw-bold mb-5">
              <Form.Label>Hệ điều hành</Form.Label>
              <Form.Select >
                <option value={0}>Test1</option>
                <option value={1}>Test2</option>
                <option value={3}>Test3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='fw-bold mb-5'>
              <Form.Label>Camera sau</Form.Label>
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Text>MP</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className='fw-bold mb-5'>
              <Form.Label>Kích thước màn hình</Form.Label>
              <InputGroup>
                <Form.Control type='number' />
                <InputGroup.Text>inch</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </div>
      </div>
    </Form>
  )
}

function SanPhamA() {
  const spData = new Array(1000).fill().map(i => ({ ma: "3", tenSP: "44", soLuong: 3, thuongHieu: "d", heDieuHanh: "d", phienBanHDH: "d", xuatXu: "d" }))
  const chData = new Array(1000).fill().map((i, j) => ({ stt: j + 1, ram: 44, rom: 3, mauSac: "d", giaNhap: "d", giaXuat: "d" }))

  const [formData, setFormData] = useState()

  const modalNames = { addSP: "add-sp", addCH: "add-ch", editSP: "edit-sp", error: "error" }

  // add-sp, edit, error
  const [modal, setModal] = useState("");

  const handleClose = () => setModal("");
  const handleShow = key => setModal(key);

  function onOpenEditModal() {
    if (!formData) return handleShow(modalNames.error)
    handleShow(modalNames.editSP)
  }



  function onDelete() {
    if (!formData) return setModal(modalNames.error)
  }

  return (
    <>
      <PageTemplateA>
        <PageTemplateA.Toolbar className={"d-flex justify-content-between"}>
          <div className={["d-flex align-items-center h-100 gap-2 py-2"].join(" ")}>
            <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={handleShow.bind({}, modalNames.addSP)} />
            <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={onOpenEditModal} />
            <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" onClick={onDelete} />
          </div>

          <Form className={["d-flex align-items-center h-100 gap-3 px-1"].join(" ")}>
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
        </PageTemplateA.Toolbar >

        <PageTemplateA.Table>
          <TableA headers={spHeader} data={spData} onClick={function (data) {
            setFormData(data)
          }} />
        </PageTemplateA.Table>
      </PageTemplateA >

      {/* Error modal */}
      < ErrorModal show={modal === modalNames.error} onHide={handleClose} >
        <p className='fs-4'>
          Hãy chọn 1 sản phẩm!!
        </p>
      </ErrorModal >

      {/* Add product modal */}
      < Modal backdrop="static" show={modal === modalNames.addSP} centered scrollable dialogClassName={styles.bigModal} >
        <HeaderModalA title="THÊM SẢN PHẨM" />

        <Modal.Body>
          <SanPhamForm />
        </Modal.Body>

        <Modal.Footer className='d-flex gap-5 justify-content-center'>
          <Button variant='primary' style={{ width: "15%" }} onClick={handleShow.bind({}, modalNames.addCH)}>Thêm cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal >

      {/* Add option modal */}
      < Modal backdrop="static" size='xl' show={modal === modalNames.addCH} centered >
        <HeaderModalA title="CẤU HÌNH" />

        <Modal.Body className='mx-2 d-flex flex-column gap-5 overflow-y-hidden px-4' style={{ height: "50vh" }}>
          <Form className='row' style={{ height: "10%" }}>
            <Form.Group className='col' >
              <Form.Label className='fw-bold'>ROM</Form.Label>
              <Form.Select>
                <option>4GB</option>
                <option>6GB</option>
                <option>8GB</option>
                <option>16GB</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='col'>
              <Form.Label className='fw-bold'>RAM</Form.Label>
              <Form.Select>
                <option>4GB</option>
                <option>6GB</option>
                <option>8GB</option>
                <option>16GB</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='col'>
              <Form.Label className='fw-bold'>Màu sắc</Form.Label>
              <Form.Select>
                <option>Disabled select</option>
                <option>Disabled select</option>
                <option>Disabled select</option>
                <option>Disabled select</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='col'>
              <Form.Label className='fw-bold'>Giá nhập</Form.Label>
              <InputGroup >
                <Form.Control type='number' />
                <InputGroup.Text id="basic-addon2">VNĐ</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className='col'>
              <Form.Label className='fw-bold'>Giá xuất</Form.Label>
              <InputGroup >
                <Form.Control type='number' />
                <InputGroup.Text id="basic-addon2">VNĐ</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form>

          <div className='d-flex justify-content-between' style={{ height: "80%" }} >
            <div className='p-0 border border-dark overflow-y-auto h-100' style={{ width: "80%" }}>
              <TableA index headers={chHeader} data={chData} />
            </div>

            <div className='d-flex flex-column gap-4' style={{ width: "18%" }}>
              <Button variant='primary'>Thêm cấu hình</Button>
              <Button variant='warning'>Sửa cấu hình</Button>
              <Button variant='danger'>Xóa cấu hình</Button>
              <Button variant='success'>Làm mới cấu hình</Button>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className='d-flex gap-5 justify-content-center' >
          <Button variant='primary' style={{ width: "15%" }} >Thêm cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal >

      {/* Edit modal */}
      < Modal backdrop="static" show={modal === modalNames.editSP} centered scrollable dialogClassName={styles.bigModal} >
        <HeaderModalA title="SỬA SẢN PHẨM" />

        <Modal.Body>
          <SanPhamForm />
        </Modal.Body>

        <Modal.Footer className='d-flex gap-5 justify-content-center'>
          <Button variant='primary' style={{ width: "15%" }} onClick={handleShow.bind({}, modalNames.addCH)}>Lưu thông tin</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal >
    </>
  )
}

export default SanPhamA