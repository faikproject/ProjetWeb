//LIBS
import { createPortal } from 'react-dom';

//UTILS
import { isMobile } from '../../utils/function';

//STYLE
import '../common/modal.css';

function Modal(props) {
    const handleClickOverlay = () => {
        props.onClose.onClick();
    };

    if (!props.open) return null;

    return createPortal(
        <div
            onClick={(e) => {
                if (props.onCloseOverlay) {
                    handleClickOverlay();
                }
            }}
            className={`modal ${props.overflow ? 'overflow-y-auto py-12' : 'items-center'}`}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={`${props.transparentBg ? 'modal-content-transparent' : 'modal-content'} ${props.noMaxWidth ? '' : 'modal-max-width'} ${
                    isMobile() && props.overflow && 'overflow-y-auto'
                } ${!props.fullScreen ? '' : 'fullscreen'} ${!props.modalWidth ? 'w-full md:w-8/12' : props.modalWidth}`}
            >
                {props.title && (
                    <div className="modal-title">
                        <h2>{props.title && props.title}</h2>
                    </div>
                )}
                <section
                    className={`${props.transparentBg ? 'modal-main-transparent' : 'modal-main'} ${!props?.modalHeight ? 'h-auto' : props?.modalHeight} ${
                        !props.title && 'rounded-2xl'
                    } ${props.fullScreen ? '!p-0' : 'p-2 md:p-8'}`}
                >
                    {props.children}
                </section>
                {props.onClose?.onClick && (
                    <div className={`modal-close flex flex-row-reverse gap-1 ${props.overflow ? 'right-0' : '-right-4'}`}>
                        <button className="h-10 w-10" onClick={props.onClose.onClick}>
                            <span className='h-8 w-8 block text-white'>X</span>
                        </button>
                    </div>
                )}

                {(props.onClose || props.onConfirm) && !props.navigation && !props.noActions && (
                    <div className={`modal-actions ${!props.noBorder && 'border-t'}`}>
                        {props.onClose && !props.onClose.noButton && (
                            <button
                                label={props.onClose.label ? props.onClose.label : 'Annuler'}
                                className="text-black bg-white m-0 mr-2 button-border-gray rounded-full"
                                onClick={props.onClose.onClick}
                            />
                        )}
                        {props.onConfirm && (
                            <button
                                className={` text-black h-12 w-12 m-0 rounded-full hover:text-blueMain`}
                                disabled={props.onConfirm.disabled}
                                onClick={() => {
                                    !props.onConfirm.disabled && props.onConfirm.onClick();
                                }}
                            >{props.onConfirm.label ? props.onConfirm.label : 'Valider'}</button>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
export default Modal;