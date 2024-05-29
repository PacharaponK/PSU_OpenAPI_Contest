"use client";

import { Modal } from "flowbite-react";
import DropdownPF from "./DropdownPF";
import { useState } from "react";
import Image from "next/image";

export default function ModalPdfGuide(props: any) {
	return (
		<>
			<Modal
				show={props.openModal}
				size={"3xl"}
				onClose={() => props.setOpenModal(false)}
			>
				<Modal.Header>
					<h1>คู่มือการตั้งค่า</h1>
				</Modal.Header>
				<Modal.Body className="p-8">
					<div className="h-full flex justify-center">
						<img
							src="/pdf-guide.png"
							className="h-1/2 w-auto"
							alt="pdf-guide"
						></img>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
