import { FeedbackTable } from "@/components/FeedbackTable";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { Feedbacks } from "@/modules/feedback";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function FeedbackPage() {
	const [feedback, setFeedback] = useState<Feedbacks>();

	const fetchFeedback = async () => {
		const feedbackResponse = await ax.get(`${conf.urlPrefix}/feedbacks`);
		setFeedback(feedbackResponse.data);
	};

	const deleteFeedback = async (index: number) => {
		const feedbackResponse = await ax.delete(
			`${conf.urlPrefix}/feedbacks/${index}`
		);
		fetchFeedback();
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<div className="h-screen background-image">
			<Head>
				<title>FormHub : การตอบกลับ</title>
			</Head>
			<Navbar />
			<div className="flex h-screen justify-center items-center">
				<div className="flex flex-col justify-start w-3/4 p-5 bg-white rounded-3xl shadow-2xl shadow-[#6ca4ee]">
					<h1 className="text-center text-2xl font-bold  pt-2">การตอบกลับ</h1>
					<div className="flex items-center justify-center pb-5 pt-1">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
								clip-rule="evenodd"
							/>
						</svg>

						<p className="text-gray-500">
							{"กรุณาเเก้ไขปัญหาของการตอบกลับนั้นก่อนกดปุ่ม"}
							<span className="text-green-400">{' "รับทราบ"'}</span>
						</p>
					</div>

					<FeedbackTable feedbacks={feedback} onDelete={deleteFeedback} />
				</div>
			</div>
			<Footer />
		</div>
	);
}
