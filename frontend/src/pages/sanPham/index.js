import { faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'

import PageTemplateA from '../../components/layouts/pageA'
import TableB from '../../components/tables/tableA'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'
import styles from './style.module.css'
import ErrorModal from '../../components/modals/errorModal'


function SanPhamForm({ data, setData }) {
  const [file, setFile] = useState();

  function onChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <Form className='container-fluid'>
      <div className='row gap-5 justify-content-center'>
        <div className='col-auto w-25'>
          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Hình minh họa</Form.Label>
            <Form.Control type="file" onChange={onChange} />
          </Form.Group>
          <div className='w-100 mh-100'>
            <img src={file} alt='' className='w-100 h-auto' />
          </div>
        </div>

        <div className='col-auto'>
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
        </div>

        <div className='col-auto'>
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
        </div>

        <div className='col-auto'>
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
    </Form>
  )
}

const headers = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sản phẩm", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "soLuong" },
  { key: "Thương hiệu", value: "thuongHieu" },
  { key: "Hệ điều hành", value: "heDieuHanh" },
  { key: "Phiên bản HĐH", value: "phienBanHDH" },
  { key: "Xuất xứ", value: "xuatXu" },
]
function SanPham() {
  const data = new Array(1000).fill().map(i => ({
    ma: "3", tenSP: "44", soLuong: 3, thuongHieu: "d", heDieuHanh: "d", phienBanHDH: "d", xuatXu: "d"
  }))
  const modalNames = {
    addSP: "add-sp", addCH: "add-ch", editSP: "edit-sp", error: "error"
  }
  // add-sp, edit, error
  const [modal, setModal] = useState("");

  const handleClose = () => setModal("");
  const handleShow = key => setModal(key);
  return (
    <>
      <PageTemplateA>
        <PageTemplateA.Toolbar className={"d-flex justify-content-between"}>
          <div className={["d-flex align-items-center h-100 gap-2"].join(" ")}>
            <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" onClick={handleShow.bind({}, modalNames.addSP)} />
            <ToolBtn color="#e69138" icon={faPencil} title="Sửa" onClick={handleShow.bind({}, modalNames.editSP)} />
            <ToolBtn color="#ffd43b" icon={faTrashCan} title="Xóa" />
          </div>

          <div className={["d-flex align-items-center h-100 gap-3"].join(" ")}>
            <div>
              <input className="form-control" type="text" placeholder="Tìm kiếm" aria-label="default input example" />
            </div>
            <div>
              <IconBtn icon={faMagnifyingGlass} title={"Tìm kiếm"} className="btn-primary" />
            </div>
            <div>
              <IconBtn icon={faArrowRotateRight} title={"Làm mới"} className="btn-success " />
            </div>
          </div>
        </PageTemplateA.Toolbar>

        <PageTemplateA.Table>
          <TableB headers={headers} data={data} />
        </PageTemplateA.Table>
      </PageTemplateA >

      {/* Error modal */}
      <ErrorModal show={modal === modalNames.error} onHide={handleClose}>
        <p className='fs-4'>
          Hãy chọn 1 sản phẩm!!
        </p>
      </ErrorModal>

      {/* Add product modal */}
      <Modal backdrop="static" show={modal === modalNames.addSP} centered scrollable dialogClassName={styles.bigModal}>
        <Modal.Header className='bg-primary text-light'>
          <Modal.Title className='text-center w-100 fw-bold fs-2'>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SanPhamForm />
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='primary' style={{ width: "15%" }} onClick={handleShow.bind({}, modalNames.addCH)}>Thêm cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {/* Add option modal */}
      <Modal size='xl' show={modal === modalNames.addCH} centered>
        <Modal.Header className='bg-primary text-light'>
          <Modal.Title className='text-center w-100 fw-bold fs-2'>CẤU HÌNH</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='primary' style={{ width: "15%" }} >Thêm cấu hình</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit modal */}
      <Modal backdrop="static" show={modal === modalNames.editSP} centered scrollable dialogClassName={styles.bigModal}>
        <Modal.Header className='bg-primary text-light'>
          <Modal.Title className='text-center w-100 fw-bold fs-2'>SỬA SẢN PHẨM</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SanPhamForm />
        </Modal.Body>

        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant='primary' style={{ width: "15%" }} onClick={handleShow.bind({}, modalNames.addCH)}>Lưu thông tin</Button>
          <Button variant='danger' style={{ width: "15%" }} onClick={handleClose}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SanPham