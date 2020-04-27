// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var score = event.score
  var id = event.attendid
  console.log('点击签到', id);
  var now = new Date();
  var nownumber = now.getFullYear * 10000 + (now.getMonth + 1) * 100 + now.getDay ;
  try {
    return await db.collection('attendance').doc(id).update({
      data: {
        signtime: nownumber,
        score: score + 5
      },
    })
  } catch (e) {
    console.error(e)
  }
}