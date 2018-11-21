new Vue({
  el: '#wrapper',
  data: {
    items: Array,
    latest: Object,
    second: Object
  },
  created: function () {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status == 200 && xmlhttp.responseText) {
        // console.log(xmlhttp.responseText);
        let items = JSON.parse(xmlhttp.responseText);

        items = items.map(v => {
          v.user = JSON.parse(v.user);
          let createdAt = new Date(v.createdAt);
          v.createdAt = createdAt.getFullYear() + "年" + createdAt.getMonth() + "月" + createdAt.getDate() + "日";
          return v;
        })
        this.latest = items.pop();

        this.second = items.pop();

        this.items = items;
      }
    }
    xmlhttp.open('GET', '/v1/article', true);
    xmlhttp.send();
  }
})

$(document).ready(function () {
  var canvas = document.getElementById("canvas")
  var ctx = canvas.getContext("2d")
  
  canvas.onmousedown = function (e) {
    var disX = e.clientX - canvas.offsetLeft
    var disY = e.clientY - canvas.offsetTop //计算鼠标在画布的距离
    ctx.beginPath();
    ctx.moveTo(disX, disY)
    document.onmousemove = function (e) {
      var disX = e.clientX - canvas.offsetLeft
      var disY = e.clientY - canvas.offsetTop
      ctx.lineTo(disX, disY) //鼠标点下去的位置
      ctx.stroke()
    }
    document.onmouseup = function () {
      document.onmousedown = null //鼠标放开的位置
      document.onmousemove = null
    }

  }

})