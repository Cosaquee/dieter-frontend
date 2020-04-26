import App from './App.svelte';
import Amplify from 'aws-amplify';
import config from './aws';

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
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: "meals",
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			},
		]
	}
});


export default app;