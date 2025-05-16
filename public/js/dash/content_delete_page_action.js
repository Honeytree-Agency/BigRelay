const delete_pages = document.querySelectorAll('.page-delete');

const overlay = document.getElementById('overlay-cover');
const delete_modal = document.getElementById('confirm-delete-modal');
const delete_modal_title = document.getElementById('confirm-delete-page-title');
const confirm_delete = document.getElementById('confirm-delete');
const forget_delete = document.getElementById('forget-delete');

delete_pages.forEach((delete_page) => {
    delete_page.addEventListener('click', () => {
        overlay.classList.add('active');
        delete_modal.classList.add('active');

        const title = document.querySelector(
            `.content-pages-item-title[data-id="${delete_page.getAttribute('data-id')}"]`,
        ).innerText;

        delete_modal_title.innerText = title;
        confirm_delete.setAttribute('data-id', delete_page.getAttribute('data-id'));
    });
});

forget_delete.addEventListener('click', () => {
    overlay.classList.remove('active');
    delete_modal.classList.remove('active');
});

confirm_delete.addEventListener('click', () => {
    window.location.href = `/dash/content/delete/${confirm_delete.getAttribute('data-id')}`;
});
