import { Status } from "../../types/tags.d";
import classNames from "../../utils/classNames";

type Props = {
    children: React.ReactNode
    status?: Status;
    cor?: string;
    display?: string;
    className?: string;
}

export default function Tag(props: Props) {
    const {
        children,
        status,
        cor,
        display = "inline-flex",
        className
    } = props;

    let corFundo = ""; 
    let corTexto = "";

    if (status == 'error') {
        corFundo = "bg-red-100";
        corTexto = "text-red-800"; 
    }

    if (status == 'success') {
        corFundo = "bg-green-100";
        corTexto = "text-green-800";
    }

    if (status == 'alert') {
        corFundo = "bg-yellow-200/90";
        corTexto = "text-yellow-800";
    }
    
    if (status == 'info') { 
        corFundo = "bg-indigo-400/30";
        corTexto = "text-indigo-800";
    }
    
    if (status == 'default') {
        corFundo = "bg-gray-200/90";
        corTexto = "text-gray-800";
    }
    
    if (status == 'destaque') {
        corFundo = "bg-blue-200";
        corTexto = "text-blue-800";
    }
    
    if (status == 'modifed') {
        corFundo = "bg-purple-200/90";
        corTexto = "text-purple-800";
    }

    if (status == 'pink') {
        corFundo = "bg-pink-100";
        corTexto = "text-pink-800";
    }
    
    if (status == 'outro') {
        corFundo = "";
        corTexto = "";
    }

    return (
        <span className={classNames("px-2 text-xs leading-5 shadow w-fit font-semibold rounded", className, display, !cor && corFundo, corTexto)} style={{backgroundColor: cor}}>
            {children}
        </span>
    )
}
