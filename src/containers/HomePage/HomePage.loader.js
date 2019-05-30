import LoaderComponent from '../../helpers/Loadmen/Loadmen';

export const FriendPageLoad = LoaderComponent({
	loader: () => import(/* webpackChunkName: "Friend" */'../../containers/tabs/Friend/Friend'),
});
