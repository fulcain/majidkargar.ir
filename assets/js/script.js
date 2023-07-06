// imports
import projectDetails from "./data/projectDetails.js";
import contactMeLinks from "./data/contactMeLinks.js";
import contactMeLiTemplate from "./components/contactMeTemplate.js";
import projectTemplate from "./components/projectTemplate.js";
import hamburgerMenu from "./components/hamburgerMenu.js";

// events
document.addEventListener("DOMContentLoaded", init);
//  functions START
function init() {
	hamburgerMenu();
	pageLoader();
	renderProjects();
	renderContactMe();
}

// renderProjects
function renderProjects() {
	// for loop to render all projects
	for (let i = 0; i < projectDetails.length; i++) {
		if (projectDetails[i].projectStatus === "normal")
			projectTemplate(
				projectDetails[i].projectName,
				projectDetails[i].projectImageAddress,
				projectDetails[i].projectRepoLink,
				projectDetails[i].projectLiveLink,
				"#wholeProjectBox"
			);
		else {
			projectTemplate(
				projectDetails[i].projectName,
				projectDetails[i].projectImageAddress,
				projectDetails[i].projectRepoLink,
				projectDetails[i].projectLiveLink,
				"#special-projects"
			);
		}
	}
}

// TITLE: render contactMe
function renderContactMe() {
	for (let i = 0; i < contactMeLinks.length; i++) {
		contactMeLiTemplate(contactMeLinks[i].image, contactMeLinks[i].link);
	}
}

// TITLE: page loader
function pageLoader() {
	const bodyWrapper = document.querySelector(".bodyWrapper");
	const loaderWrapper = document.querySelector(".loader-wrapper");
	window.addEventListener("load", () => {
		loaderWrapper.classList.add("hide");
		bodyWrapper.classList.remove("hide");
	});
}
//  functions END
