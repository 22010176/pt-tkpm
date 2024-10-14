import { v4 } from "uuid"

function genThuocTinh() {

}

export const thuocTinhAPI = {
  async GET(table) {
    switch (table) {
      case "ram":
      case "rom":
        return {
          body: [
            { ma: v4(), ten: "4GB" },
            { ma: v4(), ten: "6GB" },
            { ma: v4(), ten: "8GB" },
            { ma: v4(), ten: "12GB" },
            { ma: v4(), ten: "16GB" },
            { ma: v4(), ten: "24GB" },
            { ma: v4(), ten: "32GB" }
          ],
          message: "Success"
        }
      case "thuongHieu":
      case "xuatXu":
      case "heDieuHanh":
      case "mauSac":
        return {
          body: [
            { ma: v4(), ten: "test1" },
            { ma: v4(), ten: "test2" },
            { ma: v4(), ten: "test3" },
            { ma: v4(), ten: "test4" },
          ],
          message: "Success"
        }
      default:
        return {
          body: [],
          message: `Fail, cant not find route ${table}`
        }
    }
  },
  async PUT() {
    return {
      body: [

      ],
      message: "Success"
    }
  },
  async POST() {
    return {
      body: [

      ],
      message: "Success"
    }
  },
  async DELETE() {
    return {
      body: [

      ],
      message: "Success"
    }
  }
}

export const sanPhamAPI = {

}