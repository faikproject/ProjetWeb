import React, { useContext, useState, useLayoutEffect, useEffect, useCallback } from 'react';
//LIBS
import { useLocation } from 'react-router';
//CONTEXTS
import { FormContext } from '../../context/formContext';

function ReactiveSidebarForm(props) {
    const location = useLocation();
    const [status, setStatus] = useState({
        isChanged: false,
        isPublished: false,
        seeLink: null,
        progress: 0,
    });

    const [buttons, setButtons] = useState({});

    //CONTEXTS
    const [formContextState, formContextDispatch] = useContext(FormContext);

    const handleSave = () => {
        formContextDispatch({ type: 'save' });
        handlePopHover('save', false);
    };
    
    const handleAdd = () => {
        formContextDispatch({ type: 'add' });
        handlePopHover('add', false);
    };

    useLayoutEffect(() => {
        switch (formContextState.action) {
            case 'change':
                setStatus((c) => ({
                    ...c,
                    isChanged: formContextState.status,
                }));
                break;
            case 'publish':
                setStatus((c) => ({
                    ...c,
                    isPublished: formContextState.status,
                    seeLink: formContextState.seeLink,
                }));
                break;
            case 'progress':
                setStatus((c) => ({
                    ...c,
                    progress: formContextState.status,
                }));
                break;
            default:
        }
    }, [formContextState]);

    useEffect(() => {
        if (location.pathname.includes('/dashboard/profil')) {
            setButtons({
                ...buttons.current,
                add: false,
                save: true,
                publish: false,
                seeLink: true,
                progress: true,
            });
        } else  if (location.pathname.includes('/dashboard/gallery') || location.pathname.includes('/dashboard/news')) {
            setButtons({
                ...buttons.current,
                add: true,
                save: false,
                publish: false,
                seeLink: true,
                progress: true,
            });
        }
        //eslint-disable-next-line
    }, [location.pathname]);

    const handlePopHover = useCallback((popId, showed) => {
        if (showed) {
            document.getElementById(popId)?.classList.add('active');
        } else {
            document.getElementById(popId)?.classList.remove('active');
        }
    }, []);

    return (
        <>
            <div className="flex flex-row gap-2 items-center justify-center">
                {buttons.add && (
                    <div className="popHover">
                        <button
                            onMouseOver={() => handlePopHover('add', true)}
                            onMouseLeave={() => handlePopHover('add', false)}
                            onClick={handleAdd} // You need to define this function
                            className="flex flex-row items-center gap-1 rounded-full px-4 py-1 bg-white button-border-green border-2"
                        >
                            {/* <PlusIcon className="h-5 w-5 p-0" /> Uncomment this if you have an icon for Add */}
                            <span>Ajouter</span>
                        </button>
                    </div>
                )}
                {buttons.save && (
                    <div className="popHover">
                        {buttons.progress && status.progress > 0 ? (
                            <button label={"test"} css="button-small button-disabled h-8 w-8" />
                        ) : (
                            <button
                                disabled={status?.isChanged ? false : true}
                                onMouseOver={() => {
                                    if (status.isChanged) {
                                        handlePopHover('save', true);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (status.isChanged) {
                                        handlePopHover('save', false);
                                    }
                                }}
                                onClick={handleSave}
                                className={`flex flex-row items-center gap-1 rounded-full px-4 py-1 bg-white ${status?.isChanged ? 'button-border-green border-2' : 'button-border-gray border-2'}`}
                            >
                                <>
                                    {/* <CheckIcon className="h-5 w-5 p-0" /> */}
                                    <span>Enregistrer</span>
                                </>
                            </button>

                        )}
                    </div>
                )}
            </div>
    
        </>
    );
}

export default ReactiveSidebarForm;