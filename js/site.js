import "./navigation.js";


/*
|--------------------------------------------------------------------------
| Reveal Animations
|--------------------------------------------------------------------------
*/

const revealElements =

    document.querySelectorAll(

        ".reveal"

    );


if (

    revealElements.length

    &&

    "IntersectionObserver" in window

) {

    const revealObserver =

        new IntersectionObserver(

            entries => {

                entries.forEach(

                    entry => {

                        if (!entry.isIntersecting) {

                            return;

                        }


                        entry.target.classList.add(

                            "is-visible"

                        );


                        revealObserver.unobserve(

                            entry.target

                        );

                    }

                );

            },

            {

                threshold: 0.12

            }

        );


    revealElements.forEach(

        element => {

            revealObserver.observe(

                element

            );

        }

    );

} else {

    /*
    |--------------------------------------------------------------------------
    | Fallback
    |--------------------------------------------------------------------------
    */

    revealElements.forEach(

        element => {

            element.classList.add(

                "is-visible"

            );

        }

    );

}


/*
|--------------------------------------------------------------------------
| Contact Form
|--------------------------------------------------------------------------
*/

const contactForm =

    document.querySelector(

        "[data-contact-form]"

    );


if (contactForm) {

    const status =

        contactForm.querySelector(

            "[data-contact-status]"

        );


    const submitButton =

        contactForm.querySelector(

            "[data-contact-submit]"

        );


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const setStatus = (

        message = "",

        type = ""

    ) => {

        if (!status) {

            return;

        }


        status.textContent =

            message;


        status.classList.remove(

            "is-success",

            "is-error"

        );


        if (type) {

            status.classList.add(

                `is-${type}`

            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Clear Errors
    |--------------------------------------------------------------------------
    */

    const clearErrors = () => {

        contactForm

            .querySelectorAll(

                "[data-contact-error]"

            )

            .forEach(

                error => {

                    error.textContent = "";

                }

            );


        contactForm

            .querySelectorAll(

                '[aria-invalid="true"]'

            )

            .forEach(

                field => {

                    field.removeAttribute(

                        "aria-invalid"

                    );

                }

            );

    };


    /*
    |--------------------------------------------------------------------------
    | Field Error
    |--------------------------------------------------------------------------
    */

    const showFieldError = (

        field,

        message

    ) => {

        if (!field) {

            return;

        }


        field.setAttribute(

            "aria-invalid",

            "true"

        );


        const error =

            contactForm.querySelector(

                `[data-contact-error="${field.name}"]`

            );


        if (error) {

            error.textContent =

                message;

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    const validate = () => {

        clearErrors();


        const name =

            contactForm.elements.namedItem(

                "name"

            );


        const email =

            contactForm.elements.namedItem(

                "email"

            );


        const subject =

            contactForm.elements.namedItem(

                "subject"

            );


        const message =

            contactForm.elements.namedItem(

                "message"

            );


        let firstInvalidField = null;

        let valid = true;


        /*
        |--------------------------------------------------------------------------
        | Name
        |--------------------------------------------------------------------------
        */

        if (

            !name?.value.trim()

        ) {

            showFieldError(

                name,

                "Please enter your name."

            );


            firstInvalidField ??= name;

            valid = false;

        }


        /*
        |--------------------------------------------------------------------------
        | Email
        |--------------------------------------------------------------------------
        */

        if (

            !email?.value.trim()

        ) {

            showFieldError(

                email,

                "Please enter your email address."

            );


            firstInvalidField ??= email;

            valid = false;

        }

        else if (

            !email.validity.valid

        ) {

            showFieldError(

                email,

                "Please enter a valid email address."

            );


            firstInvalidField ??= email;

            valid = false;

        }


        /*
        |--------------------------------------------------------------------------
        | Subject
        |--------------------------------------------------------------------------
        */

        if (

            !subject?.value

        ) {

            showFieldError(

                subject,

                "Please select a subject."

            );


            firstInvalidField ??= subject;

            valid = false;

        }


        /*
        |--------------------------------------------------------------------------
        | Message
        |--------------------------------------------------------------------------
        */

        if (

            !message?.value.trim()

        ) {

            showFieldError(

                message,

                "Please enter a message."

            );


            firstInvalidField ??= message;

            valid = false;

        }


        if (firstInvalidField) {

            firstInvalidField.focus();

        }


        return valid;

    };


    /*
    |--------------------------------------------------------------------------
    | Netlify Submission
    |--------------------------------------------------------------------------
    */

    const submitted =

        new URLSearchParams(

            window.location.search

        ).get(

            "submitted"

        );


    if (submitted === "true") {

        setStatus(

            "Thanks — your message has been submitted.",

            "success"

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Submission
    |--------------------------------------------------------------------------
    */

    contactForm.addEventListener(

        "submit",

        async event => {

            event.preventDefault();


            setStatus("");

            clearErrors();


            /*
            |--------------------------------------------------------------------------
            | Validation
            |--------------------------------------------------------------------------
            */

            if (!validate()) {

                setStatus(

                    "Please correct the highlighted fields and try again.",

                    "error"

                );


                return;

            }


            /*
            |--------------------------------------------------------------------------
            | Honeypot
            |--------------------------------------------------------------------------
            */

            const honeypot =

                contactForm.querySelector(

                    ".contact-honeypot"

                );


            if (

                honeypot?.value

            ) {

                contactForm.reset();

                setStatus(

                    "Thanks — your message has been submitted.",

                    "success"

                );


                return;

            }


            /*
            |--------------------------------------------------------------------------
            | Loading State
            |--------------------------------------------------------------------------
            */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.setAttribute(

                    "aria-busy",

                    "true"

                );

                submitButton.textContent =

                    "Sending…";

            }


            contactForm.setAttribute(

                "aria-busy",

                "true"

            );


            try {

                const formData =

                    new FormData(

                        contactForm

                    );


                /*
                |--------------------------------------------------------------------------
                | Netlify Form Name
                |--------------------------------------------------------------------------
                |
                | Preserve an existing hidden form-name field. If the form uses
                | a `name` attribute and no hidden field exists, add form-name
                | automatically for the AJAX submission.
                |
                |--------------------------------------------------------------------------
                */

                const formName =

                    contactForm.getAttribute(

                        "name"

                    );


                if (

                    formName

                    &&

                    !formData.has(

                        "form-name"

                    )

                ) {

                    formData.set(

                        "form-name",

                        formName

                    );

                }


                const response =

                    await fetch(

                        contactForm.getAttribute(

                            "action"

                        ) || "/",

                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/x-www-form-urlencoded"

                            },

                            body:

                                new URLSearchParams(

                                    formData

                                ).toString()

                        }

                    );


                /*
                |--------------------------------------------------------------------------
                | HTTP Error Handling
                |--------------------------------------------------------------------------
                */

                if (!response.ok) {

                    throw new Error(

                        `Contact form submission failed with HTTP ${response.status}.`

                    );

                }


                /*
                |--------------------------------------------------------------------------
                | Success
                |--------------------------------------------------------------------------
                */

                contactForm.reset();

                clearErrors();


                setStatus(

                    "Thanks — your message has been submitted. We'll review it shortly.",

                    "success"

                );

            }

            catch (error) {

                console.error(

                    "[ContactForm] Submission failed:",

                    error

                );


                setStatus(

                    "We could not send your message right now. Please try again.",

                    "error"

                );

            }

            finally {

                contactForm.removeAttribute(

                    "aria-busy"

                );


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.removeAttribute(

                        "aria-busy"

                    );

                    submitButton.textContent =

                        "Send message";

                }

            }

        }

    );

}