
const inputValidators = () => {
    const nameValidator = (text) => text.trim() && text.trim().length > 3;

    const amountValidator = (amount) => amount && amount > 0;


    return {
        nameValidator,
        amountValidator
    }
};

export default inputValidators;