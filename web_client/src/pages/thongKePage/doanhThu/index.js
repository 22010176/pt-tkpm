import './style.module.css'
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Nav,
  Tab
}             from 'react-bootstrap'
import Chart  from 'react-apexcharts'
import {
  useEffect,
  useState
}             from "react";
import TableA from "../../../components/tables/tableA";
import colors from "../../../utilities/colors";
import {
  getDayProfit,
  getMonthProfits,
  getYearProfits
}             from "../../../api/statistics";


const namHD = [
  {key: "Năm", value: ""}, {key: "Chi phí", value: ""}, {key: "Doanh thu", value: ""}, {key: "Lợi nhuận", value: ""},
]

function ThongKeDoanhThu() {
  return (<div className="w-100 _h-100 d-flex flex-column p-2 overflow-hidden">
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
  </div>)
}

const defaultOptions = {
  chart:         {toolbar: {show: false}}, plotOptions: {
    bar: {horizontal: false, columnWidth: '70%', endingShape: 'rounded'},
  }, dataLabels: {enabled: false}, stroke: {show: true, width: 2, colors: ['transparent']}, xaxis: {categories: new Array(10).fill(0).map((_, j) => 2010 + j),}, // yaxis:       {title: {text: '$ (thousands)'}},
  colors:        [colors.red, colors.orange, colors.green], // fill:    {opacity: 1},
  tooltip:       {
    y: {formatter(val) { return val + " VND" }}
  }
}

function NgayTab() {
  const header = [
    {key: "Ngày", value: "thoigian"},
    {key: "Chi phí", value: "von"},
    {key: "Doanh thu", value: "doanhthu"},
    {key: "Lợi nhuận", value: "loinhuan"},
  ]

  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const [data, setData] = useState([])

  const [options, setOptions] = useState({...defaultOptions})
  const [series, setSeries] = useState([
    {name: 'Chi phí', data: []},
    {name: 'Doanh thu', data: []},
    {name: 'Lợi nhuận', data: []},
  ])

  useEffect(function () {

    getDayProfit(new Date(year, month - 1)).then(({data}) => setData(data))
  }, [])

  useEffect(() => {
    getDayProfit(new Date(year, month - 1)).then(({data}) => setData(data))
  }, [month, year]);

  useEffect(() => {
    if (!data) return setData([
      {name: 'Chi phí', data: []},
      {name: 'Doanh thu', data: []},
      {name: 'Lợi nhuận', data: []},
    ])
    // console.log('dddd', data)
    setSeries([
      {name: 'Chi phí', data: data.map(i => +i.von)},
      {name: 'Doanh thu', data: data.map(i => +i.doanhthu)},
      {name: 'Lợi nhuận', data: data.map(i => +i.loinhuan)},
    ])

    setOptions({
      ...defaultOptions,
      xaxis: {categories: data.map(i => i.thoigian.split("T")[0]),}
    })
  }, [data]);


  return (<div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
    <Form className="d-flex gap-3 justify-content-around">
      <FormGroup className="d-flex gap-2 align-items-center">
        <FormLabel className="fw-bold text-nowrap">Chọn tháng</FormLabel>
        <FormSelect value={month} onChange={e => setMonth(e.target.value)}>
          {new Array(12).fill().map((_, j) => <option key={j} value={j + 1}>{j + 1}</option>)}
        </FormSelect>
      </FormGroup>

      <FormGroup className="d-flex gap-2 align-items-center">
        <FormLabel className="fw-bold text-nowrap">Chọn năm</FormLabel>
        <FormSelect value={year} onChange={e => setYear(e.target.value)}>
          {new Array(22).fill().map((_, j) => <option key={j} value={j + 2010}>{2010 + j}</option>)}
        </FormSelect>
      </FormGroup>

      <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
      <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
    </Form>

    <div className="w-100 _h-50">
      <Chart options={options} series={series} type='bar' width="100%" height="100%"/>
    </div>

    <div className="w-100 _h-50 overflow-auto border">
      <TableA index={false} headers={header} data={data}/>

    </div>
  </div>)
}

