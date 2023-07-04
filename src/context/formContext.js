import React, { createContext, useReducer } from 'react';

const FormContext = createContext();

const initialState = () => {
    return {};
};

const FormProvider = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'init':
                return { name: action.name };
            case 'reset':
                return { action: 'reset' };
            case 'add':
                return { action: 'add' };
            case 'save':
                return { action: 'save' };
            case 'progress':
                return { action: 'progress', status: action.status };
            case 'change':
                return { action: 'change', status: action.status };
            case 'tooglePublish':
                return { action: 'tooglePublish' };
            default:
        }
    };

    const [formState, formDispatch] = useReducer(reducer, null, initialState);

    return <FormContext.Provider value={[formState, formDispatch]}>{props.children}</FormContext.Provider>;
};
export { FormContext, FormProvider };