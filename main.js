/*
* Takes provided URL passed as argument and make screenshots of this page with several viewport sizes.
* These viewport sizes are arbitrary, taken from iPhone & iPad specs, modify the array as needed
*
* Usage:
* $ casperjs screenshots.js http://yahoo.co.jp
*/
var casper = require("casper").create();
var _ = require('underscore');

var _html = (function () {/*
  <style>
    .tblDocInfo,.tblDocInfo th,.tblDocInfo td{
     border-collapse: collapse;
     border:1px solid #333;
    }
    .tblDocInfo th{
     background-color: #d9d9d9;
    }
  </style>
  <table border="1" class="tblDocInfo">
    <thead>
      <tr>
        <th>フェーズ</th>
        <th>システム名</th>
        <th>サブシステム名</th>
        <th>ドキュメントID</th>
        <th>ドキュメント名</th>
        <th colspan="2">作成日／更新日</th>
        <th colspan="2">作成者／更新者</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2"><%= phase %></td>
        <td rowspan="2"><%= system %></td>
        <td rowspan="2"><%= subSystem %></td>
        <td rowspan="2"><%= documentID %></td>
        <td rowspan="2"><%= documentName %></td>
        <td>[作]</td>
        <td><%= createDate %></td>
        <td>[作]</td>
        <td><%= createUser %></td>
      </tr>
      <tr>
        <td>[更]</td>
        <td><%= alterDate %></td>
        <td>[更]</td>
        <td><%= alterUser %></td>
      </tr>
    </tbody>
  </table>
*/}).toString().replace(/(\n)/g, '').split('*')[1];
var headerTmpl = _.template(_html);

var fs = require("fs");
var infoJson = fs.read("./casper-info.json");
var info = JSON.parse(infoJson);
var htmlHeader = headerTmpl(info[0]);


var json = fs.read("./casper-settings.json");
var settings = JSON.parse(json);

var screenshotUrl = 'http://google.com/';
var screenshotNow = new Date();
var screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds());

if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs screenshots.js http://example.com")
    .exit(1)
  ;
} else {
  screenshotUrl = casper.cli.args[0];
}

casper.start(screenshotUrl, function() {
  this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.each(settings, function(casper, values) {
  this.then(function() {
    this.viewport(values.viewport.width, values.viewport.height);
    this.userAgent(values.userAgent);
  });
  this.thenOpen(screenshotUrl, function() {
    this.wait(5000);
    this.evaluate(function() {
      if(document.body.style.backgroundColor===''){
      // 透過背景になるのを防止
      document.body.style.backgroundColor="#fff"
      }
    });

  });
  this.then(function(){
    this.echo('Screenshot for ' + values.name + ' (' + values.viewport.width + 'x' + values.viewport.height + ')', 'info');
    // this.capture('screenshots/' + screenshotDateTime + '/' + values.name + '-' + values.viewport.width + 'x' + values.viewport.height + '.png', {
    //     top: 0,
    //     left: 0,
    //     width: values.viewport.width,
    //     height: values.viewport.height
    // });
    this.capture('screenshots/' + screenshotDateTime + '/' + values.name + '-' + values.viewport.width + 'x' + values.viewport.height + '.png');
    this.page.paperSize = { format: 'A3', orientation: 'portrait', border: '1cm'} ;
    this.capture('screenshots/' + screenshotDateTime + '/' + values.name + '-' + values.viewport.width + 'x' + values.viewport.height + '.pdf');
  });
});
casper.run(function() {

  // ファイル作成
  var header_html = fs.read('./tmpl_header.html');
  header_html += '<title>' + "ファイル名を入れる?" + '</title>'+"\n";
  header_html += '</head>'+"\n";
  header_html += '<body>'+"\n";

  var xxx = '';
  xxx +='<table class="tblScreenShots">';
  xxx +='<tr>';
  xxx +='<th>【PC】(1280px)</th>';
  xxx +='</tr>';
  xxx +='<tr>';
  xxx +='<td><img src="./screenshots/' + screenshotDateTime + '/desktop-standard-1280x1024.png" alt="" class="img-border forA3"></td>';
  xxx +='</tr>';
  xxx +='</table>';
  var footer_html = fs.read('./tmpl_footer.html');
  header_html += htmlHeader + xxx + footer_html;
  fs.write('writetest1.html', header_html , function (err) {console.log(err);});

  // ファイル作成2
  var header_html = fs.read('./tmpl_header.html');
  header_html += '<title>' + "ファイル名を入れる?" + '</title>'+"\n";
  header_html += '</head>'+"\n";
  header_html += '<body>'+"\n";

  var xxx = '';
  xxx +='<table class="tblScreenShots">';
  xxx +='<tr>';
  xxx +='<th>【スマホ】(320px)</th>';
  xxx +='<th>【タブレット】(768px)</th>';
  xxx +='<th>【PC】(1280px)</th>';
  xxx +='</tr>';
  xxx +='<tr>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/smartphone-portrait-320x480.png" alt="" class="img-border forA3L"></td>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/tablet-portrait-768x1024.png" alt="" class="img-border forA3L"></td>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/desktop-standard-1280x1024.png" alt="" class="img-border forA3L"></td>';
  xxx +='</tr>';
  xxx +='</table>';
  var footer_html = fs.read('./tmpl_footer.html');
  header_html += htmlHeader + xxx + footer_html;
  fs.write('writetest2.html', header_html , function (err) {console.log(err);});

  // ファイル作成3
  var header_html = fs.read('./tmpl_header.html');
  header_html += '<title>' + "ファイル名を入れる?" + '</title>'+"\n";
  header_html += '</head>'+"\n";
  header_html += '<body>'+"\n";
  var xxx = '';
  xxx +='<table class="tblScreenShots">';
  xxx +='<tr>';
  xxx +='<th>【スマホ】(480px)</th>';
  xxx +='<th>【タブレット】(1024px)</th>';
  xxx +='<th>【PC】(1280px)</th>';
  xxx +='</tr>';
  xxx +='<tr>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/smartphone-landscape-480x320.png" alt="" class="img-border forA3L"></td>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/tablet-landscape-1024x768.png" alt="" class="img-border forA3L"></td>';
  xxx +='<td style="padding:0 5px;"><img src="./screenshots/' + screenshotDateTime + '/desktop-standard-1280x1024.png" alt="" class="img-border forA3L"></td>';
  xxx +='</tr>';
  xxx +='</table>';
  var footer_html = fs.read('./tmpl_footer.html');
  header_html += htmlHeader + xxx + footer_html;
  fs.write('writetest3.html', header_html , function (err) {console.log(err);});

  this.echo('Done.').exit();
});


function pad(number) {
  var r = String(number);
  if ( r.length === 1 ) {
    r = '0' + r;
  }
  return r;
}
