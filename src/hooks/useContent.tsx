import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    function refresh(){
        if (contents.length > 0) {
            console.log("🚀 Contents already fetched, skipping API call.");
            return;
        }

        console.log("✅ useContent Hook is running...");
        async function fetchData() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                    }
                });

                
                if (response.data) {
                    setContents(response.data);
                } else {
                    console.error("⚠️ Unexpected API response structure:", response.data);
                }
            } catch (error) {
                console.error("❌ Error fetching content:", error);
            }
        }

        fetchData();
    }


    useEffect(() => {
        refresh();

        let interval= setInterval(()=>{
            refresh();
        },10*1000);


        return ()=>{
            clearInterval(interval);
        }

    }, [contents]); // ✅ Runs only when `contents` changes

    return {contents,refresh};
}
