// TITLE: projectTemplate
// creates projectBoxTemplate
// projectImage is the image of the project
// projectName is the name of the project
// projectLiveLink is the github link to the live project
// projectRepoLink is the github link to the project
function projectTemplate(projectName, projectImage, projectRepoLink, projectLiveLink,) {
    // grabs the my projects box
    let wholeProjectBox = document.querySelector('#wholeProjectBox');

    // project box
    const projectBox = document.createElement("div")
    projectBox.classList.add("projects-box")

    // project image
    const projectImageEl = document.createElement('img')
    projectImageEl.setAttribute("src", projectImage)

    // project name
    const projectNameEl = document.createElement('h3')
    projectNameEl.classList.add("project-title")
    projectNameEl.textContent = projectName

    // projectLiveLink
    const projectLiveLinkEl = document.createElement('a')
    projectLiveLinkEl.setAttribute("href", projectLiveLink)
    projectLiveLinkEl.setAttribute("target", "_blank")
    projectLiveLinkEl.classList.add("project-link")
    projectLiveLinkEl.textContent = "Live demo"

    // projectRepoLink
    const projectRepoLinkEl = document.createElement('a')
    projectRepoLinkEl.setAttribute("href", projectRepoLink)
    projectRepoLinkEl.setAttribute("target", "_blank")
    projectRepoLinkEl.classList.add("project-link")
    projectRepoLinkEl.textContent = "Source code"

    // append items to projectBox
    projectBox.append(projectImageEl)
    projectBox.append(projectNameEl)
    projectBox.append(projectLiveLinkEl)
    projectBox.append(projectRepoLinkEl)

    // add project box to projectBoxEl in html
    wholeProjectBox.append(projectBox)

    return projectBox
}

export default projectTemplate;