const express = require('express');
const {verifyAccount} = require("../../models/auth");
const {createToken, getSecretKey} = require("./validateToken");
const {insertEmployee} = require("../../models/quanLyTaiKhoan/employees");
const {v4} = require("uuid");
const {insertEmployeeAccount} = require("../../models/quanLyTaiKhoan/accounts");

const router = express.Router({mergeParams: true});

router.post("/login", async function (req, res) {
  const result = await verifyAccount(res.locals.conn, req.body)
  if (!result.result) return res.json(result);
  const token = createToken(result.userid, req.body.mail, req.body.password)

  delete result.userid
  res.json({...result, token})
})

router.post("/register", async function (req, res) {
  const emp = await insertEmployee(res.locals.conn, [
    {hoten: "", ngaysinh: new Date().toISOString().split("T")[0], gioitinh: "Nam", mail: req.body.mail}
  ])
  console.log(emp)
  if (!emp.success) return res.json({message: "Fail create your account", success: false})

  const acc = await insertEmployeeAccount(res.locals.conn, [
    {matkhau: req.body.password, vaitro: 1, nhanvien: emp.Data[0].manhanvien}
  ])
  res.json(acc)
})

router.post("/change-password", function (req, res) {
  // res.json({message: req.path})
  res.redirect("/eee")
})


module.exports = router;