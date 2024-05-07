import React, { useContext } from "react";
import { DetailedContext, DataContext } from "../App";
import { ReactComponent as CloseSVG } from "../SVGs/close.svg";

function DetailsView(props) {
	const { setIsDetailedView } = useContext(DetailedContext);
	const { data } = useContext(DataContext);
	
	function handleDonate(e) {
		e.preventDefault();
		setIsDetailedView(false);
		if(props.isLoggedin === true) {
        	props.setPage("donationForm");
		}
		else {
			props.setPage("login");
		}
    }

	return (
		<div className="h-screen w-screen fixed top-0 z-10 bg-farahgray-900 bg-opacity-50 grid items-center justify-center">
			<div className="flex flex-col bg-farahgray-100 w-[600px] h-max rounded-md p-6 relative">
				{/*Top segment*/}
				<div className="flex">
					{/*Image*/}
					<div className="flex items-start justify-center w-40">
						{data.imgURL && <img src={data.imgURL} alt="Donation" className="w-full object-cover rounded-md aspect-square"/>}
					</div>

					{/*Text*/}
					<div className="w-2/3">
						<div className="flex flex-col items-left w-full mx-6 gap-1">
							<h2 className="text-xl font-semibold max-w-[330px] w-full">{data.title}</h2>
							<h2 className="text-l font-semibold text-farahgray-400">
								{data.subtitle}
							</h2>
							<p className="text-sm text-farahgray-700">25/04/2024, 6:30pm</p>
							<p className="text-sm">
								{data.description}
							</p>
						</div>
					</div>

					{/*Close Button*/}
					<button
						className="absolute top-0 right-0 m-6"
					>
						<CloseSVG
							className="h-5 w-5 cursor-pointer text-farahgray-600"
							onClick={() => setIsDetailedView(false)}
						/>
					</button>
				</div>

				{/*Bottom segment*/}
				<div className="flex flex-col">
					<hr className="h-px bg-farahgray-400 border-0 my-8" />

					{/*Information segment*/}
					<div className="grid grid-cols-3 w-full">
						{/*Tags column 1*/}
						
						
						<div className="grid grid-rows-3 grid-cols-2 gap-2 col-span-2 grid-flow-row">
							{Object.entries(data.tags).map(([tag, value], index) => (
								tag !== "" && value !== "" && (
								<div key={index}>
									<h2 className="text-m font-semibold">{tag}</h2>
									<h2 className="text-sm font-semibold text-farahgray-400">
									{value}
									</h2>
								</div>
								)
							))}
						</div>

						{/*Progress bar*/}
						<div className="flex flex-col items-center gap-2">
							<h2 className="text-m font-semibold">Progress</h2>
							<div className="relative w-40 h-40">
								<svg className="w-full h-full" viewBox="0 0 100 100">
									<circle
										className="text-farahgreen-300 stroke-current"
										strokeWidth="10"
										cx="50"
										cy="50"
										r="40"
										fill="white"
									></circle>
									<circle
										className="text-farahgreen-700  transition: stroke-dashoffset 0.35s  transform: rotate(-90deg) transform-origin: 50% 50% stroke-current"
										strokeWidth="10"
										cx="50"
										cy="50"
										r="40"
										fill="transparent"
										transform="rotate(-90, 50, 50)"
										strokeDasharray="251.2"
										strokeDashoffset="calc(251.2 - (251.2 * 70) / 100)"
									></circle>
									{/* 2*pi*40 = 251.2, change this value if change radius
										Change 70 to the percentage of progress
									*/}
									<text
										x="50"
										y="50"
										fontSize="sm"
										fontWeight="bold"
										textAnchor="middle"
										alignmentBaseline="middle"
									>
										70%
									</text>
								</svg>
							</div>
						</div>
					</div>

					<div className="flex flex-col align-middle items-center gap-2">
						<button className="text-sm italic border-2 border-farahgreen-600 text-farahgreen-600 px-4 py-1 rounded-xl font-semibold"
						onClick={handleDonate}>
							Donate {">"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default DetailsView;
