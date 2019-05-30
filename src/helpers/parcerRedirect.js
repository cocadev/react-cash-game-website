import { loader } from "../components/Loader/Loader";

export default function parserRedirect(props) {
	 if (props.location.hash !== "") {
	 	const hashId = props.location.hash.slice(3);

		switch (props.location.hash.substring(0, 3)) {
			case "#s=":
				loader.show();

				props.setUserSessionId(hashId);
				break;
			case "#i=":
				props.newFriendSaga(hashId);
				break;
		}
	}
}
