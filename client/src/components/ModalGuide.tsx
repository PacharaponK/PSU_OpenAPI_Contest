"use client";

import { Modal } from "flowbite-react";
import { useState } from "react";

export default function ModalGuide(props: any) {
	return (
		<>
			<Modal
				show={props.openModal}
				size={"xl"}
				onClose={() => props.setOpenModal(false)}
			>
				<Modal.Header>
					<div className="flex space-x-2 items-center">
						<svg
							className="w-6 h-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
						</svg>
						<h1>คู่มือ{props.type}</h1>
					</div>
				</Modal.Header>
				<Modal.Body className="p-8">
					{props.type == "การแนบลิงค์รูปภาพ" ? (
						<div className="space-y-5">
							<p>
								กรณีที่ท่านต้องการแนบรูปภาพหลายๆรูป{" "}
								<p className="font-medium text-md">
									ท่านสามารถใช้เครื่องหมาย & ระหว่างรูปได้
									<span className="font-normal text-base">
										{" "}
										ดังตัวอย่างด้านล่าง
									</span>
								</p>{" "}
							</p>
							<textarea
								id="message"
								rows={6}
								value={
									'https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-01-1920x1280.jpg&https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-02-1920x1920.jpg&https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-03-1920x1920.jpg"'
								}
								className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							></textarea>
							<div className="text-xs text-gray-600">
								<p className="text-base text-gray-900">
									ระบบจะทำแยกรูปภาพให้เป็น
								</p>
								<p>
									https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-01-1920x1280.jpg
								</p>
								<p>
									https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-02-1920x1920.jpg
								</p>
								<p>
									https://reg.psu.ac.th/main/wp-content/uploads/2023/05/REG_givecard-03-1920x1920.jpg
								</p>
							</div>
						</div>
					) : (
						<div className="space-y-5">
							<p>
								กรณีที่ท่านต้องการเขียนรายละเอียดหลายๆข้อ{" "}
								<p className="font-medium text-md">
									ท่านสามารถใช้เครื่องหมาย & ระหว่างข้อความได้
									<span className="font-normal text-base">
										{" "}
										ดังตัวอย่างด้านล่าง
									</span>
								</p>{" "}
							</p>
							<textarea
								id="message"
								rows={3}
								value={
									"ใช้ในกรณีพิเศษ ที่นอกเหนือจากคำร้องที่มีอยู่แล้ว&รับแบบฟอร์มคำร้องทั่วไป จากตู้แบบฟอร์มฝ่ายทะเบียนและประมวลผล&รับแบบฟอร์มคำร้องทั่วไป จากตู้แบบฟอร์มฝ่ายทะเบียนและประมวลผล"
								}
								className="block p-2.5 w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							></textarea>
							<div className="text-xs text-gray-600">
								<p className="text-base text-gray-900">
									ระบบจะทำการแบ่งข้อความให้เป็น
								</p>
								<p>1. ใช้ในกรณีพิเศษ ที่นอกเหนือจากคำร้องที่มีอยู่แล้ว</p>
								<p>
									2. รับแบบฟอร์มคำร้องทั่วไป
									จากตู้แบบฟอร์มฝ่ายทะเบียนและประมวลผล
								</p>
								<p>3.กรอกรายละเอียดให้ครบถ้วน ชัดเจนและถูกต้อง</p>
							</div>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}
