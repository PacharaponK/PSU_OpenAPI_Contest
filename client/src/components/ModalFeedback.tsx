"use client";

import { Modal } from "flowbite-react";
import DropdownPF from "./DropdownPF";
import { useState } from "react";

export default function ModalFB(props: any) {
	const [handleFeedbackChange, setHandleFeedbackChange] = useState<string>();

	return (
		<>
			<Modal
				show={props.openModal}
				size={"xl"}
				onClose={() => props.setOpenModal(false)}
			>
				<Modal.Header>
					<h1>แจ้งปัญหา</h1>
				</Modal.Header>
				<Modal.Body className="p-8">
					<h1>ระบุปัญหา :</h1>
					<div className="flex flex-col w-full">
						<textarea
							onChange={(event) => setHandleFeedbackChange(event.target.value)}
							className="w-full h-[30vh] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={() => props.onSubmit(handleFeedbackChange)}
							className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							ส่ง
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
