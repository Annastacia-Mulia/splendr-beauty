//Validate.js

const Validation = (values) => {
    let errors = {};
  
    // Validate name
    if (!values.name.trim()) {
      errors.name = 'Service name is required';
    }
  
    // Validate cost
    if (!values.cost.trim()) {
      errors.cost = 'Cost of service is required';
    } else if (isNaN(values.cost)) {
      errors.cost = 'Cost must be a number';
    }
  
    // Validate duration
    if (!values.duration.trim()) {
      errors.duration = 'Duration of service is required';
    }
  
    return errors;
  };
  
  export default Validation;
  