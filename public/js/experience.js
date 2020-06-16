const cta = document.querySelector('.cta_header');
const footer = document.querySelector(
    '.toaster');
const expandIcon = document.querySelector('.expand_icon');
const airplaneIcon = document.querySelectorAll('.airplane_icon_wrapper');

function toggleFooter() {
    footer.classList.toggle('is_open');
    expandIcon.classList.toggle('is_reversed');
    Array.from(airplaneIcon).map(icon => icon.classList.toggle('is_moving'));
}

cta.addEventListener('click', toggleFooter);

$(() => {
    let stickyTop = 0,
        scrollTarget = false;

    let timeline = $('.experience-timeline__nav'),
        items = $('li', timeline),
        milestones = $('.experience-timeline__section .experience-milestone'),
        offsetTop = parseInt(timeline.css('top'));

    const TIMELINE_VALUES = {
        start: 190,
        step: 30
    };


    $(window).resize(function () {
        timeline.removeClass('fixed');

        stickyTop = timeline.offset().top - offsetTop;

        $(window).trigger('scroll');
    }).trigger('resize');

    $(window).scroll(function () {
        if ($(window).scrollTop() > stickyTop) {
            timeline.addClass('fixed');
        } else {
            timeline.removeClass('fixed');
        }
    }).trigger('scroll');

    items.find('span').click(function () {
        let li = $(this).parent(),
            index = li.index(),
            milestone = milestones.eq(index);

        if (!li.hasClass('active') && milestone.length) {
            scrollTarget = index;

            let scrollTargetTop = milestone.offset().top - 80;

            $('html, body').animate({ scrollTop: scrollTargetTop }, {
                duration: 400,
                complete: function complete() {
                    scrollTarget = false;
                }
            });

        }
    });

    $(window).scroll(function () {
        let viewLine = $(window).scrollTop() + $(window).height() / 3,
            active = -1;

        if (scrollTarget === false) {
            milestones.each(function () {
                if ($(this).offset().top - viewLine > 0) {
                    return false;
                }

                active++;
            });
        } else {
            active = scrollTarget;
        }

        timeline.css('top', -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + 'px');

        items.filter('.active').removeClass('active');

        items.eq(active != -1 ? active : 0).addClass('active');
    }).trigger('scroll');
});