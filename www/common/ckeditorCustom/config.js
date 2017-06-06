/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http=//ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
    var base_url = Dom.get('base_url').value;
    
    toolbar: [
    ['Source'], '-',
    ['Preview', 'Print', 'Templates'], '-',
    ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'], '-',
    ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'RemoveFormat'],
    ['Bold', 'Italic', 'Underline', 'Strike'], '-',
    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'], '-',
    ['Link', 'Unlink'], '-',
    ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'], '-',
    '/',
    ['Styles', 'Format', 'Font', 'FontSize'], '-',
    ['TextColor', 'BGColor'], '-',
    ['Maximize', 'ShowBlocks']],
    config.language= 'en',
    config.resize_enabled= false,
    config.toolbarCanCollapse= false,
    config.filebrowserBrowseUrl = base_url+'www/common/ckeditorCustom/kcfinder/browse.php?type=files',
    config.filebrowserImageBrowseUrl =  base_url+'www/common/ckeditorCustom/kcfinder/browse.php?type=images',
    config.filebrowserFlashBrowseUrl =  base_url+'www/common/ckeditorCustom/kcfinder/browse.php?type=flash',
    config.filebrowserUploadUrl =  base_url+'www/common/ckeditorCustom/kcfinder/upload.php?type=files',
    config.filebrowserImageUploadUrl =  base_url+'www/common/ckeditorCustom/kcfinder/upload.php?type=images',
    config.filebrowserFlashUploadUrl = base_url+'www/common/ckeditorCustom/kcfinder/upload.php?type=flash'

};
