const app = getApp()

Page({
    data: {
        className: false
    },
    onLoad: function () {

    },
    onPageScroll: function (e) {
        if (e.scrollTop > 150) {
            this.setData({
                className: true
            })
        } else {
            this.setData({
                className: false
            })
        }
    },
    getPhoneNumber(res) {
        console.log(res);
    }
})
