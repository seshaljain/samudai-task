import { loadGapiInsideDOM } from 'gapi-script'

export const loadGapi = () => {
  loadGapiInsideDOM()

  window.gapi.load('client', () => {
    window.gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      ],
      scope:
        'https://www.googleapis.com/auth/calendar  https://www.googleapis.com/auth/userinfo.profile',
    })
  })
}
