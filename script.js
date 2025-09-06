// Week 6 Assignment - Interactive JavaScript
// This file contains all the JavaScript functionality

// ===== PART 1: EVENT HANDLING =====

// Set up event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Alert button click event
    document.getElementById('alertButton').addEventListener('click', function() {
        alert('Hello! This is an alert dialog!');
    });
    
    // Toggle content button
    const toggleButton = document.getElementById('toggleButton');
    const toggleContent = document.getElementById('toggleContent');
    
    toggleButton.addEventListener('click', function() {
        if (toggleContent.style.display === 'none') {
            toggleContent.style.display = 'block';
            toggleButton.textContent = 'Hide Content';
        } else {
            toggleContent.style.display = 'none';
            toggleButton.textContent = 'Show Content';
        }
    });
    
    // Click counter button
    const countButton = document.getElementById('countButton');
    let clickCount = 0;
    
    countButton.addEventListener('click', function() {
        clickCount++;
        countButton.textContent = `Click Count: ${clickCount}`;
    });
    
    // Mouse events box
    const mouseBox = document.getElementById('mouseBox');
    const mouseStatus = document.getElementById('mouseStatus');
    
    mouseBox.addEventListener('mouseenter', function() {
        mouseBox.style.backgroundColor = '#e3f2fd';
        mouseStatus.textContent = 'Mouse entered the box!';
    });
    
    mouseBox.addEventListener('mouseleave', function() {
        mouseBox.style.backgroundColor = '';
        mouseStatus.textContent = 'Mouse left the box!';
    });
    
    mouseBox.addEventListener('click', function() {
        mouseBox.innerHTML = '<strong>Clicked!</strong>';
        setTimeout(() => {
            mouseBox.innerHTML = 'Hover or click me!';
        }, 1000);
    });
    
    // Keyboard events
    const keyInput = document.getElementById('keyInput');
    const keyOutput = document.getElementById('keyOutput');
    
    keyInput.addEventListener('keydown', function(event) {
        keyOutput.textContent = `Key down: ${event.key} (Code: ${event.code})`;
    });
    
    keyInput.addEventListener('keyup', function() {
        keyOutput.textContent = `You typed: ${keyInput.value}`;
    });
    
    // ===== PART 2: INTERACTIVE FEATURES =====
    
    // Color Generator
    const colorGenerator = document.getElementById('colorGenerator');
    const colorOutput = document.getElementById('colorOutput');
    
    colorGenerator.addEventListener('click', function() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        colorOutput.style.backgroundColor = randomColor;
        colorOutput.innerHTML = `<strong>${randomColor}</strong>`;
        colorOutput.style.color = getContrastColor(randomColor);
    });
    
    // Text Manipulator
    const textInput = document.getElementById('textInput');
    const textOutput = document.getElementById('textOutput');
    
    document.getElementById('toUpper').addEventListener('click', function() {
        textOutput.textContent = textInput.value.toUpperCase();
    });
    
    document.getElementById('toLower').addEventListener('click', function() {
        textOutput.textContent = textInput.value.toLowerCase();
    });
    
    document.getElementById('reverseText').addEventListener('click', function() {
        textOutput.textContent = textInput.value.split('').reverse().join('');
    });
    
    // ===== PART 3: FORM VALIDATION =====
    
    const registrationForm = document.getElementById('registrationForm');
    const formOutput = document.getElementById('formOutput');
    
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset previous errors
        hideAllErrors();
        
        // Validate form fields
        const isValid = validateForm();
        
        if (isValid) {
            formOutput.innerHTML = '<strong class="success">Form submitted successfully!</strong>';
            formOutput.style.color = '#27ae60';
            
            // In a real application, you would submit the form data to a server here
            setTimeout(() => {
                registrationForm.reset();
                formOutput.textContent = '';
            }, 3000);
        }
    });
    
    // ===== BONUS: THEME SWITCHER =====
    
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('theme-dark');
        
        if (document.body.classList.contains('theme-dark')) {
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    });
});

// Helper function to determine text color based on background
function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

// Form validation function
function validateForm() {
    let isValid = true;
    
    // Validate full name
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName === '') {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    // Validate password confirmation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmError', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate birthdate
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === '') {
        showError('birthdateError', 'Please enter your date of birth');
        isValid = false;
    }
    
    return isValid;
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Helper function to hide all error messages
function hideAllErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}