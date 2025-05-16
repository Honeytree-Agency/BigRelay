const compile_page = document.getElementById('compile-page');
const decompile_page = document.getElementById('compile-page-not');

const new_page_content = document.getElementById('create-page-content');
const new_page_compiled = document.getElementById('create-page-compiled');

compile_page.addEventListener('click', (e) => {
    e.preventDefault();

    new_page_compiled.innerHTML = marked.parse(new_page_content.value, { mangle: false, headerIds: false });

    compile_page.classList.remove('active');
    decompile_page.classList.add('active');

    new_page_content.classList.remove('active');
    new_page_compiled.classList.add('active');
});

decompile_page.addEventListener('click', (e) => {
    e.preventDefault();

    compile_page.classList.add('active');
    decompile_page.classList.remove('active');

    new_page_content.classList.add('active');
    new_page_compiled.classList.remove('active');
});
