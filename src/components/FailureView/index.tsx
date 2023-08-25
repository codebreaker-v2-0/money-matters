import { GiDeathSkull } from "react-icons/gi";

import BtnPrimary from "../../common-components/BtnPrimary";

interface Props {
	fetchData: () => void;
}

const FailureView: React.FC<Props> = ({ fetchData }) => (
	<div className="flex flex-col justify-center items-center gap-4 text-[#505887] h-[80vh]">
		<GiDeathSkull className="text-8xl" />
		<h3 className="text-normal">
			We are having a hard time loading this page.
		</h3>
		<p>Try Again</p>
		<BtnPrimary onClick={fetchData}>Retry</BtnPrimary>
	</div>
);

export default FailureView;
