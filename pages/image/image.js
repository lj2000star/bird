//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '上传鹦鹉自拍',
    userInfo: {}
  },
  //事件处理函数
  uploadImage: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)

        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0],
          encoding: "base64",
          success(base64) {
            base64 = base64.data;
            wx.request({
              url: 'https://api.gonorth.top/birds/',
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              data: {
                "image": base64
              },
              success(res) {
                console.log(res)

                wx.hideToast()

                // TODO::判断是否识别成功
                var data = res.data;
                app.pageData.detailPage.data = data;
                wx.navigateTo({
                  url: '/pages/detail/detail',
                })

              }

            })
          }
        })


        wx.showToast({
          title: '鉴定中，请稍候',
          icon: 'loading',
          duration: 2000
        })

        that.upload(tempFilePaths[0])

        // wx.request({
        //   url: 'https://api.gonorth.top/birds/',
        //   header: {
        //     'content-type': 'application/json'
        //   },
        //   method:"POST",
        //   data:{
        //     "image":
        //   },
        //   success(res){
        //     console.log(res)
        //   }

        // })




        // wx.uploadFile({
        //   url: 'https://api.gonorth.top/birds/',
        //   header: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   filePath: tempFilePaths[0],
        //   name: 'image',
        //   success: function (res) {
        //     console.log(res)
        //     console.log(res.data)
        //     wx.hideToast()
        //     var data = JSON.parse(res.data)
        //     if (!data.attributes) {
        //       that.setData({
        //         userInfo: {
        //           avatarUrl: data.url,
        //           tips: '未检测成功'
        //         }
        //       })
        //       return
        //     }
        //     // const genders = {
        //     //   
        //     // })
        //     //do something
        //   }
        // })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
  },

  // upload(url) {
  //   var that = this;
  //   wx.request({
  //     url: url,
  //     responseType: 'arraybuffer',
  //     success: res => {
  //       let base64 = wx.arrayBufferToBase64(res.data);

  //       wx.request({
  //         url: 'https://api.gonorth.top/birds/',
  //         header: {
  //           'content-type': 'application/json'
  //         },
  //         method: "POST",
  //         data: {
  //           "image": base64
  //         },
  //         success(res) {
  //           console.log(res)

  //           wx.hideToast()

  //           // TODO::判断是否识别成功
  //           var data = res.data;
  //           app.pageData.detailPage.data = data;
  //           wx.navigateTo({
  //             url: '/pages/detail/detail',
  //           })

  //         }

  //       })

  //     }
  //   })
  // }
})