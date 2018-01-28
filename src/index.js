import './styles/index.scss';
import $ from 'jquery';
import showdown from 'showdown';
import 'code-prettify';
import Clipboard from 'clipboard';
import CodeTheme from './theme/code-theme';
import PageTheme from './theme/page-theme';

import './showdown-plugins/showdown-footnote';
import './showdown-plugins/showdown-github-task-list';
import './showdown-plugins/showdown-prettify-for-wechat';


const converter = new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
})

const OnlineMarkdown = {
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start()
    }).fail(function(){
      self.start();
    });
  },
  start: function() {
    this.bindEvt();
    this.updateOutput();
    new CodeTheme();
    new PageTheme();
    new Clipboard('.copy-button');
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: './demo.md',
      dateType: 'text',
      data: {
        _t: new Date() * 1
      },
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  bindEvt: function() {
    var self = this;
    $('#input').on('input keydown paste', self.updateOutput);
  },

  updateOutput: function () {
    var val = converter.makeHtml($('#input').val());
    $('#outputHtml').html(val);
    PR.prettyPrint();
    $('#outputHtml li').each(function() {
      $(this).html('<span><span>' + $(this).html() + '</span></span>');
    });
  }
}

OnlineMarkdown.init();