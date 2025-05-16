const new_page = document.getElementById('new-page');

const create_page_modal = document.getElementById('create-page');
const create_page_overlay = document.getElementById('overlay-cover');

const create_page_close = document.getElementById('forget-create');

new_page.addEventListener('click', () => {
    create_page_modal.classList.add('active');
    create_page_overlay.classList.add('active');
});

create_page_close.addEventListener('click', () => {
    create_page_modal.classList.remove('active');
    create_page_overlay.classList.remove('active');
});
