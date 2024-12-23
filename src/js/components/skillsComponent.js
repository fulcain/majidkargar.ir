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
  const { title, link, logo } = config;

  // Create anchor element for skills circle
  const skillWrapper = document.createElement("a");
  skillWrapper.classList.add("skill-wrapper");
  skillWrapper.href = link;
  skillWrapper.target = "_blank";

  const skillLogo = document.createElement("img");
  skillLogo.classList.add("skill-logo");
  skillLogo.src = logo;

  const skillName = document.createElement("span");
  skillName.classList.add("skill-name");
  skillName.textContent = title;

  skillWrapper.append(skillLogo, skillName);

  // Return skills circle
  return skillWrapper;
};

export default mySkillsComponent;
