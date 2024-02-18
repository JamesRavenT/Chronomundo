//VARIABLES
const nav = document.querySelector('.navbar');

//FUNCTIONS
export function init_NavigationBar() {

    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            nav.classList.add('navbar-scrolled');
        } else if(window.scrollY < 50) {
            nav.classList.remove('navbar-scrolled');
        }
    })
}