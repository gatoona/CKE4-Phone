/*
* CKEditor Phone Plugin
*
* @author Washington County Webteam <webteam@co.washington.or.us>
* @version 1.0.0
*/
(function ($, Drupal) {
	CKEDITOR.plugins.add('phone', {
		init: function (editor) {
      CKEDITOR.dialog.add('phone', CKEDITOR.getUrl(this.path + 'dialogs/phone.js'));
			editor.addCommand('phone', new CKEDITOR.dialogCommand('phone', {
				allowedContent: 'div{*}(*); a[*]; img[*]'
      }));
      editor.addContentsCss(this.path + 'styles/widget.css');

      editor.widgets.add('phone_widget', {
        upcast: function (element) {
          return element.name === 'span' && element.hasClass('cke-phone');
        },
        // List editable areas here.
        editables: {
          body: {
            selector: 'a'
          }
        },
        requiredContent: 'span(cke-phone)',
        allowedContent: 'img',
        dialog: 'phone'
      });

			editor.ui.addButton('Phone', {
				label : 'Insert Phone Number',
				toolbar : 'insert',
				command : 'phone',
				icon : this.path + 'images/icon.png'
			});


		}
	});

})(jQuery, Drupal);
