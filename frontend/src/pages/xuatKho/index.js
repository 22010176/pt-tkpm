import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { faCircleInfo, faCircleXmark, faFileExport, faCirclePlus, faPencil, faTrashCan, faMagnifyingGlass, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import PageTemplateD from '../../components/layouts/pageD'
import ToolBtn from '../../components/buttons/toolBtn'
import IconBtn from '../../components/buttons/iconBtn'
import PageTemplateC from '../../components/layouts/pageC'
import SideNavbar from '../../components/layouts/sideBar'
import SearchForm from '../../components/Forms/searchForm'

import style from './style.module.css'
import TableA from '../../components/tables/tableA'

const phieuNhapHd = [
  { key: "Mã phiếu nhập", value: "ma" },
  { key: "Nhà cung cấp", value: "nhaCungCap" },
  { key: "Nhân viên nhập", value: "nhanVien" },
  { key: "Thời gian", value: "thoiGian" },
  { key: "Tổng tiền", value: "tongTien" },
]

function XuatKho() {
  const height = 15;
  const width = 25;
  return (
    <>
      <PageTemplateD sidebarWidth={13} sidebar={<SideNavbar />}>
        <div className='d-flex gap-3 flex-column w-100 h-100 p-3'>
          <div className='rounded-3 d-flex justify-content-between px-3 align-items-center bg-light border border-info-subtle border-5' style={{ height: height + "%" }}>
            <div className='d-flex'>
              <ToolBtn color="#63e6be" icon={faCirclePlus} title="Thêm" />
              <ToolBtn color="#2b78e4" icon={faCircleInfo} title="Chi tiết" />
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
            <Form className='d-flex flex-column justify-content-center gap-5 p-4 rounded-3 bg-light border border-info-subtle border-5' style={{ width: width + "%" }}>
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
    </>
  )
}

export default XuatKho