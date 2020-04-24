// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    return await db.collection('tiezi').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: event.title,
        content: event.content,
        pic: event.pic,
        comment: [],
        praise:1,
        openid: wxContext.OPENID,
        createTime: db.serverDate() //添加该字段
      }
    })
  } catch (e) {
    console.error(e)
  }

}