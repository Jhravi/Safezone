// Function to open the quote form modal
function openQuoteForm(productName) {
    var modal = document.getElementById('quoteModal');
    var productInput = document.getElementById('productName');
    // Defensive: If modal is not found, try to find by class as fallback
    if (!modal) modal = document.querySelector('.modal');
    if (!productInput) productInput = document.querySelector('input[name="product"]');
    // Set the product name in the form
    if (productInput) {
        productInput.value = productName || '';
    }
    // Show the modal
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
        alert('Quote form modal not found on this page.');
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
    var form = event.target;
    var submitButton = form.querySelector('button[type="submit"]');
    var originalButtonText = submitButton ? submitButton.textContent : '';
    
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }

    // Create FormData object from the form
    const formData = new FormData(form);
    
    // For local development, we'll use a different approach
    // First, try the FormSubmit API
    fetch('https://formsubmit.co/ajax/jhravindra@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
        if (!response.ok) {
            // If FormSubmit fails, try a different approach
            throw new Error('FormSubmit failed, trying alternative method');
        }
        return response.json();
    })
    .then(data => {
        // Show success message
        showThankYouMessage();
        form.reset();
        setTimeout(closeQuoteModal, 2000);
    })
    .catch(error => {
        console.warn('FormSubmit failed, trying alternative method:', error);
        
        // Fallback method: Open mailto link
        const email = 'jhravindra@gmail.com';
        const subject = 'Quote Request: ' + (formData.get('product') || 'General Enquiry');
        const body = `Name: ${formData.get('name')}%0D%0A` +
                    `Email: ${formData.get('email')}%0D%0A` +
                    `Mobile: ${formData.get('mobile')}%0D%0A` +
                    `Product: ${formData.get('product')}%0D%0A` +
                    `Message: ${formData.get('message')}`;
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Show success message since we've redirected to mail client
        showThankYouMessage();
        form.reset();
        setTimeout(closeQuoteModal, 2000);
    })
    .finally(() => {
        // Reset button state
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
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
