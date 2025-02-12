import { X } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
    YouTube = "youtube",
    Twitter = "twitter",
    Article="article"
}

export function CreateContentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const [type, setType] = useState(ContentType.YouTube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,
            {
                title,
                link,
                type
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        );
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Create Content</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <Input ref={titleRef} placeholder="Enter Title" className="w-full" />
                    <Input ref={linkRef} placeholder="Enter Link" className="w-full" />
                </div>

                {/* Type Selection */}
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700">Select Type</h3>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => setType(ContentType.YouTube)}
                            className={`flex-1 py-2 rounded-lg transition ${
                                type === ContentType.YouTube ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            YouTube
                        </button>
                        <button
                            onClick={() => setType(ContentType.Twitter)}
                            className={`flex-1 py-2 rounded-lg transition ${
                                type === ContentType.Twitter ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Twitter
                        </button>
                        <button 
                            onClick={() => setType(ContentType.Article)}
                            className={`flex-1 py-2 rounded-lg transition ${
                                type === ContentType.Article ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Article
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <Button variant="primary" text="Submit" size="md" onClick={addContent} />
                </div>
            </div>
        </div>
    );
}
