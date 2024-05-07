"use client";

import { Feedbacks } from "@/modules/feedback";
import { Table } from "flowbite-react";

interface TableProps {
    feedbacks?: Feedbacks
}

export function FeedbackTable(props: TableProps) {
    console.log(props.feedbacks);

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head className="text-xl">
                    <Table.HeadCell>ไอดี</Table.HeadCell>
                    <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
                    <Table.HeadCell>ปัญหา</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>ชื่อฟอร์ม</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {props.feedbacks?.map((feedback) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={feedback.id}>
                            <Table.Cell>{feedback.id}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {feedback.user.studentId}
                            </Table.Cell>
                            <Table.Cell>{feedback.text}</Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    รายละเอียด
                                </a>
                            </Table.Cell>
                            <Table.Cell>{feedback.form != null ? feedback.form.name : "ไม่ระบุ"}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}