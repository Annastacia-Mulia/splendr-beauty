function Validation(values) {
    //alert("");
    let error = {};
    const admin_email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const admin_pwd_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{3,}$/;
  
    if (values.admin_email === "") {
      error.admin_email = "Name should not be empty";
    } else if (!admin_email_pattern.test(values.admin_email)) {
      error.admin_email = "Email didn't match";
    } else {
      error.admin_email = "";
    }
  

  
    return error;
  }

  export default Validation;