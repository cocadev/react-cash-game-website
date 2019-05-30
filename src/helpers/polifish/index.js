export const pollfishConfig = {
	api_key: "08fd6e57-549f-42a5-aaaf-be42bf3bb524",
	indicator_position: "BOTTOM_RIGHT",
	debug: true,
	uuid: "string_uuid",
	ready: pollfishReady,
	closeCallback: customSurveyClosed,
	userNotEligibleCallback: customUserNotEligible,
	closeAndNoShowCallback: customCloseAndNoShow,
	surveyCompletedCallback: customSurveyFinished,
	surveyAvailable: customSurveyAvailable,
	surveyNotAvailable: customSurveyNotAvailable
};

function customSurveyClosed(){
	console.log("user closed the survey");
}

function customUserNotEligible(){
	console.log("user is not eligible");
}

function customSurveyFinished(){
	console.log("user finished the survey");
}

function customCloseAndNoShow(){
	console.log("close and hide the indicator");
}

function customSurveyAvailable(data){
	console.log("pollfish survey is available with revenue: " + data.revenue + " and survey format playful: " + data.playful);
}

function customSurveyNotAvailable(){
	console.log("survey not available");
}

function pollfishReady() {
	console.log("321123");
}
