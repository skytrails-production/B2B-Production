export function validatePhoneNumber(phoneNumber) {
  // Define the regular expression pattern for a valid phone number
  var phonePattern = /^\d{10}$/;

  // Test the phone number against the pattern
  return phonePattern.test(phoneNumber);
}
export function validateName(name) {
  // Trim leading and trailing whitespaces
  const trimmedName = name.trim();

  // Check if the name is not empty after trimming
  if (!trimmedName) {
    return false;
  }

  // Check if the name contains only letters and spaces
  if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
    return false;
  }

  // If all checks pass, the name is considered valid
  return true;
}

export function validateEmail(email) {
  // Define the regular expression pattern for a valid phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the phone number against the pattern
  return emailRegex.test(email);
}
export function validatePAN(panNumber) {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(panNumber);
}
export function validatePassword(password) {
  // Check if password is empty
  if (password === "") {
    return false;
  }

  // Check password length
  if (password.length < 8 || password.length > 15) {
    return false;
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check for at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Check for at least one special character
  if (!/[@#$%^&*()_+\-=<>!?]/.test(password)) {
    return false;
  }

  // If all checks pass, the password is valid
  return true;
}
export function validateGSTIN(gstinNumber) {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gstinNumber);
}
export function validateProvisionalGSTIN(provisionalGSTIN) {
  const regex = /^[0-9]{4}[A-Z]{3}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/;
  return regex.test(provisionalGSTIN);
}
export function validatePincode(pincode) {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pincode);
}
export function isValidPassportNumber(passportNumber) {
  // Basic validation for illustrative purposes
  const passportRegex = /^[A-Z0-9]{6,20}$/; // Adjust the regex based on the specific rules

  if (!passportNumber || !passportRegex.test(passportNumber)) {
    return false;
  }

  // Additional checks based on specific rules for the country

  // Add more checks based on your requirements

  // If all checks pass, consider it valid
  return true;
}
