import {FC} from "react";
import {Box, Modal} from "@mui/material";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: any;
	component: any;
	setRoute?: (route: string) => void;
}

const CustomModal: FC<Props> = ({open, setOpen, setRoute, component: Component}) => {


	return (
		<Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Box className="absolute left-[50%] 800px:top-[40%] top-[30%] translate-x-[-50%] translate-y-[-50%] w-[300px] 320px:w-[300px] 400px:w-[350px] 500px:w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
				<Component setRoute={setRoute} setOpen={setOpen} />
			</Box>
		</Modal>
	);
};
export default CustomModal;
