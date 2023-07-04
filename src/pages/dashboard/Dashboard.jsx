//STYLES
//LAYOUT
import DashboardLayout from '../../pages/layouts/Dashboard';

import FormProfil from '../../components/forms/profil';

function Dashboard(props) {
    return (
        <DashboardLayout>
            <div>
                <main>
                    <div className='mx-4 sm:mx-0'>
                        <FormProfil />
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;