"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function PreviewModal(props: any) {
    console.log(props.pdfUrl);


    return (
        <>
            <Modal show={props.openModal} size={'7xl'} onClose={() => props.setOpenModal(false)}>
                <Modal.Header>
                    <div className="flex gap-3">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" />
                        </svg>
                        <h1>
                            ตัวอย่างเเบบฟอร์ม
                        </h1>
                    </div>
                </Modal.Header>
                <Modal.Body className="overflow-y-hidden">
                    <iframe className="h-[100vh] w-full" title="pdfViewer" src={props.pdfUrl} frameBorder="0"></iframe>
                </Modal.Body>
            </Modal>
        </>
    );
}