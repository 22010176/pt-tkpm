import './style.module.css'
import {Button} from "react-bootstrap";
import TableA from "../../tables/tableA";

const tableHD = [
  {key: "Ngày", value: ""},
  {key: "Vốn", value: ""},
  {key: "Doanh thu", value: ""},
  {key: "Lợi nhuận", value: ""},
]
const Layout1 = function ({topPart, middlePart,bottomPart}) {
  return (
    <div className="w-100 h-100 d-flex flex-column p-5 gap-2">
      <div className="d-flex gap-5 justify-content-around">
        {topPart}
      </div>

      <div className="w-100 h-50 border">
        {middlePart}
      </div>

      <div className="w-100 h-50 d-flex flex-column gap-2">
        {bottomPart}
      </div>
    </div>
  )
}

export default Layout1;