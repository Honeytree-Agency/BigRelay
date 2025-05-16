const tabs = document.querySelectorAll('.setting-tab');
const tab_switchers = document.querySelectorAll('.setting-tab-switcher');

tab_switchers.forEach((switcher) => {
    switcher.addEventListener('click', () => {
        const switcher_id = switcher.getAttribute('data-tab');

        tab_switchers.forEach((switcher) => {
            const clicked_id = switcher.getAttribute('data-tab');

            if (switcher_id !== clicked_id) {
                switcher.classList.remove('active');
            } else {
                switcher.classList.add('active');
            }
        });

        tabs.forEach((tab) => {
            const tab_id = tab.getAttribute('data-tab');

            if (tab_id !== switcher_id) {
                tab.classList.remove('active');
            } else {
                tab.classList.add('active');
            }
        });
    });
});
