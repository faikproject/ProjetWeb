import { useEffect, useState } from 'react';

//LIBS
import { Link } from 'react-router-dom';
//import { toast } from 'react-toastify';

//API
import { putArticlePublish, deleteArticle } from '../../api/articles';

//ICONS
import { EyeIcon, EyeOffIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Modal from '../../components/common/Modal';

function CardArticle({ article, refetch }) {
    const [item, setItem] = useState(article);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    function handleTogglePublish() {
        putArticlePublish(item.id).then((data) => {
            setItem({ ...item, publish: data.publish });
            //const msg = data.publish ? 'Article publié' : 'Article dépublié';
            /* toast(msg, { type: 'success' }); */
        });
    }
    function handleDelete() {
        deleteArticle(item.id).then((data) => {
            //toast('Article supprimé', { type: 'success' });
            refetch();
            setOpenConfirmDelete(false);
        });
    }

    useEffect(() => {
        setItem(article);
        //eslint-disable-next-line
    }, [, article]);

    return (
        <>
            <Modal
                title="Supprimer l'article'"
                open={openConfirmDelete}
                onClose={{
                    onClick: () => {
                        setOpenConfirmDelete(false);
                    },
                }}
                onConfirm={{
                    label: 'Supprimer',
                    onClick: handleDelete,
                }}
            >
                <p>Voulez-vous vraiment supprimer l'article ?</p>
            </Modal>
            <div className="card card-article w-full p-2 bg-white flex flex-row justify-between items-center sm:gap-4 h-auto">
                <Link to={`/news/${item._id}`} className="flex ml-2">
                    <div className="card-header text-main text-base mb-4 font-bold text-purpleSkills">
                        <span>{item.name}</span>
                        <span>{item.description}</span>
                    </div>
                </Link>

                <div className="flex flex-nowrap justify-end">
                    <div className="card-actions flex flex-nowrap flex-col sm:flex-row items-center justify-end w-auto gap-2">
                        <button
                            onClick={handleTogglePublish}
                            className={`linkCard linkCard_Icon flex ml-2 ${item.publish ? 'text-success-400' : 'text-warning-300'}`}
                        >
                            <>
                                {item.publish ? (
                                    <>
                                        <EyeIcon className="w-5 h-5" /> {/* Dépublier */}
                                    </>
                                ) : (
                                    <>
                                        <EyeOffIcon className="w-5 h-5" /> {/* Publier */}
                                    </>
                                )}
                            </>
                        </button>
                        <Link to={`${item.id}`} className="linkCard linkCard_Icon flex ml-2">
                            <>
                                <PencilIcon className="w-5 h-5" /> {/* Modifier */}
                            </>
                        </Link>
                        <button onClick={() => setOpenConfirmDelete(true)} className="linkCard linkCard_Icon flex text-danger-500 ml-2">
                            <>
                                <TrashIcon className="w-5 h-5" /> {/* Supprimer */}
                            </>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardArticle;
