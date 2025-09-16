import { useContext, useState } from 'react';
import { AccountContext } from '../../context/AccountContext';
import {
	apiUpdateAccount,
	apiChangePassword,
	apiLogin,
} from '../../utils/api/account-api-utils';
import DeleteAccountModal from './DeleteAccountModal';
import UpdateProfileModal from './UpdateProfileModal';

export default function ManageAccountView() {
	const account = useContext(AccountContext);
	const [isEditing, setIsEditing] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [updatingProfile, setUpdatingProfile] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [pendingProfile, setPendingProfile] = useState<{
		firstName: string;
		lastName: string;
		email: string;
	} | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);

	// Email validation function
	const validateEmail = (email: string): string | null => {
		if (!email.trim()) {
			return 'Email is required';
		}

		// Basic email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return 'Please enter a valid email address';
		}

		if (
			email.includes('..') ||
			email.startsWith('.') ||
			email.endsWith('.')
		) {
			return 'Email address format is invalid';
		}

		// Check for consecutive dots in domain
		if (email.split('@')[1]?.includes('..')) {
			return 'Email address format is invalid';
		}

		return null;
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const email = e.target.value;
		const error = validateEmail(email);
		setEmailError(error);
	};

	const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setEmailError(null);

		const formData = new FormData(e.currentTarget);
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;

		// Validate email before proceeding
		const emailValidationError = validateEmail(email);
		if (emailValidationError) {
			setEmailError(emailValidationError);
			return;
		}

		setPendingProfile({ firstName, lastName, email });
		setShowUpdateModal(true);
	};

	const confirmUpdate = async (password: string) => {
		if (!pendingProfile) {
			return;
		}
		setUpdatingProfile(true);
		try {
			const originalEmail = account?.email ?? '';
			const newEmail = pendingProfile.email;

			const passwordValid = await apiLogin(originalEmail, password);
			if (!passwordValid) {
				setError('Incorrect password. Please try again.');
				setUpdatingProfile(false);
				return;
			}

			const updated = await apiUpdateAccount(
				pendingProfile.firstName,
				pendingProfile.lastName,
				newEmail
			);
			if (!updated) {
				setError('Failed to update profile. Please try again.');
				setUpdatingProfile(false);
				return;
			}

			if (newEmail && newEmail !== originalEmail) {
				const loggedIn = await apiLogin(newEmail, password);
				if (!loggedIn) {
					setError(
						'Profile updated, but re-login failed. Please log in with your new email.'
					);
					setUpdatingProfile(false);
					return;
				}
			}

			setSuccess('Profile updated successfully!');
			setIsEditing(false);
			setShowUpdateModal(false);
			setPendingProfile(null);
			window.location.reload();
		} catch (err) {
			setError('Failed to update profile. Please try again.');
			setUpdatingProfile(false);
		}
	};

	const cancelUpdate = () => {
		setShowUpdateModal(false);
		setPendingProfile(null);
		setError(null);
	};

	const clearError = () => {
		setError(null);
	};

	const resetUpdating = () => {
		setUpdatingProfile(false);
	};

	const handleChangePassword = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const formData = new FormData(e.currentTarget);
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (newPassword !== confirmPassword) {
			setError('New passwords do not match');
			return;
		}

		if (newPassword === currentPassword) {
			setError('New password must be different from current password');
			return;
		}

		if (newPassword.length < 8) {
			setError('New password must be at least 8 characters long');
			return;
		}
		const hasLetter = /[A-Za-z]/.test(newPassword);
		const hasNumber = /\d/.test(newPassword);
		const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
		if (!hasLetter) {
			setError('New password must include at least one letter');
			return;
		}
		if (!hasNumber) {
			setError('New password must include at least one number');
			return;
		}
		if (!hasSpecial) {
			setError(
				'New password must include at least one special character'
			);
			return;
		}

		try {
			const success = await apiChangePassword(
				currentPassword,
				newPassword
			);
			if (success) {
				setSuccess('Password changed successfully!');
				setIsChangingPassword(false);
				if (e.currentTarget) {
					e.currentTarget.reset();
				}
			} else {
				setError(
					'Failed to change password. Please check your current password.'
				);
			}
		} catch (err) {
			setError('Failed to change password. Please try again.');
		}
	};

	const handleDeleteSuccess = () => {
		setSuccess('Account deleted successfully');
	};
	const [showDelete, setShowDelete] = useState(false);

	return (
		<div className='container mt-4'>
			<div className='row justify-content-center'>
				<div className='col-md-8 col-lg-6'>
					<div className='card shadow'>
						<div className='card-header bg-primary text-white'>
							<h2 className='mb-0'>Manage Account</h2>
						</div>

						<div className='card-body'>
							{error && (
								<div
									className='alert alert-danger'
									role='alert'
								>
									{error}
								</div>
							)}
							{success && (
								<div
									className='alert alert-success'
									role='alert'
								>
									{success}
								</div>
							)}
							<div className='mb-4'>
								<h4>Account Information</h4>
								<div className='row'>
									<div className='col-sm-4 fw-bold'>
										Email:
									</div>
									<div className='col-sm-8'>
										{account?.email || 'Not available'}
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4 fw-bold'>
										First Name:
									</div>
									<div className='col-sm-8'>
										{account?.firstName || 'Not available'}
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-4 fw-bold'>
										Last Name:
									</div>
									<div className='col-sm-8'>
										{account?.lastName || 'Not available'}
									</div>
								</div>
							</div>

							<div className='mb-4'>
								<div className='d-flex justify-content-between align-items-center mb-3'>
									<h4>Edit Profile</h4>
									<button
										type='button'
										className='btn btn-outline-primary btn-sm'
										onClick={() => {
											setIsEditing(!isEditing);
											if (!isEditing) {
												setEmailError(null);
											}
										}}
									>
										{isEditing ? 'Cancel' : 'Edit'}
									</button>
								</div>

								{isEditing && (
									<form onSubmit={handleUpdateProfile}>
										<div className='mb-3'>
											<label className='form-label'>
												First Name
											</label>
											<input
												type='text'
												className='form-control'
												id='firstName'
												name='firstName'
												placeholder='Enter First Name'
												defaultValue={
													account?.firstName || ''
												}
												required
											/>
										</div>
										<div className='mb-3'>
											<label className='form-label'>
												Last Name
											</label>
											<input
												type='text'
												className='form-control'
												id='lastName'
												name='lastName'
												placeholder='Enter Last Name'
												defaultValue={
													account?.lastName || ''
												}
												required
											/>
										</div>
										<div className='mb-3'>
											<label className='form-label'>
												Email
											</label>
											<input
												type='email'
												className={`form-control ${emailError ? 'is-invalid' : ''}`}
												id='email'
												name='email'
												placeholder='Enter Email'
												defaultValue={
													account?.email || ''
												}
												onChange={handleEmailChange}
												required
											/>
											{emailError && (
												<div className='invalid-feedback'>
													{emailError}
												</div>
											)}
										</div>
										<button
											type='submit'
											className='btn btn-primary'
											disabled={
												updatingProfile || !!emailError
											}
										>
											{updatingProfile
												? 'Updating...'
												: 'Update Profile'}
										</button>
									</form>
								)}
							</div>

							<div className='mb-4'>
								<div className='d-flex justify-content-between align-items-center mb-3'>
									<h4>Change Password</h4>
									<button
										type='button'
										className='btn btn-outline-warning btn-sm'
										onClick={() =>
											setIsChangingPassword(
												!isChangingPassword
											)
										}
									>
										{isChangingPassword
											? 'Cancel'
											: 'Change Password'}
									</button>
								</div>

								{isChangingPassword && (
									<form onSubmit={handleChangePassword}>
										<div className='mb-3'>
											<label
												htmlFor='currentPassword'
												className='form-label'
											>
												Current Password
											</label>
											<input
												type='password'
												className='form-control'
												id='currentPassword'
												name='currentPassword'
												required
											/>
										</div>
										<div className='mb-3'>
											<label
												htmlFor='newPassword'
												className='form-label'
											>
												New Password
											</label>
											<input
												type='password'
												className='form-control'
												id='newPassword'
												name='newPassword'
												required
											/>
										</div>
										<div className='mb-3'>
											<label
												htmlFor='confirmPassword'
												className='form-label'
											>
												Confirm New Password
											</label>
											<input
												type='password'
												className='form-control'
												id='confirmPassword'
												name='confirmPassword'
												required
											/>
										</div>
										<button
											type='submit'
											className='btn btn-warning'
										>
											Change Password
										</button>
									</form>
								)}
							</div>

							<div className='border-top pt-4'>
								<h4 className='text-danger'>Delete Account</h4>
								<div
									className='alert alert-warning'
									role='alert'
								>
									<strong>Warning:</strong> Deleting your
									account will permanently remove all your
									data and cannot be undone.
								</div>
								<button
									className='btn btn-danger'
									onClick={() => setShowDelete(true)}
								>
									DELETE ACCOUNT
								</button>
								<DeleteAccountModal
									show={showDelete}
									onClose={() => setShowDelete(false)}
									onDeleteSuccess={handleDeleteSuccess}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UpdateProfileModal
				show={showUpdateModal}
				onClose={cancelUpdate}
				onConfirm={confirmUpdate}
				error={error}
				isUpdating={updatingProfile}
				onClearError={clearError}
				onResetUpdating={resetUpdating}
			/>
		</div>
	);
}
