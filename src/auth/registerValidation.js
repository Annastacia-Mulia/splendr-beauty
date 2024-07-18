function Validation(values) {
  let errors = {};
  const admin_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const admin_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;

  if (values.admin_fname === "") {
      errors.admin_fname = "First Name should not be empty";
  } else {
      errors.admin_fname = "";
  }

  if (values.admin_lname === "") {
      errors.admin_lname = "Last Name should not be empty";
  } else {
      errors.admin_lname = "";
  }

  if (values.admin_phone === "") {
      errors.admin_phone = "Phone should not be empty";
  } else {
      errors.admin_phone = "";
  }

  if (values.admin_email === "") {
      errors.admin_email = "Email should not be empty";
  } else if (!admin_email_pattern.test(values.admin_email)) {
      errors.admin_email = "Invalid email format";
  } else {
      errors.admin_email = "";
  }

  if (values.admin_pwd === "") {
      errors.admin_pwd = "Password should not be empty";
  } else if (!admin_pwd_pattern.test(values.admin_pwd)) {
      errors.admin_pwd = "Password must be at least 6 characters long and contain at least one digit, one lowercase letter, and one uppercase letter";
  } else {
      errors.admin_pwd = "";
  }

  if (values.confirm_pwd === "") {
      errors.confirm_pwd = "Confirm Password should not be empty";
  } else if (values.confirm_pwd !== values.admin_pwd) {
      errors.confirm_pwd = "Passwords do not match";
  } else {
      errors.confirm_pwd = "";
  }

  return errors;
}

export default Validation;