function ThangTab() {
  const header = [
    {key: "Tháng", value: "thang"},
    {key: "Chi phí", value: "von"},
    {key: "Doanh thu", value: "doanhthu"},
    {key: "Lợi nhuận", value: "loinhuan"},
  ]

  const [year, setYear] = useState(2024)

  const [data, setData] = useState([])
  const [options, setOptions] = useState({
    ...defaultOptions,
    xaxis: {categories: new Array(12).fill(0).map((_, j) => j + 1),}
  })
  const [series, setSeries] = useState([{data: [], name: ''}])

  useEffect(() => {
    getMonthProfits(year).then(({data}) => setData(data))
  }, [year])

  useEffect(() => {
    if (!data.length) return setSeries([
      {name: 'Chi phí', data: []},
      {name: 'Doanh thu', data: []},
      {name: 'Lợi nhuận', data: []},
    ])
    setSeries([
      {name: 'Chi phí', data: data.map(i => +i.von)},
      {name: 'Doanh thu', data: data.map(i => +i.doanhthu)},
      {name: 'Lợi nhuận', data: data.map(i => +i.loinhuan)},
    ])
  }, [data]);


  return (<div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
    <Form className="d-flex gap-3 justify-content-around">
      <FormGroup className="d-flex gap-2 align-items-center">
        <FormLabel className="fw-bold text-nowrap">Chọn năm</FormLabel>
        <FormSelect value={year} onChange={e => setYear(e.target.value)}>
          {new Array(20).fill().map((_, j) => <option key={j} value={j + 2010}>{2010 + j}</option>)}
        </FormSelect>
      </FormGroup>

      <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
      <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
    </Form>

    <div className="w-100 _h-50">
      <Chart options={options} series={series} type='bar' width="100%" height="100%"/>
    </div>

    <div className="w-100 _h-50 overflow-auto border">
      <TableA index={false} headers={header} data={data}/>
    </div>
  </div>)
}

function NamTab() {
  const namHD = [
    {key: "Năm", value: "nam"},
    {key: "Chi phí", value: "von"},
    {key: "Doanh thu", value: "doanhthu"},
    {key: "Lợi nhuận", value: "loinhuan"},
  ]
  const [data, setData] = useState([])

  const [startYear, setStartYear] = useState()
  const [endYear, setEndYear] = useState()

  let options = {...defaultOptions},
      series  = []

  useEffect(() => {
    getYearProfits().then(({data}) => setData(data))
  }, [])

  options = {
    ...defaultOptions,
    xaxis: {categories: data.map(i => +i.nam)}
  }
  series = [
    {name: 'Chi phí', data: data.map(i => +i.von)},
    {name: 'Doanh thu', data: data.map(i => +i.doanhthu)},
    {name: 'Lợi nhuận', data: data.map(i => +i.loinhuan)},
  ]
  return (<div className="d-flex flex-column h-100 w-100  p-3 flex-grow-1 gap-3">
    <Form className="d-flex gap-3 justify-content-around">
      {/*<FormGroup className="d-flex gap-2 align-items-center">*/}
      {/*  <FormLabel className="fw-bold text-nowrap">Từ năm</FormLabel>*/}
      {/*  <FormSelect value={startYear} onChange={e => {*/}
      {/*    setStartYear(+e.target.value)*/}
      {/*    setEndYear(Math.min(endYear, +e.target.value))*/}
      {/*  }}>*/}
      {/*    {data.map((i, j) => <option key={j} value={+i.nam}>{i.nam}</option>)}*/}
      {/*  </FormSelect>*/}
      {/*</FormGroup>*/}
      {/*<FormGroup className="d-flex gap-2 align-items-center">*/}
      {/*  <FormLabel className="fw-bold text-nowrap">Đến năm</FormLabel>*/}
      {/*  <FormSelect value={endYear} onChange={e => setEndYear(e.target.value)}>*/}
      {/*    {data.map((i, j) => <option key={j} value={+i.nam}>{i.nam}</option>)}*/}
      {/*  </FormSelect>*/}
      {/*</FormGroup>*/}

      <Button className=" _w-15 text-nowrap" variant="primary">Thống kê</Button>
      <Button className="_w-15 text-nowrap" variant="success">Excel</Button>
    </Form>

    <div className="w-100 _h-50">
      <Chart options={options} series={series || []} type='bar' width="100%" height="100%"/>
    </div>

    <div className="w-100 _h-50 overflow-auto border">
      <TableA index={false} headers={namHD} data={data}/>

    </div>
  </div>)
}

export default ThongKeDoanhThu