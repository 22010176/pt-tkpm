import './style.module.css'
import Layout1           from "../../../components/layouts/layout1";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faUserGear,
  faUserGroup
}                        from "@fortawesome/free-solid-svg-icons";
import {Button}          from "react-bootstrap";
import TableA            from "../../../components/tables/tableA";

import Chart      from 'react-apexcharts'
import {useState} from "react";
import colors     from "../../../utilities/colors";

const tableHD = [
  {key: "Ngày", value: ""},
  {key: "Vốn", value: ""},
  {key: "Doanh thu", value: ""},
  {key: "Lợi nhuận", value: ""},
]

function ThongKeTongQuan() {
  const [state, setState] = useState({

    series:  [
      {name: "Vốn", data: new Array(7).fill(0).map(i => Math.floor(Math.random() * 1000) - 500)},
      {name: "Doanh thu", data: new Array(7).fill(0).map(i => Math.floor(Math.random() * 1000) - 500)},
      {name: "Lợi nhuận", data: new Array(7).fill(0).map(i => Math.floor(Math.random() * 1000) - 500)},
    ],
    options: {
      chart:      {
        type: 'line',
        // dropShadow: {enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2},
        zoom:    {enabled: false},
        toolbar: {show: false}
      },
      colors:     [colors.orange, colors.green, colors.blue],
      dataLabels: {enabled: true},
      stroke:     {curve: 'smooth'},
      // title:      {text: 'Thống kê doanh thu 7 ngày gần nhất', align: 'center'},
      markers: {size: 1},
      xaxis:   {
        title:      {text: "Ngày"},
        categories: ['1-1-2003', '1-1-2003', '1-1-2003', '1-1-2003', '1-1-2003', '1-1-2003', '1-1-2003'],
      },
      yaxis:   {
        title: {text: 'Số tiền'},
      },
      legend:  {position: 'bottom', horizontalAlign: 'center', offsetY: 0, offsetX: 0}
    },
  });

  return (
    <Layout1
      topPart={<>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faMobileScreen} size="3x"/>
          <div className="text-center">
            <h3 className="m-0">100</h3>
            <p className="m-0 fw-bold fs-5">Sản phẩm hiện có</p>
          </div>
        </div>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUserGroup} size="3x"/>
          <div className="text-center">
            <h3 className="m-0">12</h3>
            <p className="m-0 fw-bold fs-5">Khách hàng</p>
          </div>
        </div>
        <div className="p-1 d-flex gap-5 border border-3 border-black w-100 align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUserGear} size="3x"/>
          <div className="text-center">
            <h3 className="m-0">25</h3>
            <p className="m-0 fw-bold fs-5">Nhân viên</p>
          </div>
        </div>
      </>}
      middlePart={<>
        <h4 className="text-center">Thống kê doanh thu 7 ngày gần nhất</h4>
        <Chart options={state.options} series={state.series} type='line' width={"100%"} height={"100%"}/>
      </>}
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