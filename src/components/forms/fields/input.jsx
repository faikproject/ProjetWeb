function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Input(props) {

    const { ref, ...register } = props.register(props.name);

    return (
        <div className={`relative ${props.size ? props.size : 'w-full'}`}>
            <div>
                {props.type !== 'hidden' && props.label !== false && props.type !== 'checkbox' && (
                    <label
                        className={`input_label ${props.errors && (props.errors[props.name] || props.errors[props.depends]) && 'input_error'}`}
                        htmlFor={`input_${props.name}`}
                    >
                        {props.label ? capitalize(props.label) : capitalize(props.name)}
                    </label>
                )}
                <div className="relative">
                    <div
                        className={`${
                            props.type === 'checkbox'
                                ? 'flex justify-start'
                                : `${props.name === 'search' ? 'border rounded-full border-gray-300' : ''} ${props?.searchMain ? 'bg-white p-2' : ''}`
                        }`}
                    >
                        <input
                            ref={(e) => {
                                ref(e);
                                if (props.currentRef) props.currentRef.current = e;
                            }}
                            defaultValue={props.defaultValue}
                            placeholder={props.placeholder}
                            {...register}
                            className={`input p-2 input_${props.inputForm} ${props.inputForm === "ai" ? 'border-white text-white' :'focus:border-blueMain'} placeholder-graySkills
                                        placeholder:text-sm sm:placeholder:text-base ${props.errors[props.name] && 'input_error'} ${props.className}`}
                            type={props.type ? props.type : 'text'}
                            id={`input_${props.name}`}
                            style={{background: 'none'}}
                                // onChange={props.onChange}
                            autoFocus={props.autoFocus}
                            maxLength={props.maxLength}
                            min={props.min || 0}
                            max={props.max}
                        />
                         
                        {props.type === 'checkbox' && (
                            <label htmlFor={`input_${props.name}`} className={`${props.className} input_label input_label_checkbox`}>
                                {props.label}
                            </label>
                        )}
                    </div>
                </div>
                {props.errors && props.errors[props.name] && (
                    <span className={`mt-0 mb-1 relative text-sm ${props.textErrorColor ? props.textErrorColor : 'text-danger-400'}`}>
                        {props.errors[props.name].message}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Input;