"use client";

import { Modal } from "flowbite-react";

export default function PreviewModal(props: any) {
    return (
        <>
            <Modal show={props.openModal} size={'7xl'} onClose={() => props.setOpenModal(false)}>
                <Modal.Body className="overflow-y-hidden p-1">
                    <div onClick={() => props.setOpenModal(false)} className="rounded-xl flex justify-end">
                        <svg
                            className="p-1 mb-1 w-6 h-6 text-gray-800 dark:text-white hover:text-white hover:bg-red-500 rounded-full"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"
                            />
                        </svg>
                    </div>
                    <iframe onClick={() => console.log('sdsadsadad')
                    } className="h-[90vh] w-full" title="pdfViewer" src={props.pdfUrl} frameBorder="0"></iframe>
                </Modal.Body>
            </Modal>
        </>
    );
}