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
	changeTheme();
	hamburgerMenu();
	pageLoader();
	renderProjects();
	renderContactMe();
}

// renderProjects
function renderProjects() {
	// for loop to render all projects
	for (let i = 0; i < projectDetails.length; i++) {
		projectTemplate(
			projectDetails[i].projectName,
			projectDetails[i].projectImageAddress,
			projectDetails[i].projectRepoLink,
			projectDetails[i].projectLiveLink
		);
	}
}

// TITLE: render contactMe
function renderContactMe() {
	for (let i = 0; i < contactMeLinks.length; i++) {
		contactMeLiTemplate(
			contactMeLinks[i].image,
			contactMeLinks[i].link
		);
	}
}
// TITLE: theme changer
// toggles the class on body to change the theme if the theme icon is pressed
// changes the theme icon class based on body class
function changeTheme() {
	// selectors
	let htmlEl = document.querySelector("html"),
		themeIcon = document.querySelector("#themeChanger")

	// changes theme and themeIcon color
	themeChanger.addEventListener("click", () => {
		if (htmlEl.getAttribute("data-theme") != "dark") {
			htmlEl.setAttribute("data-theme", "dark");
			themeChanger.children[0].style.left= "5px"
		} else {
			htmlEl.setAttribute("data-theme", "light");
			themeChanger.children[0].style.left= "59%"
		}
	});
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
