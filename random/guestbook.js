// Google Form URL - replace with your actual form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfvzLkUer0ZpVqxvfOaKBrrQCZNkb0GW-zbqjArUA9bD1212g/viewform?usp=dialog';

// Guestbook functionality
class Guestbook {
    constructor() {
        this.init();
    }

    async init() {
        // For now, just show a static message since we're not loading from sheets
        this.displayStaticMessage();
    }

    displayStaticMessage() {
        const container = document.getElementById('signatures');
        container.innerHTML = '';
    }

    async submitSignature() {
        const fullName = document.getElementById('fullName').value.trim();
        const submitBtn = document.getElementById('submitBtn');

        if (!fullName) {
            alert('Please enter your full name');
            return;
        }

        if (fullName.length > 50) {
            alert('Name must be 50 characters or less');
            return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // Submit to Google Form
            const formData = new FormData();
            formData.append('entry.331575851', fullName);
            
            const response = await fetch(GOOGLE_FORM_URL.replace('/viewform', '/formResponse'), {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for Google Forms
            });

            // Since it's no-cors, we can't check the response, but we assume success
            this.showSuccess('Thank you for signing the guestbook! Will update upon approval.');
            document.getElementById('fullName').value = '';
            closeSignModal();
            
        } catch (error) {
            console.error('Error submitting signature:', error);
            this.showError('Failed to submit signature');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(successDiv, container.firstChild);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 5000);
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Modal functions
function openSignModal() {
    document.getElementById('signModal').style.display = 'block';
    document.getElementById('fullName').focus();
}

function closeSignModal() {
    document.getElementById('signModal').style.display = 'none';
    document.getElementById('fullName').value = '';
}

// Initialize guestbook
let guestbook;
document.addEventListener('DOMContentLoaded', function() {
    guestbook = new Guestbook();
});

// Global functions for onclick handlers
function submitSignature() {
    guestbook.submitSignature();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('signModal');
    if (event.target === modal) {
        closeSignModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSignModal();
    }
});

// Submit on Enter key
document.getElementById('fullName').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitSignature();
    }
}); 