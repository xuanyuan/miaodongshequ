\<canvas> 只有两个可选的属性 width、heigth 属性。 如果不给\<canvas>设置widht、height属性时，则默认 width为300、height为150,单位都是px。也可以使用css属性来设置宽高，但是如宽高属性和初始比例不一致，他会出现扭曲。所以，建议永远不要使用css属性来设置\<canvas>的宽高。


\<canvas> 只支持一种原生的 图形绘制：矩形。所有其他图形都至少需要生成一种路径(path)。

### 绘制矩形 ###
canvas 提供了三种方法绘制矩形：

* fillRect(x, y, width, height)
>绘制一个填充的矩形

* strokeRect(x, y, width, height)
>绘制一个矩形的边框

* clearRect(x, y, widh, height)

说明：
这3个方法具有相同的参数。

​x, y：指的是矩形的左上角的坐标。(相对于canvas的坐标原点)

​width, height：指的是绘制的矩形的宽和高。

### 绘制路径 ###

图形的基本元素是路径。

路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

一个路径，甚至一个子路径，都是闭合的。
* 绘制路径的步骤

1. 创建路径起始点
2. 调用绘制方法去绘制出路径
3. 把路径封闭
4. 一旦路径生成，通过描边或填充路径区域来渲染图形。

下面是需要用到的方法
1. beginPath()
>新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
2. moveTo(x, y)
>把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。
3. closePath()
>闭合路径之后，图形绘制命令又重新指向到上下文中
4. stroke()
>通过线条来绘制图形轮廓
5. fill()
>通过填充路径的内容区域生成实心的图形

4.1 绘制线段
```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath(); //新建一条path
    ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    ctx.stroke(); //绘制路径。
}
draw();
```
4.2 绘制三角形边框
```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
  	ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
    ctx.stroke(); //描边。stroke不会自动closePath()
}
draw();
```

4.3 填充三角形
```js
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
   
    ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
}
draw();
```