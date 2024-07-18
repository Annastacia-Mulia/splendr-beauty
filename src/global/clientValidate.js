function Validation(values) {
    let errors = {};
    const client_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const client_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
  
    if (!values.client_fname.trim()) {
      errors.client_fname = "First name should not be empty";
    } else {
      errors.client_fname = "";
    }
  
    if (!values.client_lname.trim()) {
      errors.client_lname = "Last name should not be empty";
    } else {
      errors.client_lname = "";
    }
  
    if (!values.client_phone.trim()) {
      errors.client_phone = "Phone should not be empty";
    } else {
      errors.client_phone = "";
    }
  
    if (!values.client_email.trim()) {
      errors.client_email = "Email should not be empty";
    } else if (!client_email_pattern.test(values.client_email)) {
      errors.client_email = "Invalid email address";
    } else {
      errors.client_email = "";
    }
  
    if (!values.client_pwd.trim()) {
      errors.client_pwd = "Password should not be empty";
    } else if (!client_pwd_pattern.test(values.client_pwd)) {
      errors.client_pwd = "Password must contain at least 6 characters, including uppercase, lowercase, and numeric characters";
    } else {
      errors.client_pwd = "";
    }
  
    if (!values.confirm_pwd.trim()) {
      errors.confirm_pwd = "Confirm password should not be empty";
    } else if (values.confirm_pwd !== values.client_pwd) {
      errors.confirm_pwd = "Passwords do not match";
    } else {
      errors.confirm_pwd = "";
    }
  
    return errors;
  }
  
  export default Validation;
  