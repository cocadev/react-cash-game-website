export default function parserRedirect(props) {
	 if (props.location.hash !== "") {
	 	const hashId = props.location.hash.slice(3);

		switch (props.location.hash.substring(0, 3)) {
			case "#s=":
				props.setUserSessionId(hashId);
				break;
			case "#i=":
				props.newFriendSaga(hashId);
		}
	}
}
