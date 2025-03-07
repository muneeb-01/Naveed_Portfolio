export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTES = "/api/admin";
export const DATA_ROUTE = "/api/Data";
export const PROJECT_ROUTE = "/api/projects";

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/create`;
export const GET_ADMIN_INFO_ROUTE = `${AUTH_ROUTES}/adminInfo`;
export const ADMIN_LOGOUT_ROUTE = `${AUTH_ROUTES}/Logout`;

export const ADD_LANDING_PAGE_INFO_ROUTE = `${DATA_ROUTE}/AddLandingPageInfo`;
export const GET_LANDING_PAGE_INFO = `${DATA_ROUTE}/GetLandingPageInfo`;

export const UPLOAD_PROJECT_IMAGES = `${PROJECT_ROUTE}/AddProjectImages`;
export const ADD_PROJECT_INFORMATION = `${PROJECT_ROUTE}/AddProjectInfo`;
export const GET_PROJECTS = `${PROJECT_ROUTE}/GetProjectInfo`;
export const GET_PROJECT_BY_ID = `${PROJECT_ROUTE}/GetProjectById/`;
export const GET_LATEST_PROJECTS = `${PROJECT_ROUTE}/GetLatestProjects`
