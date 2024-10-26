import './style.module.css'
import Layout2 from "../../../components/layouts/layout2";
import {Button, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap";
import GroupShadow from "../../../components/Forms/GroupShadow";
import InputGroupText from "react-bootstrap/InputGroupText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import InputShadow from "../../../components/Forms/InputShadow";
import TableA from "../../../components/tables/tableA";


const tableHD = [
  {key: "Ngày", value: ""},
  {key: "Vốn", value: ""},
  {key: "Doanh thu", value: ""},
  {key: "Lợi nhuận", value: ""},
]

function ThongKeTonKho() {
  return (
    <Layout2
      leftPart={<>
        <FormGroup>
          <FormLabel className="fw-bold">Tìm kiếm sản phẩm</FormLabel>
          <GroupShadow>
            <InputGroup>
              <InputGroupText>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
              </InputGroupText>
              <FormControl/>
            </InputGroup>
          </GroupShadow>
        </FormGroup>

        <FormGroup>
          <FormLabel className="fw-bold">Từ ngày</FormLabel>
          <InputShadow type="date"/>
        </FormGroup>

        <FormGroup>
          <FormLabel className="fw-bold">Đến ngày</FormLabel>
          <InputShadow type="date"/>
        </FormGroup>
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <Button className="w-75" variant="success">Xuất excel</Button>
          <Button className="w-75" variant="primary">Làm mới</Button>
        </div>
      </>}
      rightPart={<>
        <div className="h-100 overflow-auto border">
          <TableA headers={tableHD}/>
          <div style={{height: "1000px"}}></div>
        </div>
        <h2 className="text-end text-danger pb-3">Tổng số lượng tồn kho: 25</h2>
      </>}
    />
  )
}

export default ThongKeTonKho