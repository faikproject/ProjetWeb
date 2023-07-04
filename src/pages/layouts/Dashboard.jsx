//COMPONENTS
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import DashboardNav from '../../containers/dashboard/dashboardNav';
import ReactiveSidebarForm from '../../components/forms/ReactiveSidebarForm';

function DashboardLayout({ children }) {
    
    return (
        <>
            {/* <div className="container">
                <Header /> 
                <Navbar />
                <div className="container relative mx-auto">
                    <div className="w-full h-full">{children}</div>
                </div>
            </div> */}
            <div className="flex-grow">
                    <Header /> 
                    <div className="relative mx-auto sm:px-4">
                        <div className="sm:grid sm:grid-cols-12 sm:gap-8 pb-4">
                           
                            <div className="hidden sm:block sm:col-span-3">
                                <DashboardNav />
                            </div>

                            <div className="sm:col-span-9">
                                <main>
                                    <div className="w-full relative">
                                        <div className="w-full px-2 mb-12">{children}</div>
                                        <div className="sticky bottom-24 z-10">
                                            <ReactiveSidebarForm />
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            <Navbar />
        </>
    );
}

export default DashboardLayout;