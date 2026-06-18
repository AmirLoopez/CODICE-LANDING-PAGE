//jquery-click-scroll
//by syamsul'isul' Arifin

var navLinks = $('.navbar-nav .nav-item .nav-link');
var trackedLinks = [];

function getLocalHash(hrefValue) {
    if (!hrefValue) {
        return null;
    }

    if (hrefValue.charAt(0) === '#') {
        return hrefValue;
    }

    var hashIndex = hrefValue.indexOf('#');
    if (hashIndex === -1) {
        return null;
    }

    var path = hrefValue.substring(0, hashIndex);
    if (path && path !== window.location.pathname.split('/').pop()) {
        return null;
    }

    return hrefValue.substring(hashIndex);
}

navLinks.each(function () {
    var link = $(this);
    var hash = getLocalHash(link.attr('href'));

    if (!hash || hash.length < 2) {
        return;
    }

    var target = $(hash);
    if (!target.length) {
        return;
    }

    trackedLinks.push({ link: link, target: target });

    link.on('click', function (e) {
        e.preventDefault();
        var offsetClick = target.offset().top - 83;
        $('html, body').animate({
            scrollTop: offsetClick
        }, 300);
    });
});

$(document).on('scroll', function () {
    if (!trackedLinks.length) {
        return;
    }

    var docScroll = $(document).scrollTop() + 1;
    var activeItem = null;

    $.each(trackedLinks, function (_, item) {
        var offsetSection = item.target.offset().top - 83;
        if (docScroll >= offsetSection) {
            activeItem = item;
        }
    });

    navLinks.removeClass('active').addClass('inactive');

    if (activeItem) {
        activeItem.link.addClass('active').removeClass('inactive');
    } else {
        navLinks.eq(0).addClass('active').removeClass('inactive');
    }
});

$(document).ready(function () {
    navLinks.addClass('inactive');
    navLinks.eq(0).addClass('active').removeClass('inactive');
    $(document).trigger('scroll');
});