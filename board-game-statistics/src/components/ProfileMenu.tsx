import { forwardRef } from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Image from 'react-bootstrap/Image';
import {
	GLOBAL_STATS_PAGE_URL,
	MANAGE_ACCOUNT_PAGE_URL,
} from '../utils/constants';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
	logout: () => void;
}

interface CustomToggleProps {
	children?: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CustomToggle = forwardRef<HTMLAnchorElement, CustomToggleProps>(
	({ children, onClick }, ref) => (
		<a
			href=''
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			<Image
				src='photo.png'
				roundedCircle
				style={{ maxWidth: '2.4rem', cursor: 'pointer' }}
			/>
		</a>
	)
);

const ProfileMenu = (props: ProfileMenuProps) => {
	const { logout } = props;

	return (
		<>
			<Dropdown align='end'>
				<Dropdown.Toggle as={CustomToggle} />

				<Dropdown.Menu>
					<Dropdown.Item as={Link} to={GLOBAL_STATS_PAGE_URL}>
						Global stats
					</Dropdown.Item>
					<Dropdown.Item as={Link} to={MANAGE_ACCOUNT_PAGE_URL}>
						Manage account
					</Dropdown.Item>
					<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
};

export default ProfileMenu;
