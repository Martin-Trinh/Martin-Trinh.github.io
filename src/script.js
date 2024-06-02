document.addEventListener('DOMContentLoaded', () => {
    const loaderPage = document.getElementById('loader-page');
    const startPage = document.getElementById('start-page');
    const gameCanvasPage = document.getElementById('game-canvas-page');
    const startButton = document.getElementById('start-button');
    const backButton = document.getElementById('back-button');

    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');
    }

    function navigateToPage(pageId) {
        history.pushState({ page: pageId }, '', `#${pageId}`);
        showPage(pageId);
    }

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            showPage(event.state.page);
        } else {
            showPage('start-page');
        }
    });

    // Simulate loading
    setTimeout(() => {
        console.log('Loading complete');
        navigateToPage('start-page');
    }, 2000);

    startButton.addEventListener('click', () => {
        navigateToPage('game-canvas-page');
    });

    backButton.addEventListener('click', () => {
        navigateToPage('start-page');
    });

    // Initialize the first page
    showPage('loader-page');

});
