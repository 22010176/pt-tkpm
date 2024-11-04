import './style.module.css'
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Nav,
  Tab
}                 from 'react-bootstrap'
import Chart      from 'react-apexcharts'
import {useState} from "react";
import TableA     from "../../../components/tables/tableA";
import colors     from "../../../utilities/colors";


const namHD = [
  {key: "Năm", value: ""},
  {key: "Chi phí", value: ""},
  {key: "Doanh thu", value: ""},
  {key: "Lợi nhuận", value: ""},
]

function ThongKeDoanhThu() {
  return (
    <div className="w-100 _h-100 d-flex flex-column p-2 overflow-hidden">
      <Tab.Container defaultActiveKey="nam">
        <Nav variant="tabs ">
          <Nav.Item>
            <Nav.Link className="bg-light border fw-bold" eventKey="nam">Thống kê theo năm</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="bg-light border fw-bold" eventKey="thang">Thống kê theo tháng</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="bg-light border fw-bold" eventKey="ngay">Thống kê theo ngày</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="h-100 w-100  ">
          <Tab.Pane eventKey="nam" className="_h-95 w-100 overflow-auto rounded-bottom rounded-end border border-top-0 ">
            <NamTab/>
          </Tab.Pane>

          <Tab.Pane eventKey="thang" className="_h-95 w-100 overflow-auto rounded-bottom rounded-end border border-top-0">
            <ThangTab/>
          </Tab.Pane>

          <Tab.Pane eventKey="ngay" className="_h-95 w-100 overflow-auto rounded-bottom rounded-end border border-top-0">
            <NgayTab/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  )
}

const defaultOptions = {}

function NgayTab() {
  const namHD = [
    {key: "Ngày", value: ""},
    {key: "Chi phí", value: ""},
    {key: "Doanh thu", value: ""},
    {key: "Lợi nhuận", value: ""},
  ]
  const [state, setState] = useState({
    series:  [
      {name: 'Chi phí', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Doanh thu', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Lợi nhuận', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))}
    ],
    options: {
      chart:       {toolbar: {show: false}},
      plotOptions: {
        bar: {horizontal: false, columnWidth: '70%', endingShape: 'rounded'},
      },
      dataLabels:  {enabled: false},
      stroke:      {show: true, width: 2, colors: ['transparent']},
      xaxis:       {categories: new Array(10).fill(0).map((_, j) => 2010 + j),},
      colors:      [colors.red, colors.orange, colors.green],
      tooltip:     {
        y: {formatter(val) { return val + " VND" }}
      }
    },
  })
  return (
    <div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
      <Form className="d-flex gap-3 justify-content-around">
        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Chọn tháng</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{j + 1}</option>)}
          </FormSelect>
        </FormGroup>

        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Chọn năm</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{2010 + j}</option>)}
          </FormSelect>
        </FormGroup>

        <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
        <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
      </Form>

      <div className="w-100 _h-50">
        <Chart options={state.options} series={state.series} type='bar' width="100%" height="100%"/>
      </div>

      <div className="w-100 _h-50 overflow-auto border">
        <TableA index={false} headers={namHD} data={new Array(100).fill().map(i => ({}))}/>
        {/*<div style={{height: "10000px"}}></div>*/}
      </div>
    </div>
  )
}

function ThangTab() {
  const namHD = [
    {key: "Tháng", value: ""},
    {key: "Chi phí", value: ""},
    {key: "Doanh thu", value: ""},
    {key: "Lợi nhuận", value: ""},
  ]
  const [state, setState] = useState({
    series:  [
      {name: 'Chi phí', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Doanh thu', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Lợi nhuận', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))}
    ],
    options: {
      chart:       {toolbar: {show: false}},
      plotOptions: {
        bar: {horizontal: false, columnWidth: '70%', endingShape: 'rounded'},
      },
      dataLabels:  {enabled: false},
      stroke:      {show: true, width: 2, colors: ['transparent']},
      xaxis:       {categories: new Array(10).fill(0).map((_, j) => 2010 + j),},
      // yaxis:       {title: {text: '$ (thousands)'}},
      colors: [colors.red, colors.orange, colors.green],
      // fill:    {opacity: 1},
      tooltip: {
        y: {formatter(val) { return val + " VND" }}
      }
    },
  })
  return (
    <div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
      <Form className="d-flex gap-3 justify-content-around">
        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Từ tháng</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{j + 1}</option>)}
          </FormSelect>
        </FormGroup>

        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Đến tháng</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{j + 1}</option>)}
          </FormSelect>
        </FormGroup>

        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Chọn năm</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{2010 + j}</option>)}
          </FormSelect>
        </FormGroup>

        <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
        <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
      </Form>

      <div className="w-100 _h-50">
        <Chart options={state.options} series={state.series} type='bar' width="100%" height="100%"/>
      </div>

      <div className="w-100 _h-50 overflow-auto border">
        <TableA index={false} headers={namHD} data={new Array(100).fill().map(i => ({}))}/>
        {/*<div style={{height: "10000px"}}></div>*/}
      </div>
    </div>
  )
}

function NamTab() {
  const namHD = [
    {key: "Năm", value: ""},
    {key: "Chi phí", value: ""},
    {key: "Doanh thu", value: ""},
    {key: "Lợi nhuận", value: ""},
  ]
  const [state, setState] = useState({
    series:  [
      {name: 'Chi phí', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Doanh thu', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))},
      {name: 'Lợi nhuận', data: new Array(10).fill().map(i => Math.floor(Math.random() * 10000 - 2000))}
    ],
    options: {
      chart:       {toolbar: {show: false}},
      plotOptions: {
        bar: {horizontal: false, columnWidth: '70%', endingShape: 'rounded'},
      },
      dataLabels:  {enabled: false},
      stroke:      {show: true, width: 2, colors: ['transparent']},
      xaxis:       {categories: new Array(10).fill(0).map((_, j) => 2010 + j),},
      // yaxis:       {title: {text: '$ (thousands)'}},
      colors: [colors.red, colors.orange, colors.green],
      // fill:    {opacity: 1},
      tooltip: {
        y: {formatter(val) { return val + " VND" }}
      }
    },
  })
  return (
    <div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
      <Form className="d-flex gap-3 justify-content-around">
        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Từ năm</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{2010 + 1}</option>)}
          </FormSelect>
        </FormGroup>
        <FormGroup className="d-flex gap-2 align-items-center">
          <FormLabel className="fw-bold text-nowrap">Đến năm</FormLabel>
          <FormSelect>
            {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{2010 + j}</option>)}
          </FormSelect>
        </FormGroup>

        <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
        <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
      </Form>

      <div className="w-100 _h-50">
        <Chart options={state.options} series={state.series} type='bar' width="100%" height="100%"/>
      </div>

      <div className="w-100 _h-50 overflow-auto border">
        <TableA index={false} headers={namHD} data={new Array(100).fill().map(i => ({}))}/>
        {/*<div style={{height: "10000px"}}></div>*/}
      </div>
    </div>
  )
}

export default ThongKeDoanhThu