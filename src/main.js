import App from './App.svelte';
import Amplify from 'aws-amplify';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

window.app = app;

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.APP_CLIENT_ID
  }
});


export default app;
