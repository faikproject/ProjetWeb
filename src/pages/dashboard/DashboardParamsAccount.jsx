import { useCallback, useContext, useEffect, useState } from 'react';
//API
import { deleteAccount } from '../../api/users';
//COMPONENTS
import Modal from '../../components/common/Modal';
//CONTEXTS
import { AuthContext } from '../../context/authContext';
//HOOKS
import UseAuth from '../../hooks/useAuth';
//LAYOUT
import DashboardLayout from '../../pages/layouts/Dashboard';



function Account(props) {
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const { logout } = UseAuth();

    const [, , authRefresh] = useContext(AuthContext);

    function handleDelete() {
        deleteAccount().then((data) => {
            setOpenConfirmDelete(false);
            logout();
        });
    }

    const handleLogout = useCallback(() => {
        logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  

    useEffect(() => {
        authRefresh();
        //eslint-disable-next-line
    }, []);

    return (
        <DashboardLayout>
                <Modal
                    title="Supprimer mon compte"
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
                    <p>Voulez-vous vraiment supprimer votre compte ?</p>
                </Modal>

                
                    <div className="mx-4 sm:mx-0">
                        <div className="mb-24">
                            <h1 className="h1">Mon compte</h1>

                            <div>
                                <button onClick={handleLogout} className="mt-4 ml-0">
                                    Me déconnecter
                                </button>
                            </div>
                            
                            <div className=''>
                                <button onClick={() => setOpenConfirmDelete(true)} className="mt-4 ml-0">
                                    Supprimer mon compte
                                </button>
                            </div>
                        </div>
                    </div>
        </DashboardLayout>
    );
}

export default Account;