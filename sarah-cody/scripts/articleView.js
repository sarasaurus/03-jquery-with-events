'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      // REVIEW: We need to take every author name from the page, and make it an option in the Author filter.
      // To do so, Build an <option> DOM element that we can append to the author <select> element.
      // Start by grabbing the author's name from `this` article element, and then use that bit of text to create the option tag (in a variable named `optionTag`) that we can append to the #author-filter select element.
      authorName = $(this).attr('data-author');

      // DONE
      optionTag = `<option value="${authorName}">${authorName}</option>`;

      if ($(`#author-filter option[value="${authorName}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      // Avoid duplicates! We don't want to append the category name if the <select> already has this category as an option!
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
  // REVIEW: Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles').on('click', function (e) {
    e.preventDefault();
    $('.article-body *:nth-of-type(n+2)').show();
  })
  //   console.log('this', this);
  // }

  // TODO: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes.
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();

})