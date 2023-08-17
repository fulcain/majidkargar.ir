const mySkillsComponent = ({ title, percentage, brandColor, link }) => {
	// Create my Skills circle
	const mySkillsCircle = document.createElement("a");
	mySkillsCircle.classList.add("my-skills-circle");
	if (brandColor) mySkillsCircle.style.borderColor = brandColor;
	mySkillsCircle.setAttribute("target", "_blank");
	if (link) mySkillsCircle.setAttribute("href", link || "#");

	// Create my skills inner circle
	const mySkillsInnerCircle = document.createElement("div");
	mySkillsInnerCircle.classList.add("my-skills-inner-circle");
	if (brandColor) mySkillsInnerCircle.style.backgroundColor = brandColor;

	// Create my skills title
	const mySkillsTitle = document.createElement("h4");
	mySkillsTitle.classList.add("my-skills-title");
	mySkillsTitle.textContent = title || "No title provided";

	// Progress Bar START
	// Create my skills ProgressBar wrapper
	const mySkillsProgressBarWrapper = document.createElement("div");
	mySkillsProgressBarWrapper.classList.add("my-skills-progressBar-wrapper");

	// Create my skills outer ProgressBar
	const mySkillsOuterProgressBar = document.createElement("div");
	mySkillsOuterProgressBar.classList.add("my-skills-outer-progressBar");
	if (brandColor) mySkillsOuterProgressBar.style.borderColor = brandColor;

	// Create my skills inner ProgressBar
	const mySkillsInnerProgressBar = document.createElement("div");
	mySkillsInnerProgressBar.classList.add("my-skills-inner-progressBar");
	if (percentage) mySkillsInnerProgressBar.style.width = `${percentage}`;
	if (brandColor) mySkillsInnerProgressBar.style.backgroundColor = brandColor;

	// Create my skills ProgressBar value
	const mySkillsProgressBarValue = document.createElement("span");
	mySkillsProgressBarValue.classList.add("my-skills-progressBar-value");
	mySkillsProgressBarValue.textContent =
		percentage || "No percentage provided";
	mySkillsProgressBarValue.style.color = brandColor;

	// Appending "inner progressBar" to "outer progressBar"
	mySkillsOuterProgressBar.append(mySkillsInnerProgressBar);

	// Appending "ProgressBar value" to "progress bar wrapper"
	mySkillsProgressBarWrapper.append(mySkillsProgressBarValue);

	// Appending "outer progress bar" to "progress bar wrapper"
	mySkillsProgressBarWrapper.append(mySkillsOuterProgressBar);
	// Progress Bar END

	// Appending "inner circle" to "mySkillsCircle"
	mySkillsCircle.append(mySkillsInnerCircle);

	// Appending "title" to my Skills circle
	mySkillsCircle.append(mySkillsTitle);

	// Progress Bar
	mySkillsCircle.append(mySkillsProgressBarWrapper);
	return mySkillsCircle;
};

export default mySkillsComponent;
