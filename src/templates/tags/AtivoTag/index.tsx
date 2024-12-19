import Tag from "../../../components/Tag";

type TagAtivoProps = {
    ativo: boolean;
}

export default function TagAtivo({ ativo }: TagAtivoProps) {
    return (
        <Tag status={ativo ? 'success' : 'error'} >
            <>
                {ativo ? "Ativo" : "Inativo"}
            </>
        </Tag>
    )
}
