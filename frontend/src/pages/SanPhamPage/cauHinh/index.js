import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { Form, Modal, ModalBody, FormGroup, FormLabel, FormSelect, InputGroup, FormControl, Button, ModalFooter } from "react-bootstrap";

import { wait } from "../../../api";
import HeaderModalA from "../../../components/modals/headerA";
import ContentA from "../../../components/layouts/blockContent";
import TableA from "../../../components/tables/tableA";
import InputShadow from "../../../components/Forms/InputShadow";
import GroupShadow from "../../../components/Forms/GroupShadow";

const defaultCauHinh = { ma: undefined, ram: "", rom: "", mauSac: "", giaNhap: "", giaXuat: "" }
const chHeader = [
  { key: "RAM", value: "ram" },
  { key: "ROM", value: "rom" },
  { key: "Màu sắc", value: "mauSac" },
  { key: "Giá nhập", value: "giaNhap" },
  { key: "Giá xuất", value: "giaXuat" }
]
function CauHinhModal({ sanPham, onModalHide, ...prop }) {
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
      <HeaderModalA title="TẠO CẤU HÌNH" />

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
              <FormControl type='number' value={data?.giaNhap} onChange={onDataChange.bind({}, "giaNhap")} />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
          </FormGroup>

          <FormGroup className='flex-grow-1'>
            <FormLabel className='fw-bold'>Giá xuất</FormLabel>
            <GroupShadow className='shadow-sm'>
              <FormControl type='number' value={data?.giaXuat} onChange={onDataChange.bind({}, "giaXuat")} />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </GroupShadow>
          </FormGroup>
        </Form>

        <div className='d-flex gap-4' style={{ height: "40vh" }}>
          <ContentA style={{ width: "80%" }}>
            <TableA index headers={chHeader} data={tableData} onClick={setData} />
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
        <Button className="shadow-sm" variant='primary' style={{ width: "15%" }}>Tạo cấu hình</Button>
        <Button className="shadow-sm" variant='danger' style={{ width: "15%" }} onClick={onHide}>Hủy bỏ</Button>
      </ModalFooter>
    </Modal>
  )
}

export default CauHinhModal