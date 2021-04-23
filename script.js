/******w***********
    
    Project 3 Javascript
    Name: Khanh Nguyen
    Date: 2021-04-02
    Description: Javascript for Project 3

******************/

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

/*
 * Handles the load event of the document.
 */
function load()
{
	hideErrors();
	document.getElementById("contactForm").addEventListener("submit", validate);
	document.getElementById("contactForm").addEventListener("reset", resetForm);
}

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	e.preventDefault();

	hideErrors();

	//	Determine if the form has errors
	if(formHasErrors())
	{
		// 	Prevents the form from submitting
		e.preventDefault();
		// 	Returning false prevents the form from submitting
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear information?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	let errorFlag = false;

	let requiredFields = ["fullname", "phonenumber", "email", "comments"];

	for (let i = 0; i < requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);

		if (!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if (!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			// Raise the error flag
			errorFlag = true;
		}
	}

	// Regex for input fields
	let phoneRegEx = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
	let emailRegEx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	
	let phoneValue = document.getElementById("phonenumber").value;
	let emailValue = document.getElementById("email").value;

	// Check validation of telephone number input
	if (!phoneRegEx.test(phoneValue))
	{
		document.getElementById("phonenumber_error").style.display = "block";

		if (!errorFlag)
		{
			document.getElementById("phonenumber").focus();
			document.getElementById("phonenumber").select();
		}

		// Raise the error flag
		errorFlag = true; 
	}

	// Check validation of email input
	if (!emailRegEx.test(emailValue))
	{
		document.getElementById("email_error").style.display = "block";

		if (!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise the error flag
		errorFlag = true; 
	}

	
	//	Code above here!
	return errorFlag;
	
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ )
	{
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Validate the input field
 */
function formFieldHasInput(fieldElement) 
{
	// Check if a text field element has input
	if (fieldElement.value == null || trim(fieldElement.value) == "")
	{
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Remove spacecs from the input fields
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}