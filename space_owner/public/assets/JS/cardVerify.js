export const detectCardProvider = (cardNumber) => {
    if (/^3(?:0[0-5]|[68])/.test(cardNumber)) return 'credit_card';
    if (/^4/.test(cardNumber)) return 'debit_card';
    if (/^5[1-5]/.test(cardNumber)) return 'master_card';
    return '';
};

export const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
};

export const formatExpiry = (value) => {
    const exp = value.replace(/\D/g, '').substring(0, 4);
    if (exp.length > 2) {
        return `${exp.substring(0, 2)}/${exp.substring(2)}`;
    }
    return exp;
};
