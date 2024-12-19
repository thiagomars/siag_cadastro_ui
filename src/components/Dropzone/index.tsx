import { useEffect, useState } from 'react';
import { DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { Control, useController } from 'react-hook-form';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import useToastLoading from '../../hooks/useToastLoading';
import { postUploadArquivo } from '../../services/arquivo';
import classNames from '../../utils/classNames';

import { FaEye, FaFile, FaFileImage, FaFilePdf, FaFolderOpen, FaTrash } from 'react-icons/fa';
import ScrollArea from '../../components/ScrollArea';
import { Arquivo } from '../../types/arquivo.d';
import Botao from '../Button';
import Modal from '../Modal';
import { FaFileAudio, FaFileVideo, FaFileWord } from 'react-icons/fa6';

type Tipos = "arquivo" | "imagem";

type Props = {
    name: string;
    control: Control<any>;
    anexoNome?: string | null;
    label?: string;
    className?: string;
    defaultPreview?: string;
    multiple?: boolean;
    tipo: Tipos;
    desabilitado?: boolean;
    titulo?: string;
}

export default function MyDropzone(props: Props): JSX.Element {
    const toast = useToastLoading();

    const {
        name,
        control,
        className,
        defaultPreview = "/imagens/picture.png",
        tipo,
        multiple,
        desabilitado,
        titulo,
    } = props;

    const { field: { onChange: onChangeArquivoId } } = useController({ name: name + "Id", control });
    const { field: { value: arquivoValue, onChange: onChangeArquivo } } = useController({ name: name, control });

    const [enviandoArquivos, setEnviandoArquivos] = useState<boolean>(false);
    const [confirmacaoRemover, setConfirmacaoRemover] = useState<boolean>(false);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<Arquivo | null>(null)

    useEffect(() => {
        if (arquivoValue?.length) {
            onChangeArquivoId(arquivoValue?.map((arquivo: Arquivo) => arquivo.id));
            return;
        }

        onChangeArquivoId(arquivoValue?.id);
    }, [arquivoValue]);

    function handleRemoverFoto() {
        if (desabilitado)
            return

        let arquivoValueTemp: Arquivo[] = [];

        if (multiple && arquivoValue?.length > 0)
            arquivoValueTemp = arquivoValue.filter((arquivo: Arquivo) => arquivo.id != arquivoSelecionado?.id);

        onChangeArquivo(arquivoValueTemp?.length > 0 ? arquivoValueTemp : null);
    }

    async function handleChange(file: string | Blob): Promise<Arquivo | null> {
        if (desabilitado)
            return null;

        if (!file) return null;

        toast({ mensagem: "Enviando Arquivo..." });
        const formData: FormData = new FormData()
        formData.append('File', file)
        formData.append('Id', '0')
        formData.append('Descricao', name)

        const response = await postUploadArquivo(formData)
        if (response.sucesso) {
            toast({ tipo: 'dismiss' });
            return response.dados
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: 'error',
            });
        }

        return null;
    }

    const handleVisualizarImagem = () => {
        if (arquivoValue?.dropboxLinkView) {
            window.open(arquivoValue?.dropboxLinkView, '_blank')?.focus();
        }
    }

    const onDrop = async (acceptedFiles: File[], rejectedFiles: FileRejection[]): Promise<void> => {
        if (desabilitado)
            return

        if (rejectedFiles.length > 0) {
            if (!multiple) {
                toast({ tipo: "error", mensagem: 'Apenas um arquivo é permitido!' });
                return
            }

            toast({ tipo: "error", mensagem: 'Formato de Arquivo não permitido' });
            return
        }

        let arquivosAdicionados = [...((arquivoValue?.length && arquivoValue) || [])];

        setEnviandoArquivos(true);
        for (const file of acceptedFiles) {
            const novoArquivo = await handleChange(file)

            if (novoArquivo)
                arquivosAdicionados = [...arquivosAdicionados, novoArquivo];

            onChangeArquivo(multiple ? arquivosAdicionados : novoArquivo);
        }
        setEnviandoArquivos(false);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple, disabled: props.desabilitado } as DropzoneOptions);

    const handleClickRemoveFile = (arquivo: Arquivo) => {
        setArquivoSelecionado(arquivo);
        setConfirmacaoRemover(true);
    }

    function IconTypeArquivo(tipo: string) {
        if (tipo == ".pdf")
            return <FaFilePdf className='w-full h-full bg-red-500 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
        if (tipo == ".docx")
            return <FaFileWord className='w-full h-full bg-blue-700 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
        if ([".jpeg", ".jpg", ".png", ".svg", ".webp"].includes(tipo?.toLowerCase()))
            return <FaFileImage className='w-full h-full bg-blue-500 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
        if ([".mp4", ".mov", ".avi", ".wmv", ".webm", ".flv"].includes(tipo?.toLowerCase()))
            return <FaFileVideo className='w-full h-full bg-orange-500 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
        if ([".mp3", ".aac", ".ogg", ".wma"].includes(tipo?.toLowerCase()))
            return <FaFileAudio className='w-full h-full bg-red-600 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
        
        return <FaFile className='w-full h-full bg-gray-600 rounded-md py-2 text-white group-hover:shadow-md duration-100 transition-all' />
    }

    const FileLabel = ({ arquivo }: { arquivo: Arquivo }): JSX.Element => {

        return (
            <div className='border-[1px] group w-32 h-32 relative bg-white rounded-md px-2 flex flex-col justify-center items-center gap-4 hover:text-primary-600 transition duration-200'>
                <a
                    href={arquivo?.dropboxLinkView}
                    target='_blank'
                    className='z-10 flex flex-col justify-center items-center gap-2 p-2'
                >
                    {/* <span className='aspect-square'><AiFillFile className='w-full h-full'/></span> */}
                    <span className='aspect-square h-14'>
                        {IconTypeArquivo(arquivo?.extensao)}
                    </span>
                    <span className='line-clamp-2 max-h-12'>{arquivo?.nomeArquivo?.substring(0, 10) + arquivo?.extensao}</span>
                </a>

                {!desabilitado && <div className='z-20 hidden w-32 h-32 absolute top-0 group-hover:flex items-center justify-center gap-2 cursor-pointer p-2 bg-gray-400/70 rounded-md'>
                    <div onClick={() => handleClickRemoveFile(arquivo)} className='bg-white group rounded-full shadow-md w-fit h-fit p-3'>
                        <FaTrash className='fill-red-500 group-hover:fill-red-700 w-4 h-4' />
                    </div>
                    {/* <div className=''> */}
                        <a
                            href={arquivo?.dropboxLinkView}
                            target='_blank'
                            className='bg-white rounded-full shadow-md w-fit h-fit p-2 z-20 group'
                        >
                            <FaEye className='fill-gray-500 group-hover:fill-gray-700 w-6 h-6' />
                        </a>
                    {/* </div> */}
                </div>}
            </div>
        )
    }

    return (
        <>
            <div className={classNames('w-full h-full flex flex-col gap-2', enviandoArquivos && "pointer-events-none")}>
                {!desabilitado && <>
                    <div className='w-full text-center'>
                        <p className='font-bold text-lg'>{titulo || "Envio de arquivos"}</p>
                        <span className='text-sm'>Clique ou arraste seu arquivo até aqui!</span>
                    </div>

                    <input {...getInputProps()} type="file" style={{ display: "none" }} />
                    <div
                        {...getRootProps({
                            className: classNames(
                                "w-full h-fit transition relative duration-100",
                                "mt-1 rounded-md text-center cursor-pointer grid grid-cols-1 place-items-center hover:bg-blue-50",
                                className,
                                !arquivoValue && "border-dashed border-4 border-light-blue-500"
                            ),

                        })}>

                        <div className='flex flex-col items-center w-full px-4'>
                            {tipo == "arquivo" || multiple
                                ? <AiOutlineCloudUpload className='w-12 h-12 my-2' />
                                : (
                                    <div className={classNames("flex items-center overflow-hidden", (!!arquivoValue?.dropboxLinkDownload ? 'min-h-36' : 'h-36'))}>
                                        <img
                                            // className="object-contain"
                                            src={arquivoValue?.dropboxLinkDownload || defaultPreview}
                                            alt={name}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                let linkCorrigido = arquivoValue?.dropboxLinkDownload?.replace("?dl=1", "&dl=1");

                                                if (currentTarget.src == linkCorrigido)
                                                    currentTarget.src = defaultPreview;
                                                else
                                                    currentTarget.src = linkCorrigido;
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </>}

                {(!!arquivoValue && (multiple || tipo == "arquivo")) && (
                    <ScrollArea className='max-h-56' paddingX='px-0'>
                        <div className='flex flex-row flex-wrap items-start gap-2 p-2 shadow-inner bg-gray-200 rounded-md'>
                            {arquivoValue?.length > 0
                                ? arquivoValue?.map((arquivo: Arquivo, index: number) => (<FileLabel key={index} arquivo={arquivo} />))
                                : <FileLabel arquivo={arquivoValue} />
                            }
                        </div>
                    </ScrollArea>
                ) || desabilitado && !arquivoValue &&
                    <div className='flex justify-center items-center flex-col text-center w-full bg-gray-100 shadow-inner p-4 rounded-md'>
                        <FaFolderOpen className='fill-gray-300 w-10 h-10'/>
                        <p className='font-medium text-gray-600'>Nenhum arquivo para exibir</p>
                    </div>
                }

                {(arquivoValue && !multiple && tipo == "imagem") && (
                    <div className='w-fit mx-auto flex flex-row justify-items-stretch gap-2'>
                        {!desabilitado && <Botao
                            texto={"Remover"}
                            tipo='padrao'
                            onClick={() => setConfirmacaoRemover(true)}
                        />}

                        <Botao
                            texto={"Visualizar"}
                            tipo='sucesso'
                            onClick={handleVisualizarImagem}
                        />
                    </div>
                )}
            </div>

            <Modal
                open={confirmacaoRemover}
                setOpen={setConfirmacaoRemover}
            >
                <Modal.Titulo texto={`Remover ${tipo == "imagem" ? "Imagem" : "Arquivo"}`} />
                <Modal.Descricao
                    texto={`Deseja realmente remover ${tipo == "imagem" && !multiple
                        ? "a Imagem"
                        : `o Arquivo ${(arquivoSelecionado?.nomeArquivo || "") + arquivoSelecionado?.extensao}`}?`
                    }
                />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Remover" acao={handleRemoverFoto} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>
        </>
    )
}