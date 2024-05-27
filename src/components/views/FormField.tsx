import React from "react";
import PropTypes from "prop-types";

const FormField = React.memo(({ label, name, value, onChange, options, isCheckbox }) => {
  return (
    <div className="join field">
      <label className="join label">{label}</label>
      {isCheckbox ? (
        <div className="checkbox-group">
          {options.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={value.includes(option)}
                onChange={onChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          type="text"
          className="register input"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
});

FormField.displayName = "FormField";

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  isCheckbox: PropTypes.bool,
};

export default FormField;


