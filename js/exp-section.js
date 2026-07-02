const menuPages = document.querySelectorAll('.experience-page');
const pageIndicator = document.getElementById('page-indicator');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');

let currentMenuPage = 1;

function updateMenuPage(newPage) {

    if (newPage < 1 || newPage > menuPages.length) return;
    currentMenuPage = newPage;


    menuPages.forEach(page => page.classList.remove('active'));
    document.querySelector(`.experience-page[data-page="${currentMenuPage}"]`).classList.add('active');


    pageIndicator.textContent = `${currentMenuPage} de ${menuPages.length}`;
}


prevPageBtn.addEventListener('click', () => updateMenuPage(currentMenuPage - 1));
nextPageBtn.addEventListener('click', () => updateMenuPage(currentMenuPage + 1));



const expButtons = document.querySelectorAll('.exp-btn');
const expContents = document.querySelectorAll('.experience-content');

expButtons.forEach(button => {
    button.addEventListener('click', () => {

        expButtons.forEach(btn => btn.classList.remove('active'));
        expContents.forEach(content => content.classList.remove('active'));


        button.classList.add('active');


        const targetId = button.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});