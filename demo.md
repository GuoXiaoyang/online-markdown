# 微信公众号格式化工具

GitHub 地址：[https://github.com/barretlee/online-markdown](https://github.com/barretlee/online-markdown)

> 使用微信公众号编辑器有一个十分头疼的问题——粘贴出来的代码，格式错乱，而且特别丑。这块编辑器能够解决这个问题。

## Changelog

* 适配 Android
* 支持代码不转行，横向滚动条
* 支持页面主题样式配置
* 新增可能吧微信公众号样式（该样式属于模仿，仅供参考，如有侵权，联系本人github)

1.  Level 1
1.  Level 1
2.  Level 1
1.  Level 1

//  分隔


*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

//  分隔


*  level 1
    *  Level 2
        *   Level 3
    *  level 2
        *  Level 3
*  Level 1


## 可能吧样式
分为带序号与不带序号版本，
带序号版本需要从一级标题开始，不然序号会乱
列表不支持嵌套的样式
在输入编辑框中更新文本样式会重置，需要重新选择一次样式
嵌套样式可能会丢失

## 一级引用
> 一级引用啊端口啦舒服的啊时刻焕发对结核杆菌给对方设计稿和空间感和健康还是规范健康环境咖啡馆会

-----

> aiefhiuw 
>> aldueiwhyiuwyhr 

## 二级引用
>> 我与父亲不相见已有二年余了，我最不能忘记的是他的背影。那年冬天，祖母死了，父亲的差使也交卸了，正是祸不单行的日子，我从北京到徐州，打算跟着父亲奔丧回家。到徐州见着父亲，看见满院狼籍的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说，“事已如此，不必难过，好在天无绝人之路！”

>> 回家变卖典质，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨淡，一半为了丧事，一半为了父亲赋闲。丧事完毕，父亲要到南京谋事，我也要回到北京念书，我们便同行。

------
>> aoirdeh
>>> adljuewsiohfriu


### 代码示例

```javascript
var OnlineMarkdown = {
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start()
    }).fail(function(){
      self.start();
    });
  },
  start: function() {
    this.updateOutput();
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: params.path || './demo.md',
      dateType: 'text',
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  updateOutput: function () {
    var val = this.converter.makeHtml($('#input').val());
    $('#output .wrapper').html(val);
    PR.prettyPrint();
  }
};

OnlineMarkdown.init();
```
---

上面是 `JavaScript`，下面是 `php`：

```php
echo 'hello,world'
```

### 表格示例

| 品类 | 个数 | 备注 |
|-----|-----|------|
| 苹果 | 1   | nice |
| 橘子 | 2   | job |

### 关于小胡子哥

![微信公众号](http://md.barretlee.com/imgs/qrcode.jpg)

---

以上是用的比较多的，还装了几十个使用频度比较低的插件，主要包括 Snippet 和文件高亮配置，可以在这里查看：<https://gist.github.com/barretlee/a5170eb6ca1805f66687063d2e3a4983>，你也可以通过 `Settings Sync` 将这个配置下载下来，id 就是后面半截：`a5170eb6ca1805f66687063d2e3a4983`。

### 在命令行打开 VSC

在安装好 VSC 后，直接配置 `.bash_profile` 或者 `.zshrc` 文件：

```bash
alias vsc='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code';
VSC_BIN='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin';
PATH=$VSC_BIN:$PATH;
export PATH;
```

然后让配置生效，在控制台执行：

```bash
# 如果没有安装 zsh，可能是 ~/.bash_profile
source ~/.zshrc 
```

这个时候就可以在全局打开了：

```bash
# -a 的意思是不要新开窗口，在当前已经打开的 vsc 中打开文件
vsc path/to/file.ext -a 
```

有同学提到，VSC 的面板上搜索 `install` 就可以在命令行安装 `code` 这个命令了，不过我更喜欢使用 `vsc` 来打开文件，这也算是折腾吧 ；


