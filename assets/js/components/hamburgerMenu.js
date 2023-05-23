// TITLE: hamburger menu
function hamburgerMenu() {
    let hamburgerMenuEl = document.querySelector('#hamburger-menu'),
        hamburgerContent = document.querySelector('#hamburger-content');

    hamburgerMenuEl.addEventListener("click", () => {
        hamburgerContent.classList.toggle("hamburger-show")
    })
    const hamIcon = document.querySelector('#nav-icon')
    const hamWrapper = document.querySelector('#hamburger-menu')
    hamWrapper.addEventListener("click", () => {
        hamIcon.classList.toggle("open")
    })
}

export default hamburgerMenu