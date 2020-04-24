// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()


const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('tiezi').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('tiezi').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  // 等待所有
  let res = (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })

  let search = []
  for (let i = 0; i < res.data.length; i++) {
    let data = await db.collection('user').where({
      openid: res.data[i].openid
    }).orderBy('_id', 'desc').limit(1).get()

    res.data[i].head = data.data[0].head
    res.data[i].nickname = data.data[0].nickname
    if (res.data[i].nickname === event.keyword) {
      search.push(res.data[i])
      continue
    }
    if (res.data[i].content.indexOf(event.keyword) !== -1) {
      search.push(res.data[i])
      continue
    }
  }

  return {
    data: search,
    errMsg: res.errMsg,
  }
}