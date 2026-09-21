export {
  projects,
  getProjectBySlug,
  getFeaturedProjects,
  getAllProjects,
  type Project,
  type ProjectFact,
  type ProjectStatus,
} from "../../content/projects";

export {
  articles,
  getArticleBySlug,
  getArticlesByProject,
  getAllArticles,
  getFeaturedArticles,
  getRecentArticles,
  type Article,
  type ContentBlock,
} from "../../content/articles";

export {
  updates,
  getUpdatesByProject,
  getAllUpdates,
  getRecentUpdates,
  type Update,
} from "../../content/updates";

export { siteConfig } from "../../content/site";
