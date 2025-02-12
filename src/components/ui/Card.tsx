import { Share, Share2, Trash2 } from "lucide-react";

interface CardProps{
    title:string,
    link:string,
    type: "twitter" | "youtube" |"article";
    contentId:string;
    onDelete: (id:string)=>void;
}
export function Card({title,link,type , contentId,onDelete}:CardProps){
    return (
        <div className="bg-white rounded-md border border-gray-300 outline-slate-100 outline shadow-md   p-4 m-8 font-semibold border-gray-200 max-w-72 min-h-48 md:max-w-85">

            <div className="flex justify-between items-center">
                <div className="flex items-center text-black-500">
                    <div className="pr-3 text-gray-500">
                        <Share size={18}/>
                    </div>
                    {title}
                </div>
                <div className="flex">
                    <div className="pr-3 text-gray-500">
                    <Share2 size={18}/>
                    </div>
                    <button 
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => onDelete(contentId)} // Call delete function
                    >
                        <Trash2 size={18} />
                    </button>

                </div>
            </div>
                    <div className="mt-4">
                        {type==="youtube" &&  <iframe className="w-full rounded-md" src={link.replace('watch','embed').replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

                        <div className="max-w-md mx-auto">
  <blockquote className="twitter-tweet">
    <a href={link.replace("x.com", "twitter.com")}></a>
  </blockquote>
</div>



                   
                    
                    </div>
        </div>
    )
}

