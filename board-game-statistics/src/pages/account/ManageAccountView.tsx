import DeleteAccountModal from "./DeleteAccountModal";

export default function ManageAccountView() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Manage Account</h2>
            </div>

            <div className="card-body">
              <div className="mb-4">
                <h4>Account Information</h4>
                <div className="row">
                  <div className="col-sm-4 fw-bold">Email:</div>
                  <div className="col-sm-8">user@example.com</div>
                </div>
                <div className="row">
                  <div className="col-sm-4 fw-bold">Username:</div>
                  <div className="col-sm-8">username</div>
                </div>
              </div>

              <div className="mb-4">
                <h4>Edit Profile</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </form>
              </div>

              <div className="mb-4">
                <h4>Change Password</h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-warning">
                    Change Password
                  </button>
                </form>
              </div>

              <div className="border-top pt-4">
                <h4 className="text-danger">Delete Account</h4>
                <div className="alert alert-warning" role="alert">
                  <strong>Warning:</strong> Deleting your account will permanently
                  remove all your data and cannot be undone.
                </div>

                
                <DeleteAccountModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
