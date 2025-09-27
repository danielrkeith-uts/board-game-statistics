import type { Group } from '../../../utils/types';
import GameResultsSection from './GameResultsSection';
import GamesSection from './GamesSection';
import MembersSection from './MembersSection';

interface GroupHomeViewProps {
	currentGroup: Group;
}

const GroupHomeView = (props: GroupHomeViewProps) => {
	const { currentGroup } = props;

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-3 border'>
					<GamesSection />
				</div>
				<div className='col border'>
					<MembersSection group={currentGroup} />
				</div>
				<div className='col-3 border'>
					<GameResultsSection group={currentGroup} />
				</div>
			</div>
		</div>
	);
};

export default GroupHomeView;
