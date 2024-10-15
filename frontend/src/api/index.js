import { v4 } from "uuid"

export async function wait(s) {
  return new Promise(a => setTimeout(a, s * 1000))
}

export const thuocTinhAPI = {
  async GET(api) {
    await wait(.5)
    switch (api) {
      case "ram":
      case "rom":
        return {
          body: [
            { ma: v4(), ten: 4 },
            { ma: v4(), ten: 6 },
            { ma: v4(), ten: 8 },
            { ma: v4(), ten: 12 },
            { ma: v4(), ten: 16 },
            { ma: v4(), ten: 24 },
            { ma: v4(), ten: 32 }
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
          message: `Fail, cant not find route ${api}`
        }
    }
  },
  async PUT(api, data) {
    await wait(.5)
    return {
      body: [
        { ma: v4(), ten: data.ten }
      ],
      message: "Success"
    }
  },
  async POST(api, data) {
    await wait(.5)
    return {
      body: [

      ],
      message: "Success"
    }
  },
  async DELETE(api, data) {
    await wait(.5)
    return {
      body: [

      ],
      message: "Success"
    }
  }
}

export const sanPhamAPI = {

}