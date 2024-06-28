/**
 * @file
 * Provide phone dialog.
 */

(function ($, Drupal, CKEDITOR) {

  'use strict';

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    }
    return cleaned;
  }

  CKEDITOR.dialog.add('phone', function (editor) {

    return {
      title: 'Insert Phone Number',
      minWidth: 510,
      minHeight: 200,
      contents:
        [{
          id: 'phonePlugin',
          expand: true,
          elements:
            [
              {
                id: 'pnum',
                type: 'text',
                width: '100%',
                maxLength: 10,
                label: "Phone Number (Ex. 5551234567): ",
                validate: CKEDITOR.dialog.validate.notEmpty("Phone cannot be empty."),
                setup: function (widget) {
                  //grab number and set in dialog.
                  var element = $('<div>').append(widget.element.getHtml());
                  var pnum = $(element).find('a').attr("href");

                  pnum = pnum ? pnum.split(",,") : '';
                  pnum = pnum[0] ? pnum[0].replace(/\D/g, "") : '';

                  var dialog = CKEDITOR.dialog.getCurrent();
                  var titleField = dialog.getContentElement('phonePlugin', 'pnum').setValue(pnum);
                }
              },
              {
                id: 'pext',
                type: 'text',
                width: '100%',
                label: "Phone Extension: ",
                setup: function (widget) {
                  //grab extension and set in dialog.
                  var element = $('<div>').append(widget.element.getHtml());
                  var pnum = $(element).find('a').attr("href");
                  pnum = pnum ? pnum.split(",,") : '';
                  pnum = pnum[1] ? pnum[1].replace(/\D/g, "") : '';

                  var dialog = CKEDITOR.dialog.getCurrent();
                  var titleField = dialog.getContentElement('phonePlugin', 'pext').setValue(pnum);
                }
              },
            ]
        }
        ],
      onOk: function () {
        var content = '';

        var pnum = this.getValueOf('phonePlugin', 'pnum') || '5551234567';
        pnum = pnum.replace(/\D/g, "");
        var pext = this.getValueOf('phonePlugin', 'pext') || '';
        pext = pext.replace(/\D/g, "");

        var purl = pext ? (pnum + ',,' + pext) : pnum;
        pnum = formatPhoneNumber(pnum);
        var plabel = pext ? (pnum + ' x' + pext) : pnum;

        content += '<span class="cke-phone"><a href="tel:' + purl + '">' + plabel + '</a></span>';

        var element = CKEDITOR.dom.element.createFromHtml(content);

        //reset stored values
        pnum = '';
        pext = '';

        editor.insertElement(element);
        editor.widgets.initOn(element, 'phone_widget');


      },
      buttons: [CKEDITOR.dialog.cancelButton, CKEDITOR.dialog.okButton]
    };
  });

})(jQuery, Drupal, CKEDITOR);
