import { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary";
//that how you will define types in ts
export interface ButtonProps {
    variant: Variant;
    size:"md"|"lg";
    text: string;
    startIcon? : LucideIcon ; //hm icon ko type nhi de skte isliye any , but its a bad practice
    endicon? : LucideIcon; // now its not necessary ki hr button me starticon aur endicon dono hi hn , so agr kisi ko optional bnana ho to  ? mark kr do

    //ya phir tum type reactcomponent bhi de skte ho , 
    onClick? : () => void
    fullWidth?: boolean
    loading?:boolean
}


const variantStyle ={
    "primary": "bg-[#e0e7ff] text-[#4a43b6]",
    "secondary": "bg-[#5046e4] text-white"
}
const defaultStyles= " rounded-md m-2 items-center gap-2 items-center font-semibold flex"
const sizeStyle = {
    "sm":"py-1 px-2 ",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}
//buttonprops is the bucket where i will store all the types of the props jo button component me honge
export const Button = ({ variant, size, text, startIcon: StartIcon, onClick,fullWidth,loading }: ButtonProps) => {
    return (
        <button className={`${variantStyle[variant]} ${defaultStyles} ${sizeStyle[size]} text-${size} ${fullWidth?" w-full ":""} cursor-pointer disabled={${{loading}} `} onClick={onClick}>
            {StartIcon && <StartIcon size={15} />} {/* Render icon properly */}
            {text}
            {/* {EndIcon && <EndIcon size={15} />} */}
        </button>
    );
};

{/* <Button variant="primary" size="md" onClick={()=>{}} text={"asd"} startIcon={'+'} /> */}