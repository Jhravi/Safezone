// Function to open the quote form modal
function openQuoteForm(productName) {
    const modal = document.getElementById('quoteModal');
    const productInput = document.getElementById('productName');
    
    // Set the product name in the form
    if (productInput) {
        productInput.value = productName || '';
    }
    
    // Show the modal
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
}

// Function to close the quote form modal
function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Function to handle form submission
function submitQuoteForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send form data to FormSubmit
      fetch('https://formsubmit.co/ajax/jhravindra@gmail.com', {
        method: 'POST',
        body: formData

    // Show thank you message after a short delay
    setTimeout(() => {
        showThankYouMessage();
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        setTimeout(closeQuoteModal, 2000);
        document.body.removeChild(iframe);
    }, 1200);

    form.submit();
    return false;
}

// Function to show thank you message
function showThankYouMessage() {
    const thankYouMessage = document.createElement('div');
    thankYouMessage.id = 'thankYouMessage';
    thankYouMessage.style.position = 'fixed';
    thankYouMessage.style.top = '50%';
    thankYouMessage.style.left = '50%';
    thankYouMessage.style.transform = 'translate(-50%, -50%)';
    thankYouMessage.style.backgroundColor = 'white';
    thankYouMessage.style.padding = '20px 40px';
    thankYouMessage.style.borderRadius = '8px';
    thankYouMessage.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    thankYouMessage.style.zIndex = '1001';
    thankYouMessage.style.textAlign = 'center';
    thankYouMessage.style.fontSize = '1.1rem';
    thankYouMessage.style.color = '#0056b3';
    thankYouMessage.style.fontWeight = '500';
    thankYouMessage.textContent = 'Thank you for submitting your query — we’ll get back to you shortly.';
    
    document.body.appendChild(thankYouMessage);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        thankYouMessage.style.transition = 'opacity 0.5s';
        thankYouMessage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(thankYouMessage);
        }, 500);
    }, 3000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
        closeQuoteModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('quoteModal');
    if (event.key === 'Escape' && modal && modal.style.display === 'block') {
        closeQuoteModal();
    }
});
