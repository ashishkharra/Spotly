const PhoneInput = ({ field, form, countryCode, ...props }) => {
  const maxDigits = 10;

  const formatPhoneNumber = (input) => {
    let digits = input.replace(/\D/g, "");
    if (digits.length > maxDigits) digits = digits.slice(0, maxDigits);

    let formatted = "";
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length > 3) formatted += " " + digits.slice(3, 6);
    if (digits.length > 6) formatted += " " + digits.slice(6, 10);

    return formatted;
  };

  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    form.setFieldValue(field.name, formatted);
  };

  return (
    <input
      {...field}
      {...props}
      value={field.value}
      onChange={handleChange}
      placeholder={`${countryCode} XXX XXX XXXX`}
      className="bg-gray-200 border-none p-2 rounded-lg w-full outline-none"
    />
  );
};


export default PhoneInput;
