margin: 0 auto居中需要在要居中的元素上设置宽度

position: absolute和fixed会生成一个可以设置宽、高、内边距和外边距的块级框

控制布局宽度，而让内容决定布局高度这个一般原则就好了。

1. 没有宽度的盒子
盒模型结论一：没有（就是没有设置width的）宽度的元素始终会扩展到填满其父元素的宽度为止。添加水平边框、内边距和外边距，会导致内容宽度减少，减少量等于水平边框、内边距和外边距的和。
2. 有宽度的盒子
盒模型结论二：为设定了宽度的盒子添加边框、内边距和外边距，会导致盒子扩展得更宽。实际上，盒子的width属性设定的只是盒子内容区的宽度，而非盒子要占据的水平宽度。

浮动非图片元素时，必须给它设定宽度，否则后果难以预料。图片无所谓，因为它本身有默认的宽度。

