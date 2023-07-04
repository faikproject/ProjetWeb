import { useEffect, useRef, useState } from "react";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



function TextareaCustom(props) {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    const initialValue = props.initValue || '';
    
    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const valueWithNewline = event.target.value + '\n';
            event.target.value = valueWithNewline;
            if(props.autoresize) adjustHeight(event);
        }
    }

    const handleInput = (event) => {
        if(props.autoresize) adjustHeight(event);
    }

    useEffect(() => {
        adjustHeight();
    }, [initialValue]);
    
    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    return (
        <div className={`${props.size ? props.size : 'w-full'} mb-4 p-0 overflow-hidden ${isFocused ? 'border-gray-500' :''} border-b `}>
            {props.label !== false && (
                <label className={`input_label text-sm ${(props.errors && props.errors[props.name]) ? 'input_error' : ''}`} htmlFor={`input_${props.name}`}>
                    {props.label ? capitalize(props.label) : capitalize(props.name)}
                </label>
            )}

           <textarea
                ref={textareaRef}
                name={props.name}
                id={props.id}
                rows={props.rows ? props.rows : 3}
                defaultValue={initialValue}
                className={`${props.className ? props.className : 'text-black'} max-h-40 w-full sm:text-sm p-2`}
                style={props.style ? props.style : { height: 'auto', resize:'none', outline:'none' }}
                placeholder={props.placeholder ? props.placeholder : `Tapez votre texte`}
                onChange={(newText) => props.onChange(newText)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {props.errors && props.errors[props.name] && <span className="mt-0 text-danger-400 text-sm">{props.errors[props.name].message}</span>}
        </div>
    );
}

export default TextareaCustom;