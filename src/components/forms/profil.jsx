import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

//API
//import { putProfile, putProfilePublish } from '../../api/users';
import "../../styles/Login.css"
//COMPONENTS
//import FieldFiles from 'components/forms/fields/Files';
import FieldInput from '../../components/forms/fields/input';
//import Header from 'components/common/Header';
//import Textarea from 'components/forms/fields/Textarea';

//CONFIG
import config from '../../utils/constants';

//CONTEXTS
import { AuthContext } from '../../context/authContext';
import { FormContext } from '../../context/formContext';

//FORMS
import schema from '../../components/forms/yup/profile';

//HOOKS
import useCurrentForm from '../../hooks/useForm';

//LIBS
//import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//STYLES
import '../../components/forms/forms.css';
import { putProfile } from '../../api/users';
import TextareaCustom from './fields/TextareaCustom';

function FormProfil() {
    const [readyToWatch, setReadyToWatch] = useState(false);
    const [presentationInitialValue, setPresentationInitialValue] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);

    const [progressBar, setProgressBar] = useState({ active: false, value: 0 });

    //CONTEXTS
    const [authState, , refresh] = useContext(AuthContext);
    const [formContextState, formContextDispatch] = useContext(FormContext);

    //REFS
    const currentForm = useRef(null);
    //HOOKS
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        getValues,
        clearErrors,
    } = useForm({
        resolver: yupResolver(schema),
    });

    //DISPATCH
    const dispatchAction = useCallback(() => {
        switch (formContextState.action) {
            case 'save':
                currentForm.current.click();
                break;
            default:
        }
        // eslint-disable-next-line
    }, [formContextState.action]);

    //EFFECTS
    useEffect(() => {
        refresh();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (readyToWatch) {
            clearErrors();
        }
        //eslint-disable-next-line
    }, [readyToWatch]);

    useEffect(() => {
        dispatchAction();
    }, [dispatchAction]);

    useEffect(() => {
        const me = authState.me;

        if (me) {
            setAvatarUrl(me.profile?.avatar?.url ? config.serverUrl + me.profile?.avatar?.url : '');
            setValue('pseudo', me.profile?.pseudo);
            setValue('email', me.auth?.email.trim());
            setValue('phone', me.profile?.phone);
            setValue('address', me.profile?.address);
            setValue('presentation', me.profile?.presentation);
            setPresentationInitialValue(me.profile?.presentation);
          
            setValue('linkInstagram', me.profile?.linkInstagram);
            setValue('linkFacebook', me.profile?.linkFacebook);
            setValue('linkTwitter', me.profile?.linkTwitter);

            setTimeout(() => {
                setReadyToWatch(true);
            }, 1000);
        }
        //eslint-disable-next-line
    }, [authState]);

    useCurrentForm(readyToWatch, watch);

    const onSubmit = (data) => {
        if (errors.length > 0) return false;

        const fd = new FormData();
        for (var k in data) {
            if (data[k] !== undefined) {
                let item = null;
                item = data[k];
                
                if (k === 'avatar') {
                    console.log(data[k])
                    let files = data[k];
                    for (let i = 0; i < files.length; i++) {
                        fd.append(k, files[i]);
                    }
                } else fd.append(k, item);
            }
        }

        const put = putProfile(fd, function (e) {
            let progress = (e.loaded / e.total) * 100;
            formContextDispatch({ type: 'progress', status: progress });
            setProgressBar({ ...progressBar, active: true, value: progress });
        }); 
   
        put.then((res) => {
            if (res.status === 200) {
                console.log('Profil mis à jour');
                refresh();
                setTimeout(() => {
                    formContextDispatch({ type: 'change', status: false });
                    setTimeout(() => {
                        formContextDispatch({ type: 'progress', status: 0 });
                    }, 400);
                }, 100);
            } else {
                console.log('Une erreur est survenue', { type: 'danger' });
            }
        });
    };

    return (
        <>
                <h1 className="font-bold text-3xl py-4">My profile</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="login" autoComplete="off" encType="multipart/form-data">
                    {/* <div className="flex flex-wrap lg:flex-nowrap w-full py-2 gap-2">
                        <div className="w-full lg:w-1/3">
                            <h1 className="text-sm font-bold">Image de profil*</h1>
                        </div>
                    </div> */}

                    <h3 className="section_title font-bold">Informations</h3>
                    <div className="flex w-full gap-3">
                        <FieldInput name="pseudo" label="Pseudo*" size="w-1/2" errors={errors} register={register} />
                    </div>
                
                    <div className="flex w-full gap-3">
                        <FieldInput disabled={true} name="email" label="Email" size="w-1/2" errors={errors} register={register} />
                        <FieldInput name="phone" size="w-1/2" label="Téléphone" maxLength={15} errors={errors} register={register} />
                    </div>
                    

                    <div className="flex w-full gap-3 pb-4">
                        <FieldInput
                            disabled={true}
                            name="address"
                            label="Adresse postale"
                            depends="point"
                            errors={errors}
                            register={register}
                            getValues={getValues}
                            readyToWatch={readyToWatch}
                        />
                    </div>
                
                    <h3 className="section_title font-bold">Presentation</h3>
                    <div className="flex w-full gap-3">
                        <TextareaCustom
                            label={false}
                            name="presentation"
                            autoresize={true}
                            errors={errors}
                            register={register}
                            initValue={presentationInitialValue}
                            onChange={(e) => {
                                setValue('presentation', e.target.value)
                            }}
                        />
                    </div> 

                    <h3 className="section_title font-bold">My social networks</h3>

                    <div className="flex w-full gap-3">
                        <FieldInput  name="linkFacebook" size="w-1/2" label="URL profile Facebook" errors={errors} register={register} />
                        <FieldInput  name="linkInstagram" size="w-1/2" label="URL profile Instagram" errors={errors} register={register} />
                    </div>
                    <div className="flex w-full gap-3">
                        <FieldInput name="linkTwitter" size="w-1/2" label="URL profile Twitter" errors={errors} register={register} />
                    </div>

                    <input ref={currentForm} type="submit" className="hidden" />
                </form>
        </>
    );
}

export default FormProfil;