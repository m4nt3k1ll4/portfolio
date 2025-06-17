
document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
    const formResult = document.getElementById('form-result') as HTMLDivElement | null;

    if (!contactForm || !formResult) {
        console.error("No se encontraron los elementos del formulario en el DOM.");
        return; 
    }

    contactForm.addEventListener('submit', (event: SubmitEvent) => {
        
        event.preventDefault();

       const formData = new FormData(contactForm);

        const dataToPost = new URLSearchParams();

       const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScBzd01tfoUaV8RsqRFLXeg0UP-r-uI3ZT7N4q5kiLopsmAIQ/formResponse'; // ¡DEBES REEMPLAZAR ESTA URL DE EJEMPLO!
        const NAME_ID = 'entry.135050974';
        const EMAIL_ID = 'entry.976128578';
        const MESSAGE_ID = 'entry.1391685641';

        dataToPost.append(NAME_ID, formData.get('name') as string);
        dataToPost.append(EMAIL_ID, formData.get('email') as string);
        dataToPost.append(MESSAGE_ID, formData.get('message') as string);


        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: dataToPost,
        })
        .then(() => {
            formResult.innerHTML = '<div class="success-message">¡Gracias! Tu mensaje ha sido enviado correctamente.</div>';
            contactForm.reset();
        })
        .catch((error: Error) => {
            formResult.innerHTML = `<div class="error-message">Hubo un error de red al enviar el formulario. Error: ${error.message}</div>`;
        })
        .finally(() => {
            setTimeout(() => {
                formResult.innerHTML = '';
            }, 5000);
        });
    });
});