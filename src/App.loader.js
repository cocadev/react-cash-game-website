import LoaderComponent from './helpers/Loadmen/Loadmen';

export const HomePageLoad = LoaderComponent({
	loader: () => import(/* webpackChunkName: "Home" */'./containers/HomePage/HomePage'),
});

export const LoginPageLoad = LoaderComponent({
	loader: () => import(/* webpackChunkName: "Login" */'./containers/LoginPage/LoginPage'),
});

export const PrivacyPolicyPageLoad = LoaderComponent({
	loader: () => import(/* webpackChunkName: "Privacy" */'./containers/PrivacyPolicyPage/PrivacyPolicyPage'),
});
