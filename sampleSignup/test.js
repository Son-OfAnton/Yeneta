function validateForm() {
    const emailInput = document.getElementById('form3Example3c');
    const passwordInput = document.getElementById('form3Example4c');
    const confirmPasswordInput = document.getElementById('form3Example4cd');
    const emailError = document.querySelector('#form3Example3c + .error');
    const passwordError = document.querySelector('#form3Example4c + .error');
    const confirmPasswordError = document.querySelector('#form3Example4cd + .error');
  
    let valid = true;
  
    // Validate email
    if (!emailInput.checkValidity()) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }
  
    // Validate password
    if (!passwordInput.checkValidity()) {
      passwordError.textContent = 'Please enter a password.';
      valid = false;
    } else if (passwordInput.value.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters.';
      valid = false;
    } else {
      passwordError.textContent = '';
    }
  
    // Validate confirm password
    if (!confirmPasswordInput.checkValidity()) {
      confirmPasswordError.textContent = 'Please confirm your password.';
      valid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = 'Passwords do not match.';
      valid = false;
    } else {
      confirmPasswordError.textContent = '';
    }
  
    return valid;
  }
  