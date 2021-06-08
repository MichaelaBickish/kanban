export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const domain = 'michaeladev.us.auth0.com'
// domain comes from  Applications Applications click on the one I used the client ID of and copy domain
export const audience = 'https://to-do-api.com'
// audience is applications API todo-api
export const clientId = 'bOrwhWYjNbDF5dhPGsj2zIU0sa9o9lkV'
// client ID comes from  Applications Applications
