'use strict';

let articleView = {};
$('.template').hide();

articleView.populateFilters = function() {
  $('article').each(function() {
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');
      optionTag = `<option value="${authorName}">${authorName}</option>`;

      if ($(`#author-filter option[value="${authorName}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }
      category = $(this).attr('data-category');

      optionTag = `<option value="${category}">${category}</option>`;

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      console.log('this', $(this).val());
      $(`article[data-author="${$(this).val()}"]`).show();
    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function () {

    if ($(this).val()) {
      $('article').hide();
      console.log('this', $(this).val());
      $(`article[data-category="${$(this).val()}"]`).show();
    } else {

      $('article').show();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });


};

articleView.handleMainNav = function() {
  $('.tab').on('click', function () {
    console.log('this', $(this).data('content'));
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).show();
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles').on('click', '.read-on', function (e) {
    e.preventDefault();
    console.log('this', $(this));
    $(this).parent().find('.article-body *').show();
  });

};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();

})