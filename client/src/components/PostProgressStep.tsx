import React from 'react';

interface PostProgressStepProps {
    name: string;
}

function PostProgressStep(props: PostProgressStepProps) {
    return (
        <div className='w-full p-5'>
            <p className="text-xs font-medium text-gray-500">{props.name}</p>
            <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
                <div className="h-2 w-1/3 rounded-full bg-blue-500"></div>
            </div>
        </div>
    );
}

export default PostProgressStep;
