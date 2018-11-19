const { issuePage } = require('./setting')
const qs = require('qs')

var menus = [
  '新闻',
  '开源项目',
  '分享',
  '教程',
  '工具',
  '招聘',
  '设计'
].map(type => {
  return chrome.contextMenus.create({
    title: type,
    onclick: function (info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'getInfo'
      }, res => {
        // 在返回的结果上添加分类
        const result = {
          ...res,
          type
        }
        // 跳转到 issue 页面
        chrome.tabs.create({
          url: `${issuePage}?${qs.stringify(result)}`
        })
      });
    }
  })
})