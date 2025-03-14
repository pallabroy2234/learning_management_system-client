import {FC, useEffect, useState} from "react";
import axios from "axios";
import {baseURL} from "../../../../store/features/api.ts";
import {FaRegCircleDown} from "react-icons/fa6";
import {FaRedo} from "react-icons/fa";

interface Props {
	videoUrl: string;
	title: string;
}

// P3bPCKfUbIgFkipJzcxWQfFyr7EIkLkVi3c4w4BTeFCARNuOrmdW4ybnhTZ3Tn6R

const VideoPlayer: FC<Props> = ({videoUrl}) => {
	const [videoData, setVideoData] = useState({
		otp: "",
		playBackInfo: "",
	});

	useEffect(() => {
		axios
			.post(`${baseURL}/course/getVdoCipherOTP`, {
				videoId: videoUrl,
			})
			.then((res) => {
				setVideoData({
					otp: res.data.payload.otp,
					playBackInfo: res.data.payload.playbackInfo,
				});
			})
	}, [videoUrl]);

	const playerId = import.meta.env.VITE_VIDOCHIPER_PLAYER_ID

	return (
		<div>
			{(videoData.otp && videoData.playBackInfo ) ?  (
				<div style={{ paddingTop: '53%', position: 'relative' }}>
					<iframe
						src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playBackInfo}&player=${playerId}`}
						style={{
							border: '0',
							maxWidth: '100%',
							position: 'absolute',
							top: '0',
							left: '0',
							height: '100%',
							width: '100%',
						}}
						allowFullScreen={true}
						allow='encrypted-media'
					></iframe>
				</div>
			) : (
				<div className="flex items-center justify-center 600px:h-[400px] h-[200px] rounded-xl bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed dark:border-slate-500 dark:bg-slate-700">
					<div className="text-center space-y-4">
						<div className="inline-flex bg-red-400/20  p-4 rounded-full">
							<FaRegCircleDown className="w-10 h-10 text-red-500 dark:text-red-400" />
						</div>
						<div className="space-y-1">
							<h3 className="500px:text-lg text-base font-medium text-gray-800 dark:text-gray-200">
								Video Unavailable
							</h3>
							<p className="500px:text-sm text-[13px] text-gray-600 dark:text-gray-400 max-w-xs">
								{videoUrl
									? "The video URL is invalid or restricted."
									: "No video URL provided."}
							</p>
						</div>
						{videoUrl && (
							<button
								onClick={() => window.location.reload()}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
							>
								<FaRedo className="w-4 h-4 mr-2" />
								Retry
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default VideoPlayer;
