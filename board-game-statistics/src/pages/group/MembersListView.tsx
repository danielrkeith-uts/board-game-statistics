import InviteMemberView from "./InviteMemberView.tsx";

const MembersListView = () => {
    return(
        <div>
            <div>
                <table className={'table'}>
                    <thead>
                        <tr><th>Group Member</th></tr>
                    </thead>
                    <tbody>
                        <tr>Brian Johnson</tr>
                        <tr>Ashley Smith</tr>
                        <tr>Xuan Wu</tr>
                        <tr>Thor Odinson</tr>
                    </tbody>
                </table>
            </div>
            <div>
                <InviteMemberView/>
            </div>
        </div>
    )
}

export default MembersListView