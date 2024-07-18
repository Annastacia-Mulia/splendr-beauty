const Validation = (values) => {
    let errors = {};

    if (!values.business_name) {
        errors.business_name = 'Business name is required';
    }

    if (!values.address) {
        errors.address = 'Address is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.phone) {
        errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Phone number must be 10 digits';
    }

    if (!values.service) {
        errors.service = 'Service type is required';
    }

    if (!values.description) {
        errors.description = 'Description is required';
    }

    return errors;
};

export default Validation;
