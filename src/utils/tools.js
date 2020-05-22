/**
 * Created by Administrator on 2018-6-7.
 */
//转换数组为逗号字符串
export function covertArrParams(obj, key) {
  let _obj = {}
  console.log(key);
  if (key.length > 0) {
    key.forEach(item => {
      var data = [];
      obj[item].forEach(data1 => {
        if (data1) {
          data.push(data1);
        }
      })
      _obj[item] = data.join(',')
    })
  }
  return Object.assign({}, obj, _obj)

}
//修改树结构，删除children为null的节点
export function modifyObj(objArr) {
  const forEachFunc = function (item) {
    if (item.children === null) {
      delete item['children']
    } else {
      if (item.children !== undefined) {
        if (item.children.length === 0) {
          delete item['children']
        } else {
          item.children.forEach(item => {
            forEachFunc(item)
          })
        }

      }
    }
  }
  objArr.forEach(item => {
    forEachFunc(item)
  })
  return objArr
}
//返回搜索树的结果对象集合，平级
export function filterMenus(objArr, query) {
  let _arr = []
  let forEachFunc = (item) => {
    if (item.label.indexOf(query) > -1) {
      let isRepeat = false
      _arr.map(subItem => {
        if (subItem.id === item.id) {
          isRepeat = true
        }
      })
      if (!isRepeat) {
        _arr.push({auditStatus: item.auditStatus, label: item.label, id: item.id, children: null})
      }
    }
    if (item.children !== undefined && item.children !== null) {
      item.children.forEach(item => {
        forEachFunc(item)
      })
    }
  }
  objArr.forEach(item => {
    forEachFunc(item)
  })
  return _arr
}


//返回搜索树的结果对象集合，平级
export function orgTreesSetKeys(objArr, query) {
  let _arr = []
  let forEachFunc = (item) => {
    if (item.id === query.id) {
      item.disabled = true
    }
    if (item.children !== undefined && item.children !== null) {
      item.children.forEach(item => {
        forEachFunc(item)
      })
    }
  }
  objArr.forEach(item => {
    forEachFunc(item)
  })
  return _arr
}


export function resetDataForm(formName) {
  formName.resetFields()
}


export function k() {
  return 'fseport'
}

/**
 * 时间格式化函数
 */
export function timeFormat(time,fmt) {
  var o = {
    "M+": time.getMonth() + 1, //月份
    "d+": time.getDate(), //日
    "h+": time.getHours(), //小时
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    "S": time.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


/*
 获取本月开始结束时间
 */
export function getMonth(type, months) {
  let d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(months) > 12) {
    months = months % 12
  }
  if (months !== 0) {
    if (month + months > 12) {
      year++
      month = (month + months) % 12
    } else if (month + months < 1) {
      year--
      month = 12 + month + months
    } else {
      month = month + months
    }
  }
  month = month < 10 ? "0" + month : month
  let date = d.getDate()
  let firstday = year + "-" + month + "-" + "01"
  let lastday = ""
  if (month === "01" || month === "03" || month === "05" || month === "07" || month === "08" || month === "10" || month === "12") {
    lastday = year + "-" + month + "-" + 31
  } else if (month === "02") {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      lastday = year + "-" + month + "-" + 29
    } else {
      lastday = year + "-" + month + "-" + 28
    }
  } else {
    lastday = year + "-" + month + "-" + 30
  }
  let day = ""
  if (type === "s") {
    day = firstday
  } else {
    day = lastday
  }
  return day
}


export function deleteArr(arr, delIndex) {
  var temArray = [];
  for (var i = 0; i < arr.length; i++) {
    if (i != delIndex) {
      temArray.push(arr[i]);
    }
  }
  return temArray;
}
