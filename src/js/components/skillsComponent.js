/**
 * Component function that returns a skills component
 *
 * @param {Object} config - Component config
 * @param {String} config.title - Skill title
 * @param {String} config.percentage - Skill percentage
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

	// Set text content
	mySkillsTitle.textContent = title || "No title provided";

	// Progress Bar START

	// Create div wrapper for progress
	const mySkillsProgressBarWrapper = document.createElement("div");

	// Add class for styling
	mySkillsProgressBarWrapper.classList.add("my-skills-progressBar-wrapper");

	// Create div for outer progress bar
	const mySkillsOuterProgressBar = document.createElement("div");

	// Add class for styling
	mySkillsOuterProgressBar.classList.add("my-skills-outer-progressBar");

	// Set border color if brand color is provided
	if (brandColor) mySkillsOuterProgressBar.style.borderColor = brandColor;

	// Create div for inner progress bar
	const mySkillsInnerProgressBar = document.createElement("div");

	// Add class for styling
	mySkillsInnerProgressBar.classList.add("my-skills-inner-progressBar");

	// Set width if percentage is provided
	if (percentage) mySkillsInnerProgressBar.style.width = `${percentage}`;

	// Set background color if brand color is provided
	if (brandColor) mySkillsInnerProgressBar.style.backgroundColor = brandColor;

	// Create span for progress bar value
	const mySkillsProgressBarValue = document.createElement("span");

	// Add class for styling
	mySkillsProgressBarValue.classList.add("my-skills-progressBar-value");

	// Set text content
	mySkillsProgressBarValue.textContent =
		percentage || "No percentage provided";

	// Set color
	mySkillsProgressBarValue.style.color = brandColor;

	// Append inner progress bar to outer
	mySkillsOuterProgressBar.append(mySkillsInnerProgressBar);

	// Append value to wrapper
	mySkillsProgressBarWrapper.append(mySkillsProgressBarValue);

	// Append outer bar to wrapper
	mySkillsProgressBarWrapper.append(mySkillsOuterProgressBar);

	// Progress Bar END

	// Append inner circle to skills circle
	mySkillsCircle.append(mySkillsInnerCircle);

	// Append title to skills circle
	mySkillsCircle.append(mySkillsTitle);

	// Append progress bar to skills circle
	mySkillsCircle.append(mySkillsProgressBarWrapper);

	// Return skills circle
	return mySkillsCircle;
};

export default mySkillsComponent;
