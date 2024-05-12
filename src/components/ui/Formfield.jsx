import React from "react";
import FormBase64 from "./form64";
const FormField = ({ field, formData, handleChange }) => {
    return (
        <div>
            <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}:
            </label>
            {field.type === "select" ? (
                <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : field.type === "file" ? (
                <FormBase64 onChange={handleChange} fieldName={field.name} />
            ) : (
                <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-zinc-700"
                />
            )}
        </div>
    );
};

export default FormField;
