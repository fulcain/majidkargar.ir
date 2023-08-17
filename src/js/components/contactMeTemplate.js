// TITLE: contact me li template
function contactMeLiTemplate(image, link) {
    // ul
    const contactMeEL = document.querySelector('#contactMe-ul')

    // create li
    const liEl = document.createElement('li')
    // create image
    const imageEl = document.createElement('img')
    imageEl.setAttribute("src", image)

    // create a tag
    const aEl = document.createElement('a')

    if (link) aEl.setAttribute("target", "_blank")
    if (link) aEl.setAttribute("href", link)

    // append a to li
    aEl.append(imageEl)

    if (link) liEl.append(aEl)
    // append all elements to contactMe element
    contactMeEL.append(liEl)
}
export default contactMeLiTemplate;