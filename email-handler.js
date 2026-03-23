// EmailJS Configuration and Contact Form Handler
// Import EmailJS from CDN
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm';

// Initialize EmailJS with your public key
emailjs.init("-wH1Errl5hXJOSTaA");

console.log('EmailJS v4 initialized successfully');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the contact form element
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add submit event listener to the form
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('Form submitted');

      // Get form field values
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const agency = document.getElementById('agency').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validate that all fields are filled
      if (!fullName || !email || !agency || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // Get submit button and show loading state
      const submitButton = contactForm.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Prepare email parameters for EmailJS template
      const emailParams = {
        to_email: 'cpsolutionsandtech@gmail.com',
        from_name: fullName,
        from_email: email,
        agency: agency,
        message: message
      };

      console.log('Sending email via EmailJS...');

      // Send email using EmailJS service
      emailjs.send(
        'service_lzl0up4',      // Your EmailJS service ID
        'template_aa5uyta',      // Your EmailJS template ID
        emailParams
      ).then(
        function(response) {
          // Success callback
          console.log('SUCCESS', response.status, response.text);
          alert('Message sent successfully! We will get back to you soon.');
          contactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        },
        function(error) {
          // Error callback
          console.log('FAILED', error);
          alert('Failed to send message. Please try again or contact us directly.');
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      );
    });
  } else {
    console.error('Contact form not found');
  }
});
