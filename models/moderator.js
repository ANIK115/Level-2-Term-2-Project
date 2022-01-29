const createModeratorModel = (name, email, phone, address, salary, hire_date) => {

    let moderator = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        salary: salary,
        hire_date: hire_date
    };
    return moderator;
};

module.exports = createModeratorModel;