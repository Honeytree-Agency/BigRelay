const show_pages = document.querySelectorAll('.page-show');

show_pages.forEach((show_page) => {
    show_page.addEventListener('click', async () => {
        const id = show_page.getAttribute('data-id');
        const resp = await fetch(`/dash/content/slug/${id}`);
        const data = await resp.json();
        const slug = data.slug;

        window.location.href = `/${slug}`;
    });
});
