import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup
}                          from "react-bootstrap";
import {FontAwesomeIcon}   from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import Layout2           from "../../../components/layouts/layout2";
import GroupShadow       from "../../../components/Forms/GroupShadow";
import InputGroupText    from "react-bootstrap/InputGroupText";
import InputShadow       from "../../../components/Forms/InputShadow";
import TableA            from "../../../components/tables/tableA";

import './style.module.css'
import {
  useEffect,
  useState
}                        from "react";
import {getSupplierStat} from "../../../api/statistics";

const tableHD = [
  {key: "Mã nhà cung cấp", value: "manhacungcap"},
  {key: "Tên nhà cung cấp", value: "tennhacungcap"},
  {key: "Số lượng nhập", value: "lannhap"},
  {key: "Tổng số tiền", value: "tongtien"},
  {key: "Chi tiết", value: ""},

]

function ThongKeNhaCungCap() {
  const [startDate, setStartDate] = useState("2010-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("")

  const [table, setTable] = useState([]);

  useEffect(() => {
    updateData()
  }, []);

  useEffect(() => {
    updateData()
  }, [endDate, startDate]);

  function updateData() {
    setTable([])
    getSupplierStat(startDate, endDate).then(data => setTable(data.data))
  }

  return (
    <Layout2
      leftPart={<>
        <FormGroup>
          <FormLabel className="fw-bold">Tìm kiếm nhà cung cấp</FormLabel>
          <GroupShadow>
            <InputGroup>
              <InputGroupText>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
              </InputGroupText>
              <FormControl value={search} onChange={e => setSearch(e.target.value)}/>
            </InputGroup>
          </GroupShadow>
        </FormGroup>

        <FormGroup>
          <FormLabel className="fw-bold">Từ ngày</FormLabel>
          <InputShadow type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
        </FormGroup>

        <FormGroup>
          <FormLabel className="fw-bold">Đến ngày</FormLabel>
          <InputShadow type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
        </FormGroup>
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <Button className="w-75" variant="success">Xuất excel</Button>
          <Button className="w-75" variant="primary" onClick={() => {
            setStartDate("2010-01-01");
            setEndDate(new Date().toISOString().split("T")[0]);
          }}>Làm mới</Button>
        </div>
      </>}
      rightPart={<>
        <div className="h-100 overflow-auto border">
          <TableA headers={tableHD} data={table.filter(i => i.tennhacungcap.includes(search))}/>
          {/*<div style={{height: "1000px"}}></div>*/}
        </div>
        <h3 className="text-end text-danger pb-3">Tổng số tiền nhập hàng: {table.reduce((acc, i) => acc + +i.tongtien, 0)} VND</h3>
      </>}
    />
  )
}

export default ThongKeNhaCungCap