/**
 * Component function that returns a skills component
 *
 * @param {Object} config - Component config
 * @param {String} config.title - Skill title
 * @param {String} config.brandColor - Brand color
 * @param {String} config.link - Skill link
 *
 * @returns {HTMLElement} Skills component circle element
 */
const mySkillsComponent = (config) => {
	// Destructuring the props (config keys)
	const { title, percentage, brandColor, link } = config;

	// Create anchor element for skills circle
	const mySkillsCircle = document.createElement("a");

	// Add class for styling
	mySkillsCircle.classList.add("my-skills-circle");

	// Set border color if brand color is provided
	if (brandColor) mySkillsCircle.style.borderColor = brandColor;

	// Set link target to open in new tab
	mySkillsCircle.setAttribute("target", "_blank");

	// Set link href if provided
	if (link) mySkillsCircle.setAttribute("href", link || "#");

	// Create div element for inner circle
	const mySkillsInnerCircle = document.createElement("div");

	// Add class for styling
	mySkillsInnerCircle.classList.add("my-skills-inner-circle");

	// Set background color if brand color is provided
	if (brandColor) mySkillsInnerCircle.style.backgroundColor = brandColor;

	// Create h4 element for title
	const mySkillsTitle = document.createElement("h4");

	// Add class for styling
	mySkillsTitle.classList.add("my-skills-title");

	mySkillsTitle.style.color = brandColor

	// Set text content
	mySkillsTitle.textContent = title || "No title provided";

	// Append inner circle to skills circle
	mySkillsCircle.append(mySkillsInnerCircle);

	// Append title to skills circle
	mySkillsCircle.append(mySkillsTitle);

	// Return skills circle
	return mySkillsCircle;
};

export default mySkillsComponent;
