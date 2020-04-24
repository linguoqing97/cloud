// pages/mycode/read/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiezi: {
      title: "biaoti", content: "content", head: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJd6F7euRx3QunBnLIiba8B2bCKBG5bmibB4Vv68fBhLSWESzxvbPIMaXTA6V8CCCjgw1XyH87c3SCA/132", nickname: "xxx", pic: "cloud://qingshi-71bnq.7169-qingshi-71bnq-1301209229/qqq.png", comment: "comment"
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let tiezi = wx.getStorageSync("detail")
    console.log(tiezi)
    this.setData({
      tiezi
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

   onComment: function () {
    console.log("comment")
    wx.navigateTo({
      url: './comment/comment',
    })
   }
})