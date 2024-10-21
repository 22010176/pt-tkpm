import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup, Modal, ModalBody, ModalFooter } from 'react-bootstrap'

import SideNavbar from '../../../components/layouts/sideBar'
import TableA from '../../../components/tables/tableA'
import Page4 from '../../../components/layouts/Page4'

import style from './style.module.css'
import GroupShadow from '../../../components/Forms/GroupShadow'
import HeaderModalA from '../../../components/modals/headerA'
import InputShadow from '../../../components/Forms/InputShadow'
import ContentA from '../../../components/layouts/blockContent'

const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sp", value: "tenSP" },
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Đơn giá", value: "gia" },
  { key: "Số lượng", value: "soLuong" },
]

const khoHeader = [
  { key: "Tên sp", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "tonKho" },
]
const khachHangHeader = [
  { key: "Mã KH", value: "tenSP" },
  { key: "Tên khách hàng", value: "tonKho" },
  { key: "Ngày sinh", value: "tonKho" },
  { key: "Địa chỉ", value: "tonKho" },
  { key: "Email", value: "tonKho" },
  { key: "Số điện thoại", value: "tonKho" },
  { key: "Ngày tham gia", value: "tonKho" },
]

function ThemXuatKho() {
  return (
    <>
      <Page4
        sidebar={<SideNavbar />}
        tableTop={
          <InputGroup>
            <InputGroup.Text>Tìm kiếm</InputGroup.Text>
            <Form.Control />
            <Button variant="success">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputGroup>
        }
        table={<TableA headers={khoHeader} index />}
        tableForm={
          <Form className='p-3 d-flex flex-column gap-3'>
            <FormGroup className='d-flex justify-content-between gap-4'>
              <FormGroup>
                <FormLabel className='fw-bold'>Mã sp</FormLabel>
                <FormControl type='text' disabled size='sm' />
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Tên sp</FormLabel>
                <FormControl type='text' disabled size='sm' />
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Cấu hình</FormLabel>
              <FormSelect>
                <option>test</option>
                <option>tes2</option>
                <option>tes4</option>
                <option>tes5</option>
              </FormSelect>
            </FormGroup>

            <FormGroup className='d-flex gap-3'>
              <FormGroup>
                <FormLabel className='fw-bold'>Giá xuất</FormLabel>
                <InputGroup>
                  <FormControl type='number' disabled />
                  <InputGroup.Text>VNĐ</InputGroup.Text>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Số lượng tồn</FormLabel>
                <InputGroup>
                  <FormControl type='number' disabled />
                  <InputGroup.Text>chiếc</InputGroup.Text>
                </InputGroup>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <FormLabel className='fw-bold'>Số lượng xuất</FormLabel>
              <InputGroup>
                <FormControl type='number' />
                <InputGroup.Text>chiếc</InputGroup.Text>
              </InputGroup>
            </FormGroup>
          </Form>
        }
        toolBtn={<>
          <Button className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
          <Button className='w-25 my-3 fw-semibold' variant='primary'>Thêm sản phẩm</Button>
          <Button className='w-25 my-3 fw-semibold' variant='warning'>Sửa sản phẩm</Button>
          <Button className='w-25 my-3 fw-semibold' variant='danger'>Xóa sản phẩm</Button>
        </>}
        table2={<TableA headers={spHeader} />}
        count={3}
        rightTopForm={<>
          <FormGroup>
            <FormLabel className='fw-bold'>Mã phiếu xuất</FormLabel>
            <FormControl disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Nhân viên xuất</FormLabel>
            <FormControl disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='fw-bold'>Khách hàng</FormLabel>
            <GroupShadow>
              <Button><FontAwesomeIcon icon={faPlus} /></Button>
              <FormControl disabled />
            </GroupShadow>
          </FormGroup>
        </>}
        rightBottomForm={<>
          <h3 className='mb-3 text-danger fw-bold'>Tổng tiền: <span>0</span>đ</h3>
          <Button className='w-100 fw-semibold' variant='success'>Nhập hàng</Button>
        </>}
      />

      <Modal scrollable size='lg'>
        <HeaderModalA title="CHỌN KHÁCH HÀNG" />

        <ModalBody className='d-flex flex-column gap-3'>
          <Form>
            <GroupShadow>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputGroup.Text>
              <FormControl />
              <Button onClick>Chọn khách hàng</Button>
            </GroupShadow>
          </Form>

          <ContentA>
            <TableA headers={khachHangHeader} />
            <div style={{ height: "1000px" }}></div>
          </ContentA>
        </ModalBody>
      </Modal >

    </>
  )
}

export default ThemXuatKho