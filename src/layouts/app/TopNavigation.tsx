import { NavLink } from 'react-router-dom';

const menus = ['Dashboard', 'Library', 'Account', 'Objectives', 'Reports', 'More'];

export function TopNavigation() {
	return (
		<section className="bg-white py-2 border-t">
			<div className="container mx-auto px-4 flex items-center justify-between">
				<nav className="flex items-center space-x-8">
					{menus.map((menu) => (
						<NavLink
							to={menu.toLowerCase()}
							key={menu}
							className="flex no-underline text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
						>
							{menu}
						</NavLink>
					))}
				</nav>
				<div className="relative">
					<span className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							/>
						</svg>
					</span>
					<input
						type="text"
						id="search-navbar"
						className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:none"
						placeholder="Search..."
					/>
				</div>
			</div>
		</section>
	);
}
