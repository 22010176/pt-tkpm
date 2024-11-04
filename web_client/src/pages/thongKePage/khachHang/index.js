import {FontAwesomeIcon}   from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup
}                          from "react-bootstrap";

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
import {getCustomerStat} from "../../../api/statistics";

const tableHD = [
  {key: "Mã khách hàng", value: "makhachhang"},
  {key: "Tên khách hàng", value: "tenkhachhang"},
  {key: "Số lần mua hàng", value: "muahang"},
  {key: "Tổng số tiền", value: "tongtien"},
  {key: "Lịch sử mua hàng", value: ""},
]

function ThongKeKhachHang() {
  const [startDate, setStartDate] = useState("2010-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("")

  const [table, setTable] = useState([]);

  useEffect(() => {
    updateInfo()
  }, []);

  function updateInfo() {
    setTable([])
    getCustomerStat(startDate, endDate).then(({data}) => setTable(data))
  }


  return (
    <Layout2
      leftPart={<>
        <FormGroup>
          <FormLabel className="fw-bold">Tìm kiếm khách hàng</FormLabel>
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
          <InputShadow type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        </FormGroup>

        <FormGroup>
          <FormLabel className="fw-bold">Đến ngày</FormLabel>
          <InputShadow type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </FormGroup>
        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <Button className="w-75" variant="success">Xuất excel</Button>
          <Button className="w-75" variant="primary" onClick={updateInfo}>Làm mới</Button>
        </div>
      </>}
      rightPart={<>
        <div className="h-100 overflow-auto border">
          <TableA headers={tableHD} data={table.filter(i => i.tenkhachhang.includes(search))}/>
        </div>
        <h3 className="text-end text-danger pb-3">Tổng doanh thu: {table.reduce((acc, i) => acc + +i.tongtien, 0)}VND</h3>
      </>}
    />
  )
}

export default ThongKeKhachHang