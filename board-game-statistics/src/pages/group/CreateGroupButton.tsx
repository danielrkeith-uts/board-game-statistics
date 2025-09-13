interface CreateGroupButtonProps {
	onClick: () => void;
	size?: string;
}

const CreateGroupButton = (props: CreateGroupButtonProps) => {
	return (
		<button
			className={`btn btn-${props.size ?? ''} btn-success`}
			onClick={props.onClick}
		>
			Create new group
		</button>
	);
};

export default CreateGroupButton;
