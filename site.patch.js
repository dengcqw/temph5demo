
var utils = require('./utils.js');
var siteIds = require('./site.id.js').siteIds;


/* 解决各站点一些特殊问题的函数 */
var patches = {};

patches[siteIds.bilibili] = [
  ()=> { /* 打开客户端，分享收藏缓存 tool bar */
    var viewportScale = utils.getViewportScale();
    if (viewportScale == 0.5) {
      utils.waitElement(1000,
        ()=>document.getElementById('page').childNodes[0].childNodes[2],
        utils.cloneAndReplaceElement
      );
    } else {
      utils.waitElement(1000,
        ()=>document.querySelector('#video-opt'),
        utils.cloneAndReplaceElement
      );
    }
  },
  ()=>{ /* 引藏底部栏 */
    utils.waitElement(1000,
      ()=>document.getElementById('b_app_link'),
      (element)=> { element.style.zIndex = '-100'; return element; }
    );
  }
];

patches[siteIds.acfun] = [
  ()=>{ /* 下滑时，顶部下载提示 */
    utils.waitElement(1000,
      ()=>document.getElementById('prompt-box'),
      (element)=>{ element.style.zIndex = '-100'; return element; }
  },
  ()=>{ /* 打开客户端，分享收藏缓存 tool bar */
    utils.waitElement(1000,
      ()=>document.querySelector('block-toolbar'),
      utils.cloneAndReplaceElement
    );
  },
  ()=> { /* 底部下载app按键 */
    utils.waitElement(1000,
      ()=>document.getElementById('bottom-download'),
      utils.cloneAndReplaceElement
    );
  }
];

patches[siteIds.mgtv] = [
  ()=> {
    utils.waitElement(1000,
      ()=>{
        var parentEle = document.querySelector('.v5-area-bar');
        if (!parentEle) {
          return undefined;
        }
        var array = [];
        var ele = parentEle.querySelector('.bd.list'); /* 分享 bar */
        if (ele) array.push(ele);
        ele = document.getElementsByClassName('mg-stat'), /* 下载app 元素 */
        if (ele && ele.length) array.concat(ele);
        return array;
      },
      utils.cloneAndReplaceElement
    );
  }
]

module.exports = patches;
