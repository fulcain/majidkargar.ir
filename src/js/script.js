// imports
import projectDetails from "./data/projectDetails.js";
import contactMeLinks from "./data/contactMeLinks.js";
import contactMeLiTemplate from "./components/contactMeTemplate.js";
import projectTemplate from "./components/projectTemplate.js";
import hamburgerMenu from "./components/hamburgerMenu.js";
import mySkillsComponent from "./components/skillsComponent.js";
import skills from "./data/skills.js";

// events
document.addEventListener("DOMContentLoaded", init);
//  functions START
function init() {
	hamburgerMenu();
	pageLoader();
	renderMySkills();
	renderProjects();
	renderContactMe();
}

// renderProjects
function renderProjects() {
	// for loop to render all projects
	for (let i = 0; i < projectDetails.length; i++) {
		// Set the projects wrapper based on project status
		const wrapper =
			projectDetails[i].projectStatus === "normal"
				? "#wholeProjectBox"
				: "#special-projects";

		// Call projectTemplate to create projects
		projectTemplate(
			projectDetails[i].projectName,
			projectDetails[i].projectImageAddress,
			projectDetails[i].projectRepoLink,
			projectDetails[i].projectLiveLink,
			wrapper
		);
	}
}

// TITLE: render contactMe
function renderContactMe() {
	for (let i = 0; i < contactMeLinks.length; i++) {
		contactMeLiTemplate(contactMeLinks[i].image, contactMeLinks[i].link);
	}
}

const renderMySkills = () => {
	const skillsWrapper = document.querySelector("#my-skills-box");

	skills.map((skill) => {
		skillsWrapper.append(
			mySkillsComponent({
				title: skill.title,
				percentage: skill.percentage,
				brandColor: skill.branColor,
				link: skill.link,
			})
		);
	});
};

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
