import React from "react";

const Input= (props) =>{
    const {label, error, name, onChange}= props;
    const className= error ? "form-control is-invalid": "form-control";
    return(
        <div className={"form-group"}>
            <label>{label}</label>
            <input name={name} className={className} onChange={onChange}/>
            <div className="invalid-feedback">{props.error}</div>
        </div>
    )
}
export default Input;