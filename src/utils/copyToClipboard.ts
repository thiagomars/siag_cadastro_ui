import { toast } from "react-toastify";

export default function copyToClipboard(texto: string) {
    navigator.clipboard.writeText(texto);
    toast.success("Copiado para a área de transferência!");
}