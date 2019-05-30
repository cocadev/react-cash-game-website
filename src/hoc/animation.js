import React from 'react';
import customTween from "../helpers/cutstomTween";

function animationTween(Component) {
	class Animation extends React.Component {
		state = {
			isAnimated: "",
		}

		onMountedAnimationRef = (element, dots, time, update) => {
			this.setState({
				isAnimated: element.current
			});

			customTween(
				dots,
				time,
				update
			);
		}

		render() {
			return (
				<Component
					onMountedAnimationRef={this.onMountedAnimationRef}
					{...this.props}
				/>);
		}
	}

	return Animation;
}

export default animationTween;
