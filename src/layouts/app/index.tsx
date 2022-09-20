import { Outlet } from 'react-router-dom';
import { AppHeader } from '~/layouts/app/Header';
import { AppFooter } from '~/layouts/app/Footer';
import { TopNavigation } from '~/layouts/app/TopNavigation';

function AppLayout() {
	return (
		<section className="animate-opacity w-full h-full flex-col">
			<AppHeader />
			<main className="flex-1 flex flex-col h-full overflow-auto">
				<TopNavigation />
				<Outlet />
				<AppFooter />
			</main>
		</section>
	);
}

export default AppLayout;
