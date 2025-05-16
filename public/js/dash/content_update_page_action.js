const update_overlay = document.getElementById('overlay-cover');
const update_modal = document.getElementById('update-page');
const forget_update = document.getElementById('forget-update');
const page_editors = document.querySelectorAll('.page-edit');

const update_page_id = document.getElementById('update-page-id');
const update_page_title = document.getElementById('update-page-title-mast');
const update_page_slug = document.getElementById('update-page-slug');
const update_page_content = document.getElementById('update-page-content');

page_editors.forEach((page_editor) => {
    page_editor.addEventListener('click', async () => {
        const id = page_editor.getAttribute('data-id');
        update_page_id.value = id;

        const resp = await fetch(`/dash/content/page/${id}`);
        const data = await resp.json();
        const page = data;

        const slug = page.slug;
        const title = page.title;
        const content = page.content;

        update_page_slug.value = slug;
        update_page_title.value = title;
        update_page_content.value = content;

        update_overlay.classList.add('active');
        update_modal.classList.add('active');
    });
});

forget_update.addEventListener('click', () => {
    update_modal.classList.remove('active');
    update_overlay.classList.remove('active');
});
