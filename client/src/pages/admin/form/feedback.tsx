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
					<h1 className="text-center text-2xl font-bold pb-5 pt-2">
						การตอบกลับ
					</h1>
					<FeedbackTable feedbacks={feedback} />
				</div>
			</div>
			<Footer />
		</div>
	);
}
