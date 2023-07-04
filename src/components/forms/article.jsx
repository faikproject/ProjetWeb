import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import FieldInput from '../../components/forms/fields/input';
import TextareaCustom from './fields/TextareaCustom';
import schema from '../../components/forms/yup/article';
import { postArticle } from '../../api/articles';

import { FormContext } from '../../context/formContext';

const FormArticle = () => {
    //HOOKS
    const [readyToWatch, setReadyToWatch] = useState(false);
    const navigate = useNavigate();
    //CONTEXT
    const [formContextState] = useContext(FormContext);
    //REF
    const currentForm = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatchAction = useCallback(() => {
        switch (formContextState.action) {
            case 'add':
                currentForm.current.click();
                break;
            default:
        }
    }, [formContextState.action]);

    useEffect(() => {
        setTimeout(() => {
            setReadyToWatch(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if (readyToWatch) {
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToWatch]);

    useEffect(() => {
        dispatchAction();
    }, [dispatchAction]);

    const onSubmit = (data) => {
        if (errors.length > 0) return false;

        const post = postArticle(data);
        post.then((res) => {
            if (res.status === 200) {
                navigate("/dashboard/articles/" + res.data.id);
            } else {
                console.warn('An error occurred');
            }
        });
    };

    return (
        <>
            <h1 className="font-bold text-3xl py-4">News</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="" autoComplete="off" encType="multipart/form-data">
                <div className="flex w-full gap-0">
                    <FieldInput name="name" label="Nom de l'article" errors={errors} register={register} />
                </div>
                <div className="flex w-full gap-0">
                    <TextareaCustom
                        name="description"
                        autoresize={true}
                        errors={errors}
                        register={register}
                        onChange={(e) => {
                            setValue('description', e.target.value);
                        }}
                    />
                </div>

                <input ref={currentForm} type="submit" className="hidden" />
            </form>
        </>
    );
};

export default FormArticle;