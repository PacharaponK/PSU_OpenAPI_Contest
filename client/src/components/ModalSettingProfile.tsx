"use client";

import ax from "@/conf/ax";
import conf from "@/conf/main";
import { useStudentContext } from "@/contexts/StudentContext";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SettingProfileModal(props: any) {
	const { studentDetail } = useStudentContext();

	useEffect(() => {
		const updateFirstLogin = async () => {
			const findId = await ax.get(
				`${conf.urlPrefix}/users/findByStudentId/${studentDetail?.studentId}`
			);
			console.log(findId);
			if (findId.data) {
				const response = await ax.put(
					`${conf.urlPrefix}/users/${findId.data.id}`,
					{
						firstLogin: false,
					}
				);
			}
		};

		updateFirstLogin();
	}, []);

	return (
		<>
			<Modal
				show={props.openModal}
				size="md"
				onClose={() => props.setOpenModal(false)}
			>
				<Modal.Body>
					<div className="text-center py-5 px-10">
						<svg
							className="w-24 h-24 text-center mx-auto text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
								clip-rule="evenodd"
							/>
						</svg>

						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							คุณเพิ่งเข้าใช้งานยังไม่ได้อัพเดทโปรไฟล์ คุณต้องการอัพเดทโปรไฟล์?
						</h3>
						<div className="flex justify-center gap-4">
							<Link href={"/profile"}>
								<Button color="blue" onClick={() => props.setOpenModal(false)}>
									{"ใช่, ฉันต้องการ"}
								</Button>
							</Link>
							<Button color="gray" onClick={() => props.setOpenModal(false)}>
								ไม่ต้องการ{" "}
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
