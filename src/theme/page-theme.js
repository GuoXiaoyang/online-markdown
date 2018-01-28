import $ from 'jquery';
import showdown from 'showdown';
import 'code-prettify';
import '../showdown-plugins/showdown-footnote';
import '../showdown-plugins/showdown-github-task-list';
import '../showdown-plugins/showdown-prettify-for-wechat';
const converter = new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
})

const themes = [
  '默认样式-适合代码',
  '字号偏大-间距偏大-窄屏模式',
  '字号偏大-间距偏大-宽屏模式',
  '可能吧-序号',
  '可能吧-无序号'
];
const currentTheme = '可能吧-序号';

let PageTheme = function () {
  this.init();
};

PageTheme.prototype.init = function() {
  this.bindEvt();
};

PageTheme.prototype.addOrderedNumber = function () {
  var indices = [];
  $('#outputHtml').find('h1,h2,h3,h4,h5,h6').each(function(i,e) {
    var hIndex = parseInt(this.nodeName.substring(1)) - 1;

    // just found a levelUp event
    if (indices.length - 1 > hIndex) {
      indices= indices.slice(0, hIndex + 1 );
    }

    // just found a levelDown event
    if (indices[hIndex] == undefined) {
       indices[hIndex] = 0;
    }

    // count + 1 at current level
    indices[hIndex]++;
    // display the full position in the hierarchy
    const orderNumbers = indices.join(".");
    const orderEle = $("<div><p>" + orderNumbers + "</p><p class='heading-border'></p></div>");
    orderEle.addClass('heading-order ' + this.tagName.toLowerCase());
    // orderEle.text(orderNumbers)
    orderEle.insertBefore(this);
  });
}

PageTheme.prototype.convertList = function() {
  // 一级列表转为一级引用
  $('#outputHtml>ul, #outputHtml>ol').each(function() {
    $(this).wrap("<blockquote class='kenengba-list'></blockquote>")
  })
}

PageTheme.prototype.convertFirstBlockquote = function() {
  // 一级引用转换为section
  $('#outputHtml>blockquote').each(function() {
    const wrapper = $(this).wrap("<section class='kenengba-wrapper'></section>");
    $("<section class='kenengba-before'></section>").insertBefore(this);
    $("<section class='kenengba-after'></section>").insertAfter(this);
    const content = $(this).replaceWith(function(){
      return $("<section class='kenengba-content' />").append($(this).contents());
    });
  })
}

PageTheme.prototype.convertOtherBlockquote = function() {
  // 二级引用转换为普通文本
  $('#outputHtml>blockquote>blockquote').each(function() {
    const parent = $(this).parent();
    $(this).insertAfter(parent);
    parent.remove();
    $(this).replaceWith(function(){
      return $("<section class='kenengba-blockquote'/>").append($(this).contents());
    });
  })
}

PageTheme.prototype.convertHtml = function(order = true) {
  if (order) {
    this.addOrderedNumber();
  } else {
    $('#outputHtml').find('h1,h2,h3,h4,h5,h6').each(function(i,e) {
      const borderEle = $("<p></p>");
      borderEle.addClass('heading-border ' + this.tagName.toLowerCase());
      borderEle.insertAfter(this);
    })
  }
  this.convertOtherBlockquote();
  this.convertFirstBlockquote();
  this.convertList();
}

PageTheme.prototype.bindEvt = function() {
  var $options = $.map(themes, function(item) {
    var selected = currentTheme === item ? ' selected' : '';
    return '<option value="' + item + '"' + selected + '>' + item +'</option>';
  });
  var self = this;
  $('.page-theme').html($options);
  $('.page-theme').on('change', function() {
    // convertMarkdown first
    var markdownHtml = converter.makeHtml($('#input').val());
    $('#outputHtml').html(markdownHtml);
    PR.prettyPrint();
    $('#outputHtml li').each(function() {
      $(this).html('<span><span>' + $(this).html() + '</span></span>');
    });
    // convertHtml then
    var val = $(this).val();
    if (val === '可能吧-序号') {
      self.convertHtml();
    } else if (val === '可能吧-无序号') {
      self.convertHtml(false);
    } 
    $("#pageThemeId").attr('href', './pageThemes/' + val + '.css');
  }).trigger('change');
};


export default PageTheme;
