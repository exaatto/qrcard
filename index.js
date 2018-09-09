var vcard_fields = [
  {
    'tag'  : 'FN:',
    'id'   : 'FN',
    'label': '姓名',
    'text' : '码小名'
  },
  {
    'tag'  : 'EMAIL:',
    'id'   : 'EMAIL',
    'label': '电子邮件',
    'text' : 'maxiaoming@email.com'
  },
  {
    'tag'  : 'ORG:',
    'id'   : 'ORG',
    'label': '公司/部门',
    'text' : '二维码公司电子部名片室'
  },
  {
    'tag'  : 'TITLE:',
    'id'   : 'TITLE',
    'label': '职位',
    'text' : '扫码专员'
  },
  {
    'tag'  : 'TEL;TYPE=CELL:',
    'id'   : 'TELC',
    'label': '手机',
    'text' : '13995279527'
  },
  {
    'tag'  : 'TEL;TYPE=WORK,VOICE:',
    'id'   : 'TELWV',
    'label': '工作电话',
    'text' : '095 95279527 27'
  },
  {
    'tag'  : 'ADR;TYPE=WORK:;;',
    'id'   : 'ADDR',
    'label': '地址',
    'text' : '码大道2号'
  }
]
var one = function(o)
{
  return $('<div>', {
      'class': 'row input-group'
      }).append([
        $('<label>', {
          'for': 'staticEmail',
          'class': 'col-4 col-form-label',
          'text': o.label
          }),
        $('<div>', {
          'class': 'col-8'
          }).append(
            $('<input>', {
              'type': 'text',
              'class': 'form-control',
              'id': o.id,
              'placeholder': o.text
              })
            )
      ])
}

var gen = function (flag) {
  var vcard = 'BEGIN:VCARD\nVERSION:3.0\n'
  $.each(vcard_fields, function(i, o) {
    var v;
    if (flag) {
      v = o.text;
    } else {
      v = $('#'+o.id).val();
    }
    vcard += o.tag + v +'\n';
  })
  vcard += 'NOTE:访问 exaatto.github.io/qrcard 生成电子名片！\n'
  vcard += 'END:VCARD'
  console.log(vcard)
  var query = 'https://exaatto.info/card/' + encodeURIComponent(encodeURIComponent(vcard));
  $.get(query,
    function(data){
      console.log(data)
      $('#graph').html(
        $('<img>', {
          'class': 'image-fluid',
          'style': 'width:100%',
          'src': 'data:image/png;base64,' + data
        }))
    }
  );
}

$(document).ready(function() {
$('#run').click(function(){
  gen(false)
});

$('#card').append($.map(vcard_fields, one))
gen(true)
});
