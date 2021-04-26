export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const domain = 'melia88.us.auth0.com'
// domain comes from  Applications Applications click on the one I used the client ID of and copy domain
export const audience = 'https://todo-api.com'
// audience is applications API todo-api
export const clientId = 'D7UVniD8W6ZCk4tmSCNfvRDBq6fwncLX'
// client ID comes from  Applications Applications
