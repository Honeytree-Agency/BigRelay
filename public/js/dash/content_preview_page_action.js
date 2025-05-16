const preview = document.getElementById('compile-update');
const depreview = document.getElementById('compile-update-not');
const content = document.getElementById('update-page-content');
const compiled = document.getElementById('update-page-compiled');

preview.addEventListener('click', (e) => {
    e.preventDefault();

    compiled.innerHTML = marked.parse(content.value, { mangle: false, headerIds: false });

    preview.classList.remove('active');
    depreview.classList.add('active');

    content.classList.remove('active');
    compiled.classList.add('active');
});

depreview.addEventListener('click', (e) => {
    e.preventDefault();

    preview.classList.add('active');
    depreview.classList.remove('active');

    content.classList.add('active');
    compiled.classList.remove('active');
});
