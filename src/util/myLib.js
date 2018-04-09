let myLib = {
  remAdjustPC: function (defaultFontSize, defaultScreenWidth) {
    let htmlNode = document.getElementsByTagName('html')[0];

    function resize () {
      let screenWidth = document.body.offsetWidth;
      if (screenWidth / defaultScreenWidth * defaultFontSize < 48)
        htmlNode.style.fontSize = screenWidth / defaultScreenWidth * defaultFontSize + 'px';
      else
        htmlNode.style.fontSize = '48px';
    }

    document.addEventListener('DOMContentLoaded', function () {
      resize();
    });
    window.addEventListener('resize', resize);
  },
  remAdjust: function (defaultFontSize, defaultScreenWidth) {
    let htmlNode = document.getElementsByTagName('html')[0];

    function resize () {
      let screenWidth = document.body.offsetWidth;
      // let screenHeight = window.screen.height;
      // if(screenWidth / defaultScreenWidth * defaultFontSize>28)
      //    htmlNode.style.fontSize=28+'px';
      // else
      if (myLib.getHostDevice() === 'iphone')
        htmlNode.style.fontSize = (screenWidth / defaultScreenWidth * defaultFontSize > 20 ? 20 : Math.floor(screenWidth / defaultScreenWidth * defaultFontSize * 10) / 10) + 'px';
      else
        htmlNode.style.fontSize = (screenWidth / defaultScreenWidth * defaultFontSize > 18 ? 18 : Math.floor(screenWidth / defaultScreenWidth * defaultFontSize * 9.5) / 10) + 'px';
    }

    document.addEventListener('DOMContentLoaded', function () {
      resize();
    });
    window.addEventListener('resize', resize);
  },
  getHostDevice: function () {
    let result = {
      android: window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Linux') > -1,
      iphone: window.navigator.userAgent.indexOf('iPhone') > -1
    };
    if (result.android) return 'android';
    if (result.iphone) return 'iphone';
    return 'other';
  },
  base64_encode: function (str) {
    let c1, c2, c3;
    let base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let i = 0, len = str.length, string = '';

    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt((c1 & 0x3) << 4);
        string += '==';
        break;
      }
      c2 = str.charCodeAt(i++);
      if (i == len) {
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt((c2 & 0xF) << 2);
        string += '=';
        break;
      }
      c3 = str.charCodeAt(i++);
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
      string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
  },
  base64_decode: function (str) {
    let c1, c2, c3, c4;
    let i, len, out;
    let base64DecodeChars = new Array(
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    len = str.length;
    i = 0;
    out = '';
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 == -1);
      if (c1 == -1)
        break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 == -1);
      if (c2 == -1)
        break;

      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == 61)
          return out;
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1)
        break;

      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61)
          return out;
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1)
        break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  },
  utf8to16: function (str) {
    let out, i, len, c;
    let char2, char3;

    out = '';
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break;
        case 12:
        case 13:
          // 110x xxxx    10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx   10xx xxxx   10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  },
  encodeUTF8: function (str) {
    let temp = '', rs = '';
    for (let i = 0, len = str.length; i < len; i++) {
      temp = str.charCodeAt(i).toString(16);
      rs += '\\u' + new Array(5 - temp.length).join('0') + temp;
    }
    return rs;
  },
  decodeUTF8: function (str) {
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
      return String.fromCharCode(parseInt($2, 16));
    });
  },
  arrayRandomSort: function () {
    return Math.random() > 0.5 ? -1 : 1;
  },
  deepClone: function (obj) {
    let o;
    if (typeof obj == 'object') {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(this.deepClone(obj[i]));
          }
        } else {
          o = {};
          for (let j in obj) {
            o[j] = this.deepClone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  },
  base64Decode: function (input) {
    let rv = window.atob(input);
    rv = escape(rv);
    rv = decodeURIComponent(rv);
    return rv;
  },
  GetQueryString: function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
  },
  getHostApp: function () {
    let result = {
      weixin: window.navigator.userAgent.match(/MicroMessenger/i) || window.WeixinJSBridge != undefined,
      qq: window.navigator.userAgent.indexOf(' QQ') > -1,
      weibo: window.navigator.userAgent.indexOf('weibo') > -1
    };
    if (result.weixin) return 'weixin';
    if (result.qq) return 'qq';
    if (result.weibo) return 'weibo';
    return 'other';
  },
  isIOS9: function () {
    return window.navigator.userAgent.indexOf('iPhone OS 9') > -1;
  },
  isIOS10: function () {
    return window.navigator.userAgent.indexOf('iPhone OS 10') > -1;
  },
  // 根据json array key 排序
  getSortFun: function (order, sortBy) {
    let ordAlpah = (order == 'asc') ? '>' : '<=';
    let sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
  },
  ajax: function ajax (conf) {
    let createAjax = function () {
      let xhr = null;
      try {
        // IE系列浏览器
        xhr = new ActiveXObject('microsoft.xmlhttp');
      } catch (e1) {
        try {
          // 非IE浏览器
          xhr = new XMLHttpRequest();
        } catch (e2) {
          console.log('您的浏览器不支持ajax，请更换！');
        }
      }
      return xhr;
    };
    // 初始化
    // type参数,可选
    let type = conf.type;
    // url参数，必填
    let url = conf.url;
    // data参数可选，只有在post请求时需要
    let data = conf.data;
    // datatype参数可选
    let dataType = conf.dataType;
    // 回调函数可选
    let success = conf.success;
    let error = conf.error ? conf.error : () => {};

    if (type == null) {
      // type参数可选，默认为get
      type = 'get';
    }
    if (dataType == null) {
      // dataType参数可选，默认为text
      dataType = 'text';
    }
    // 创建ajax引擎对象
    let xhr = createAjax();
    // 打开
    xhr.open(type, url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (dataType == 'text' || dataType == 'TEXT') {
          if (success != null) {
            // 普通文本
            success(xhr.responseText);
          }
        } else if (dataType == 'xml' || dataType == 'XML') {
          if (success != null) {
            // 接收xml文档
            success(xhr.responseXML);
          }
        } else if (dataType == 'json' || dataType == 'JSON') {
          if (success != null) {
            // 将json字符串转换为js对象
            success(eval('(' + xhr.responseText + ')'));
          }
        }
      } else if (xhr.readyState == 4) {
        error(xhr.status)
      }
    };

    // 发送
    if (type == 'GET' || type == 'get') {
      xhr.send(null);
    } else if (type == 'POST' || type == 'post') {
      xhr.setRequestHeader('content-type',
        'application/x-www-form-urlencoded');
      xhr.send(data);
    }
  },
  loadJs: function (src, callback) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        callback();
        script.onload = script.onreadystatechange = null;
      }
    };
    script.src = src;
    head.appendChild(script);
  },
  triggerEvent: function (dom, event) {
    if (document.createEvent) {
      let e = document.createEvent('MouseEvents');
      e.initEvent(event, true, true);
      dom.dispatchEvent(e);
    } else {
      dom.fireEvent('on' + event);
    }
  },
  checkMobile: function (phoneNum = '') {
    let myreg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return phoneNum.length === 11 && myreg.test(phoneNum);
  }
};
export default myLib;