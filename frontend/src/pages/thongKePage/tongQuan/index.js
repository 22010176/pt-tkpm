import './style.module.css'
import Layout1 from "../../../components/layouts/layout1";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMobileScreen, faUserGear, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import TableA from "../../../components/tables/tableA";


const tableHD = [
  {key: "Ngày", value: ""},
  {key: "Vốn", value: ""},
  {key: "Doanh thu", value: ""},
  {key: "Lợi nhuận", value: ""},
]

function ThongKeTongQuan() {
  return (
    <Layout1
      topPart={<>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faMobileScreen} size="3x"/>
          <div className="text-center">
            <h2 className="m-0">100</h2>
            <p className="m-0 fw-bold fs-5">Sản phẩm hiện có</p>
          </div>
        </div>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUserGroup} size="3x"/>
          <div className="text-center">
            <h1 className="m-0">12</h1>
            <p className="m-0 fw-bold fs-5">Khách hàng</p>
          </div>
        </div>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUserGear} size="3x"/>
          <div className="text-center">
            <h2 className="m-0">25</h2>
            <p className="m-0 fw-bold fs-5">Nhân viên</p>
          </div>
        </div>
      </>}
      middlePart={<></>}
      bottomPart={<>
        <div className="justify-content-end d-flex">
          <Button variant="success">Xuất Excel</Button>
        </div>
        <div className=" border overflow-auto">
          <TableA headers={tableHD}/>
          <div style={{height: "1000px"}}></div>
        </div>
      </>}
    />
  )
}

export default ThongKeTongQuan