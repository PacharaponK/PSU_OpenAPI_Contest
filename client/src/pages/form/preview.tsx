import conf from "@/conf/main";
import axios from "axios";
import { Button } from "flowbite-react";
import React from "react";

function preview() {
	const dataSend = async () => {
		for (let i = 30; i < 45; i++) {
			const res = await axios.put(`${conf.urlPrefix}/forms/${i}`, {});
			console.log(res.data);
		}
	};

	return (
		<div className="h-screen">
			<Button
				className="bg-slate-600"
				type="button"
				onClick={() => dataSend()}
			></Button>
		</div>
	);
}

export default preview;
