"use client";

import { Modal } from "flowbite-react";
import DropdownPF from "./DropdownPF";

export default function ModalPF(props: any) {
    return (
        <>
            <Modal show={props.openModal} size={'xl'} onClose={() => props.setOpenModal(false)}>
                <Modal.Header>
                    <h1>แก้ไข{props.option}</h1>
                </Modal.Header>
                <Modal.Body className="p-8">
                    <div className="flex justify-center items-center">
                        <DropdownPF type={props.option} studentId={props.studentId}/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}