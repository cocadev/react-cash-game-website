import React from "react";
import customTween from "../helpers/cutstomTween";

function withAnimation(ComponentWithAnimation) {
	class Animation extends React.Component {
		state = {
			isAnimated: "",
		}

		setAnimationElement = (element, dots, time, update) => {
			this.setState({
				isAnimated: element.current
			});

			customTween(
				dots,
				time,
				update,
				element.current
			);
		}

		render() {
			return (
				<ComponentWithAnimation
					setAnimationElement={this.setAnimationElement}
					{...this.props}
				/>);
		}
	}

	return Animation;
}

export default withAnimation;
