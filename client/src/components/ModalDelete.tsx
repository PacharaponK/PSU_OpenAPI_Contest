"use client";

import { Button, Modal } from "flowbite-react";
import DropdownPF from "./DropdownPF";

export default function ModalPF(props: any) {
  return (
    <>
      <Modal
        show={props.openModal}
        size={"sm"}
        onClose={() => props.setOpenModal(false)}
      >
        <Modal.Header>
          <h1>ยืนยันการลบ</h1>
        </Modal.Header>
        <Modal.Body className="p-8">
          <div className="flex justify-center items-center">
            <p>คุณแน่ใจหรือไม่ว่าต้องการลบฟอร์มนี้?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => props.setOpenModal(false)}
            className="mt-4 px-4 py-2  bg-white border rounded-md shadow-sm border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100   dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => props.onSubmit()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ลบฟอร์ม
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
