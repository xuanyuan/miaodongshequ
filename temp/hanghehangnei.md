HTML中行内元素有哪些？块级元素有哪些？
1.关于行内元素和块状元素的说明

       根据CSS规范的规定，每一个网页元素都有一个display属性，用于确定该元素的类型，每一个元素都有默认的display属性值，比如div元素，它的默认display属性值为“block”，成为“块级”元素(block-level)；而span元素的默认display属性值为“inline”，称为“行内”元素。div这样的块级元素，就会自动占据一定矩形空间，可以通过设置高度、宽度、内外边距等属性，来调整的这个矩形的样子；与之相反，像“span”“a”这样的行内元素，则没有自己的独立空间，它是依附于其他块级元素存在的，因此，对行内元素设置高度、宽度、内外边距等属性，都是无效的。

2.行内、块状元素区别：
   (1).块级元素会独占一行，其宽度自动填满其父元素宽度
        行内元素不会独占一行，相邻的行内元素会排列在同一行里，知道一行排不下，才会换行，其宽度随元素的内容而变化
   (2). 一般情况下，块级元素可以设置 width, height属性，行内元素设置width,  height无效
         (注意：块级元素即使设置了宽度，仍然是独占一行的)
   (3).块级元素可以设置margin 和 padding.  行内元素的水平方向的padding-left,padding-right,margin-left,margin-right 都产生边距效果，但是竖直方向的padding-top,padding-bottom,margin-top,margin-bottom都不会产生边距效果。（水平方向有效，竖直方向无效）
 
3.行内、块状元素：
块元素(block element)

　　* address - 地址
　　* blockquote - 块引用
　　* center - 举中对齐块
　　* dir - 目录列表
　　* div - 常用块级容易，也是css layout的主要标签
　　* dl - 定义列表
　　* fieldset - form控制组
　　* form - 交互表单
　　* h1 - 大标题
　　* h2 - 副标题
　　* h3 - 3级标题
　　* h4 - 4级标题
　　* h5 - 5级标题
　　* h6 - 6级标题
　　* hr - 水平分隔线
　　* isindex - input prompt
　　* menu - 菜单列表
　　* noframes - frames可选内容，（对于不支持frame的浏览器显示此区块内容
　　* noscript - 可选脚本内容（对于不支持script的浏览器显示此内容）
　　* ol - 排序表单
　　* p - 段落
　　* pre - 格式化文本
　　* table - 表格
　　* ul - 非排序列表

内联元素(inline element)

　　* a - 锚点
　　* abbr - 缩写
　　* acronym - 首字
　　* b - 粗体(不推荐)
　　* bdo - bidi override
　　* big - 大字体
　　* br - 换行
　　* cite - 引用
　　* code - 计算机代码(在引用源码的时候需要)
　　* dfn - 定义字段
　　* em - 强调
　　* font - 字体设定(不推荐)
　　* i - 斜体
　　* img - 图片
　　* input - 输入框
　　* kbd - 定义键盘文本
　　* label - 表格标签
　　* q - 短引用
　　* s - 中划线(不推荐)
　　* samp - 定义范例计算机代码
　　* select - 项目选择
　　* small - 小字体文本
　　* span - 常用内联容器，定义文本内区块
　　* strike - 中划线
　　* strong - 粗体强调
　　* sub - 下标
　　* sup - 上标
　　* textarea - 多行文本输入框
　　* tt - 电传文本
　　* u - 下划线
　　* var - 定义变量

可变元素

　　可变元素为根据上下文语境决定该元素为块元素或者内联元素。
　　* applet - java applet
　　* button - 按钮
　　* del - 删除文本
　　* iframe - inline frame
　　* ins - 插入的文本
　　* map - 图片区块(map)
　　* object - object对象
　　* script - 客户端脚本