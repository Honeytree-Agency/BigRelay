const active_page = document.getElementById('content').getAttribute('data-page');

const menu_links = document.querySelectorAll('.menu-item');

menu_links.forEach((link) => {
    const link_href = link.getAttribute('href');

    if (link_href === active_page) {
        link.classList.add('active');
    }
});
