import { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
	apiGetAllGames,
	apiGetOwnedGames,
	apiAddOwnedGame,
	apiRemoveOwnedGame,
} from '../../utils/api/games-api-utils';
import type { Game } from '../../utils/types';
import AddCustomGameModal from './AddCustomGameModal';

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	}
	if (typeof err === 'string') {
		return err;
	}
	return 'Something went wrong.';
}

const GamesView = () => {
	const [catalog, setCatalog] = useState<Game[]>([]);
	const [owned, setOwned] = useState<Game[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [query, setQuery] = useState('');
	const [showCustomModal, setShowCustomModal] = useState(false);

	const refresh = async () => {
		setLoading(true);
		setError(null);
		try {
			const [cat, own] = await Promise.all([
				apiGetAllGames(),
				apiGetOwnedGames(),
			]);
			setCatalog(cat);
			setOwned(own);
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to load games.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void refresh();
	}, []);

	const ownedIds = useMemo(() => new Set(owned.map((g) => g.id)), [owned]);

	const filteredCatalog = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) {
			return catalog;
		}
		return catalog.filter(
			(g) =>
				g.name.toLowerCase().includes(q) ||
				(g.publisher ?? '').toLowerCase().includes(q)
		);
	}, [catalog, query]);

	const handleAdd = async (gameId: number) => {
		try {
			await apiAddOwnedGame(gameId);
			await refresh();
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to add game.');
		}
	};

	const handleRemove = async (gameId: number) => {
		try {
			await apiRemoveOwnedGame(gameId);
			await refresh();
		} catch (e: unknown) {
			setError(getErrorMessage(e) || 'Failed to remove game.');
		}
	};

	return (
		<div className='container'>
			<h1 className='mb-3'>Owned Games</h1>

			<div className='input-group mb-3'>
				<span className='input-group-text'>Search</span>
				<Form.Control
					placeholder='Find a game...'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button
					variant='success'
					onClick={() => setShowCustomModal(true)}
				>
					+ Add a game
				</Button>
			</div>

			{error && <div className='alert alert-danger'>{error}</div>}
			{loading ? (
				<div className='alert alert-secondary'>Loading…</div>
			) : (
				<div className='row g-3'>
					<div className='col-12 col-lg-6'>
						<div className='card'>
							<div className='card-header bg-info text-white fw-bold'>
								My Owned Games
							</div>
							<div className='card-body p-0'>
								{owned.length === 0 ? (
									<div className='p-4 text-muted'>
										No games yet. Add some from the catalog
										→
									</div>
								) : (
									<ul className='list-group list-group-flush'>
										{owned
											.slice()
											.sort((a, b) =>
												a.name.localeCompare(b.name)
											)
											.map((g) => (
												<li
													key={g.id}
													className='list-group-item d-flex align-items-center justify-content-between'
												>
													<div>
														<div className='fw-semibold'>
															{g.name}
														</div>
														{g.publisher && (
															<small className='text-muted'>
																{g.publisher}
															</small>
														)}
													</div>
													<Button
														size='sm'
														variant='outline-danger'
														onClick={() =>
															handleRemove(g.id)
														}
													>
														Remove
													</Button>
												</li>
											))}
									</ul>
								)}
							</div>
						</div>
					</div>

					<div className='col-12 col-lg-6'>
						<div className='card'>
							<div className='card-header bg-light fw-bold'>
								Game List
							</div>
							<div className='list-group list-group-flush'>
								{filteredCatalog
									.slice()
									.sort((a, b) =>
										a.name.localeCompare(b.name)
									)
									.map((g) => {
										const alreadyOwned = ownedIds.has(g.id);
										return (
											<div
												key={g.id}
												className='list-group-item d-flex align-items-center justify-content-between'
											>
												<div>
													<div className='fw-semibold'>
														{g.name}
													</div>
													{g.publisher && (
														<small className='text-muted'>
															{g.publisher}
														</small>
													)}
												</div>
												<Button
													size='sm'
													variant={
														alreadyOwned
															? 'secondary'
															: 'success'
													}
													disabled={alreadyOwned}
													onClick={() =>
														handleAdd(g.id)
													}
												>
													{alreadyOwned
														? 'Owned'
														: 'Add'}
												</Button>
											</div>
										);
									})}
								{filteredCatalog.length === 0 && (
									<div className='list-group-item text-muted'>
										No results. Try a different search or
										add it using the green button above.
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			<AddCustomGameModal
				show={showCustomModal}
				onClose={() => setShowCustomModal(false)}
				onAdded={() => {
					void refresh();
				}}
			/>
		</div>
	);
};

export default GamesView;
