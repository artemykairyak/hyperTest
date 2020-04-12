export const baseUrl = 'https://hypertests.ru/api/';  //BASE URL
export const maxQuestionsLength = 50;
export const maxVarsLength = 6;
export let pageSize = 6;
export let allTestsPageSize = 21;
export const standardInputLength = 255;
export const shortInputLength = 100;
export const allowedImageFormats = 'image/jpeg,image/png,image/gif,image/svg+xml';
export const appId = 7339321;

if(window.innerWidth < 668) {
    allTestsPageSize = 20;
}
