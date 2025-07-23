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
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Set the form action with the current product
    const productName = document.getElementById('Customer Enquiry Form').value;
    const formAction = `https://formsubmit.co/el/gamuso?subject=Quote Request for ${encodeURIComponent(productName)}`;
    
    // Submit the form using FormSubmit.co
    fetch(formAction, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Show success message
        showThankYouMessage();
        // Reset form
        form.reset();
        // Close modal after delay
        setTimeout(closeQuoteModal, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your request. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
    
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
