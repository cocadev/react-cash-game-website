import React from "react";
import Loadable from 'react-loadable';
import LoaderShowAllTime from "../../components/Loader/LoaderShowAllTime";

const Loader = () => { return (<LoaderShowAllTime />);};
export default function LoaderComponent(opts) {
	return Loadable(Object.assign({
		loading: Loader,
		delay: 200,
		timeout: 10000,
	}, opts));
}
