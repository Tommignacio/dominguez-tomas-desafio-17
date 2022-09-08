const d = document;
d.addEventListener("DOMContentLoaded", () => {
	const elems = d.querySelectorAll(".datepicker");
	const datepickerOptions = {
		autoClose: true,
		format: "mmmm dd, yyyy",
		yearRange: 50,
	};
	M.Datepicker.init(elems, datepickerOptions);
});

const coverSignInBtn = d.getElementById("cover-sign-in-btn");
const coverSignUpBtn = d.getElementById("cover-sign-up-btn");

const signInForm = d.getElementById("sign-in-form");
const signUpForm = d.getElementById("sign-up-form");
const formWindow = d.getElementById("form-window");
const formContent = d.getElementById("form-content");

coverSignInBtn.addEventListener("click", () => {
	signInForm.classList.remove("hide-form");
	signUpForm.classList.add("hide-form");

	formWindow.classList.remove("window-to-left-frame");
	formContent.classList.remove("content-to-right-frame");
	formWindow.classList.add("window-to-right-frame");
	formContent.classList.add("content-to-left-frame");
});

coverSignUpBtn.addEventListener("click", () => {
	signUpForm.classList.remove("hide-form");
	signInForm.classList.add("hide-form");

	formWindow.classList.remove("window-to-right-frame");
	formContent.classList.remove("content-to-left-frame");
	formWindow.classList.add("window-to-left-frame");
	formContent.classList.add("content-to-right-frame");
});
