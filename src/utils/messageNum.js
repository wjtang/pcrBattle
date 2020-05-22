import {getIsNew} from '@/api/message.js'

export  function messageNum() {
  // console.log(document.getElementsByClassName('el-menu-item').length);
  var a = setTimeout(() => {
    console.log(document.getElementsByClassName('el-menu-item').length);
    let b = document.getElementsByClassName('el-menu-item');

    // Array.prototype.slice.call(b).forEach((data,index) => {
    //   console.log(b[9].innerText.length);
      let iDom = document.createElement('i');
      let iDom1 = document.createElement('i');
      let flag = true;
      let flag1 = 0;
      let index= getDomindex('消息管理');
      let index1 = getDomindex('委托管理');
      iDom.setAttribute("class",'messageiDom');
      iDom1.setAttribute("class",'messageiDomText');
    getIsNew().then(data => {
      flag = data.data.data.newMsg <= 0;
      flag1 = data.data.data.newEntrust;
      let dom1 = document.getElementsByClassName('messageiDom');
      let dom2 = document.getElementsByClassName('messageiDomText');
      b[index].appendChild(iDom);
      b[index1].appendChild(iDom1);
      if(flag){
        if(!hasClass(dom1[0],'hide')) {
          dom1[0].classList.add('hide');
        }
      }else{
        if(hasClass(dom1[0],'hide')) {
          dom1[0].classList.remove('hide');
        }
      }
      if(flag1 >0){
        if(hasClass(dom2[0],'hide')) {
          dom2[0].classList.remove('hide');
        }
        dom2[0].innerHTML = flag1;
      }else{
        if(!hasClass(dom2[0],'hide')) {
          dom2[0].classList.add('hide');
        }
      }
    })
      var c = setInterval(() => {
        getIsNew().then(data => {
          flag = data.data.data.newMsg <= 0;
          flag1 = data.data.data.newEntrust;
          let dom1 = document.getElementsByClassName('messageiDom');
          let dom2 = document.getElementsByClassName('messageiDomText');
          if(flag){
            if(!hasClass(dom1[0],'hide')) {
              dom1[0].classList.add('hide');
            }
          }else{
            if(hasClass(dom1[0],'hide')) {
              dom1[0].classList.remove('hide');
            }
          }
          if(flag1 >0){
            if(hasClass(dom2[0],'hide')) {
              dom2[0].classList.remove('hide');
            }
            dom2[0].innerHTML = flag1;
          }else{
            if(!hasClass(dom2[0],'hide')) {
              dom2[0].classList.add('hide');
            }
          }
        })
      },60000)
    // })
  },2000)
}

export function changeMessagenum() {
  let b = document.getElementsByClassName('el-menu-item');
    let dom1 =  document.getElementsByClassName('messageiDom');
    let dom2 = document.getElementsByClassName('messageiDomText');
    let flag = true;
    let flag1 = 0;
    let index= getDomindex('消息管理');
    let index1 = getDomindex('委托管理');
    if(dom1){
      getIsNew().then(data => {
        flag = data.data.data.newMsg <= 0;
        flag1 = data.data.data.newEntrust;
        let dom1 = document.getElementsByClassName('messageiDom');
        let dom2 = document.getElementsByClassName('messageiDomText');
        if(flag){
          if(!hasClass(dom1[0],'hide')) {
            dom1[0].classList.add('hide');
          }
        }else{
          if(hasClass(dom1[0],'hide')) {
            dom1[0].classList.remove('hide');
          }
        }
        if(flag1 >0){
          if(hasClass(dom2[0],'hide')) {
            dom2[0].classList.remove('hide');
          }
          dom2[0].innerHTML = flag1;
        }else{
          if(!hasClass(dom2[0],'hide')) {
            dom2[0].classList.add('hide');
          }
        }
      })
    }else{
      let iDom = document.createElement('i');
      let iDom1 = document.createElement('i');
      iDom.setAttribute("class",'messageiDom');
      iDom1.setAttribute("class",'messageiDomText');
      getIsNew().then(data => {
        flag = data.data.data <= 0;
        let dom1 = document.getElementsByClassName('messageiDom');
        let dom2 = document.getElementsByClassName('messageiDomText');
        b[index].appendChild(iDom);
        b[index1].appendChild(iDom1);
        if(flag){
          if(!hasClass(dom1[0],'hide')) {
            dom1[0].classList.add('hide');
          }
        }else{
          if(hasClass(dom1[0],'hide')) {
            dom1[0].classList.remove('hide');
          }
        }
        if(flag1 >0){
          if(hasClass(dom2[0],'hide')) {
            dom2[0].classList.remove('hide');
          }
          dom2[0].innerHTML = flag1;
        }else{
          if(!hasClass(dom2[0],'hide')) {
            dom2[0].classList.add('hide');
          }
        }
      })
    }
}

function hasClass(obj, cls){
  var obj_class = obj.className;//获取 class 内容.
  var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
  let x = 0;
  for(x in obj_class_lst) {
    if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
      return true;
    }
  }
  return false;
}

function  getDomindex(name) {
  let a = document.getElementsByClassName('el-menu-item');
  let index1 = false;
  Array.prototype.slice.call(a).forEach((data,index) => {
      let str = data.innerText.replace(/\s*/g,"");
      // console.log(str);
    if(str == name){
      index1  = index;
    }
  })
  return index1;
}
