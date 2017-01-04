// leadpages_input_data variables come from the template.json "variables" section
var leadpages_input_data = {};

$(function () {
    var footer = $('.footer'),
        content = $('.social_content'),
        social = $('.social');

    var last_visible,
        id_last_visible;


    $('.column, .list, .margin-bottom-remove').each(function() {
      last_visible = $(this).children(":visible").last();
      id_last_visible = $(this).children(".id-margin-bottom-remove");
      if (!(last_visible[0]==id_last_visible[0])) {
        last_visible.addClass("id-margin-bottom-remove");
        id_last_visible.removeClass('id-margin-bottom-remove');
      }
    });
    $('.margin-right-remove').each(function() {
      last_visible = $(this).children(":visible").last();
      id_last_visible = $(this).children(".id-margin-right-remove");
      if (!(last_visible[0]==id_last_visible[0])) {
        last_visible.addClass("id-margin-right-remove");
        id_last_visible.removeClass('id-margin-right-remove');
      }
    })


    social.affix({ offset: {
          top: function () { return (this.top=content.offset().top)},
          bottom: function () {return (this.bottom = footer.outerHeight())}
        }});

    if ( typeof window.top.App === 'undefined' ) {
        // Published page

        var $allVideos = $("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com'], iframe[src*='https://www.youtube-nocookie.com'], object, embed"),
            newWidth,
            $el;

        $allVideos.each(function() {
          $(this)
            // jQuery .data does not work on object/embed elements
            .attr('data-aspectRatio', this.height / this.width)
            .removeAttr('height')
            .removeAttr('width');
        });

        $(window).resize(function() {
          social.data('bs.affix').options.offset.top = content.offset().top;
          social.data('bs.affix').options.offset.bottom = footer.outerHeight();
          $allVideos.each(function() {
            $el = $(this);  // Automatically detects parent element and resizes according to its dimensions.
            newWidth = $el.parent().width();
            $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
          });

        }).resize();

        $('.share').click(function(event){
              event.preventDefault();
              var service = $(this).data('service');
              switch(service) {
                  case 'facebook':
                      url = ( LeadPageData['facebookShareURL']['value'] ? LeadPageData['facebookShareURL']['value'] : document.URL);
                      window_size = "width=585,height=368";
                      go = 'http://www.facebook.com/sharer/sharer.php?u=' + url;
                      break;
                  case 'twitter':
                      url = ( LeadPageData['twitterShareURL']['value'] ? LeadPageData['twitterShareURL']['value'] : document.URL);
                      window_size = "width=585,height=261";
                      go = 'http://www.twitter.com/intent/tweet?url=' + url;
                      break;
                  case 'google':
                      url = ( LeadPageData['googleShareURL']['value'] ? LeadPageData['googleShareURL']['value'] : document.URL);
                      window_size = "width=517,height=511";
                      go = 'http://plus.google.com/share?url=' + url;
                      break;
                  case 'linkedin':
                      url = ( LeadPageData['linkedInShareURL']['value'] ? LeadPageData['linkedInShareURL']['value'] : document.URL);
                      window_size = "width=520,height=570";
                      go = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url;
                      break;
                  default:
                      return false;
              }
              window.open(go, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,' + window_size);
          });
    } else {
      setInterval( function () {
        social.data('bs.affix').options.offset.top = content.offset().top;
        social.data('bs.affix').options.offset.bottom = footer.outerHeight();
      }, 1000);
      setInterval( function () {
        $('.column, .list, .margin-bottom-remove').each(function() {
          last_visible = $(this).children(":visible").last();
          id_last_visible = $(this).children(".id-margin-bottom-remove");
          if (!(last_visible[0]==id_last_visible[0])) {
            last_visible.addClass("id-margin-bottom-remove");
            id_last_visible.removeClass('id-margin-bottom-remove');
          }
        });
        $('.margin-right-remove').each(function() {
          last_visible = $(this).children(":visible").last();
          id_last_visible = $(this).children(".id-margin-right-remove");
          if (!(last_visible[0]==id_last_visible[0])) {
            last_visible.addClass("id-margin-right-remove");
            id_last_visible.removeClass('id-margin-right-remove');
          }
        })
      }, 1000);
    }
});
