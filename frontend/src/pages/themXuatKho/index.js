import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, InputGroup } from 'react-bootstrap'

import ContentA from '../../components/layouts/blockContent'
import PageTemplateD from '../../components/layouts/pageD'
import SideNavbar from '../../components/layouts/sideBar'
import TableA from '../../components/tables/tableA'

import style from './style.module.css'

const spHeader = [
  { key: "Mã SP", value: "ma" },
  { key: "Tên sp", value: "tenSP" },
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Đơn giá", value: "gia" },
]

const khoHeader = [
  { key: "Tên sp", value: "tenSP" },
  { key: "Số lượng tồn kho", value: "tonKho" },
]

function ThemXuatKho() {
  const width = 75;
  const height = 55;
  const width2 = 60;

  return (
    <PageTemplateD sidebar={<SideNavbar />}>
      <div className='w-100 h-100 d-flex p-3 gap-2'>
        <div className='h-100 d-flex flex-column' style={{ width: width + "%" }}>
          <div className='d-flex gap-2' style={{ height: height + "%" }}>
            <div className='d-flex flex-column gap-2' style={{ width: width2 + "%" }}>
              <Form>
                <InputGroup>
                  <InputGroup.Text>Tìm kiếm</InputGroup.Text>
                  <Form.Control />
                </InputGroup>
              </Form>

              <ContentA className='h-100 overflow-auto bg-light'>
                <TableA headers={khoHeader} index />
              </ContentA>
            </div>

            <ContentA As={Form} className="p-3 d-flex flex-column justify-content-around" style={{ width: 100 - width2 + "%" }}>
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
                    <FormControl type='number' />
                    <InputGroup.Text>VNĐ</InputGroup.Text>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <FormLabel className='fw-bold'>Số lượng tồn</FormLabel>
                  <FormControl type='number' disabled />
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <FormLabel className='fw-bold'>Mã IMEI (gồm 15 chữ số)</FormLabel>
                <FormControl type='number' />
              </FormGroup>
            </ContentA>
          </div>

          <div className='d-flex flex-column gap-1' style={{ height: 100 - height + "%" }}>
            <div className='h-25 d-flex justify-content-between gap-5 w-100 px-1'>
              <Button className='w-25 my-3 fw-semibold' variant='primary'>Thêm sản phẩm</Button>
              <Button className='w-25 my-3 fw-semibold' variant='success'>Nhập excel</Button>
              <Button className='w-25 my-3 fw-semibold' variant='warning'>Sửa sản phẩm</Button>
              <Button className='w-25 my-3 fw-semibold' variant='danger'>Xóa sản phẩm</Button>
            </div>

            <ContentA className='w-100 h-100' >
              <TableA headers={spHeader} />

              <div style={{ height: "10000px" }}></div>
            </ContentA>

            <p className='text-end fw-bold mx-3 fs-5'>Tổng số: <span className='sp-count'>0</span> chiếc</p>
          </div>
        </div>

        <ContentA className="d-flex justify-content-between flex-column p-3" style={{ width: 100 - width + "%" }}>
          <Form className='d-flex flex-column gap-5'>
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
              <FormSelect>
                <option>test1</option>
                <option>test2</option>
                <option>test3</option>
                <option>test4</option>
              </FormSelect>
            </FormGroup>
          </Form>

          <div className='px-auto text-center'>
            <h3 className='mb-3 text-danger fw-bold'>Tổng tiền: <span>0</span>đ</h3>
            <Button className='w-100 fw-semibold' variant='success'>Nhập hàng</Button>
          </div>
        </ContentA>
      </div>
    </PageTemplateD>
  )
}

export default ThemXuatKho