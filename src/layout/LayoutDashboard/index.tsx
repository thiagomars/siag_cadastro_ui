import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import classNames from '../../utils/classNames';

import * as Avatar from '@radix-ui/react-avatar';

import {
    RxHamburgerMenu,
} from 'react-icons/rx';

import ScrollArea from '../../components/ScrollArea';

// import { autenticacao, getUsuarioLogado, login } from "../../services/auth";
// import { getItensMenu } from '../../services/menu';

import Loading from '../../components/Loading';
// import Modal from '../../components/Modal';
// import useDebounce from '../../hooks/useDebounce';
// import { getLogo } from '../../services/configuracao';
// import LoginForm from '../../templates/forms/LoginForm';
// import { Arquivo } from '../../types/arquivo.d';
// import { ItemMenu, ItemMenuGrupo } from '../../types/menu.d';
// import { usuarioListagem } from '../../types/usuario.d';
// import MenuItem from './MenuItem';
// import LoadingPage from '../../components/LoadingPage';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FaAngleDown } from 'react-icons/fa6';
// import useToastLoading from '../../hooks/useToastLoading';
import ModalAlterarSenha from './ModalAlterarSenha';
import MenuItem from './MenuItem';
import { ItemMenu } from '../../types/menu.d';

// function useQuery() {
//     const { search } = useLocation();

//     return React.useMemo(() => new URLSearchParams(search), [search]);
// }

export default function LayoutDashboard(): JSX.Element {
    // const location = useLocation();
    let navigate = useNavigate();
    // const query = useQuery();

    // const toast = useToastLoading();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [carregandoDadosEtapa, setCarregandoDadosEtapa] = useState<boolean>(false);

    const [fotoUrl] = useState<string | null>(null)
    // const [usuario, setUsuario] = useState<usuarioListagem | null>(null)
    // const [menu, setMenu] = useState<Array<ItemMenuGrupo>>([])
    // const [menuPesquisa, setMenuPesquisa] = useState<Array<ItemMenuGrupo>>([])
    const [itensMenu, setItensMenu] = useState<Array<ItemMenu>>([])
    // const [filtroPesquisa] = useState<string>("")
    const [menuAberto, setMenuAberto] = useState<boolean | null>(true);
    // const [modalRenovarLogin, setModalRenovarLogin] = useState<boolean>(false);
    const [modalAlterarSenha, setModalAlterarSenha] = useState<boolean>(false);
    // const [logo, setLogo] = useState<Arquivo | null>(null);

    // async function carregarItensMenu(): Promise<void> {
    //     let caminho = location.pathname.split("/")[1]

    //     const menuAtual = caminho;
    //     const response = await getItensMenu(menuAtual)

    //     if (response.sucesso) {
    //         setMenu(response.dados.menu)

    //         let menuPesquisa = response.dados.menuPesquisa;

    //         menuPesquisa[0].menus = menuPesquisa[0].menus?.map((item: ItemMenu) => {
    //             return {
    //                 ...item,
    //                 descricao: item.caminho + " > " + item.descricao
    //             }
    //         })

    //         setMenuPesquisa(menuPesquisa)
    //     }
    // }

    // async function verificaHomeTipoUsuario() {
    //     const response = await getUsuarioLogado();

    //     if (response.sucesso) {
    //         if (location.pathname == "/") {
    //             response.dados?.tipo == "ADMINISTRADOR"
    //                 ? navigate("/home")
    //                 : navigate("/financiamento");
    //         }
    //     } else {
    //         toast({ tipo: response.tipo, mensagem: response.mensagem })
    //     }
    // }

    // async function carregaUsuario(): Promise<void> {
    //     const response = await getUsuarioLogado()

    //     if (response.sucesso) {
    //         setUsuario(response.dados)
    //     }
    // }

    // const carregarItensDebounce = useDebounce(() => {
    //     verificaToken();
    //     carregaUsuario();
    //     carregarItensMenu();
    // }, 500);

    // useEffect(() => {
    //     if (menuAberto == null) setMenuAberto(localStorage.getItem("menuAberto") == "true");

    //     carregarItensDebounce();
    //     carregaLogo();
    //     verificaHomeTipoUsuario();
    // }, [location])

    useEffect(() => {
        localStorage.setItem("menuAberto", JSON.stringify(menuAberto));
    }, [menuAberto])

    // menu temporário
    useEffect(() => {
        setItensMenu([
            {
                ativo: true,
                caminho: "/uf",
                descricao: "UF",
                icone: "FaHome",
                link: "/uf",
                possuiAcesso: true,
                submenus: null,
                idAlerta: ""
            },
            {
                ativo: true,
                caminho: "/pallet",
                descricao: "Pallet",
                icone: "FaHome",
                link: "/pallet",
                possuiAcesso: true,
                submenus: null,
                idAlerta: ""
            },
            {
                ativo: true,
                caminho: "/deposito",
                descricao: "Depósito",
                icone: "FaHome",
                link: "/deposito",
                possuiAcesso: true,
                submenus: null,
                idAlerta: ""
            },
        ])
    }, [])

    // useEffect(() => {
    //     if (filtroPesquisa) {
    //         setItensMenu(menuPesquisa[0]?.menus.filter((menuItem) => {
    //             const menuDescricao = replaceSpecialChars(menuItem.descricao.toLowerCase());
    //             const pesquisaDescricao = replaceSpecialChars(filtroPesquisa.toLowerCase());

    //             return menuDescricao.includes(pesquisaDescricao);
    //         }) || []);
    //     } else {
    //         setItensMenu(menu[0]?.menus || [])
    //     }
    // }, [filtroPesquisa, menu])

    // async function verificaToken() {
    //     const token: string | null = localStorage.getItem("@admin_Token");

    //     if (!token && window.location.pathname !== "/login") {
    //         const tokenURL = query.get("token");

    //         if (tokenURL) {
    //             localStorage.setItem("@admin_Token", tokenURL);

    //             verificaParametroToken()
    //         } else {
    //             localStorage.removeItem("@admin_Token");
    //             window.location.href = `/login?url=${window.location.pathname}`;
    //         }
    //     } else if (window.location.pathname !== "/login") {
    //         verificaParametroToken()
    //     }
    //     setLoading(false);
    // }

    // async function verificaParametroToken() {
    //     const response = await autenticacao();

    //     if (response.sucesso) {
    //         localStorage.setItem("@admin_Token", response.dados.token);
    //     } else {
    //         const tokenURL = query.get("token");

    //         if (tokenURL) {
    //             localStorage.setItem("@admin_Token", tokenURL);
    //         } else {
    //             localStorage.removeItem("@admin_Token");
    //             window.location.href = `/login?url=${window.location.pathname}`;
    //         }
    //     }
    // }

    // function replaceSpecialChars(str: string): string {
    //     const map: any = {
    //         '-': ' ',
    //         'a': 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
    //         'e': 'é|è|ê|ë|É|È|Ê|Ë',
    //         'i': 'í|ì|î|ï|Í|Ì|Î|Ï',
    //         'o': 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
    //         'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    //         'c': 'ç|Ç',
    //         'n': 'ñ|Ñ'
    //     };

    //     for (var pattern in map) {
    //         str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    //     }

    //     return str;
    // }

    function handleSair(): void {
        localStorage.removeItem('@admin_Token');
        navigate(`/login`)
    }

    const Iniciais = (): JSX.Element => {
        // let iniciais = "";
        // if (!!usuario?.nome) {
        //     usuario.nome.split(' ').forEach(item => {
        //         iniciais += item[0]?.toUpperCase();
        //     })
        // }

        // return (<>{iniciais}</>)

        return <>US</>;
    }

    // async function carregaLogo(): Promise<any> {
    //     const response = await getLogo()
    //     if (response.sucesso) {
    //         setLogo(response.dados);
    //     }
    // }
    
    const Logo = (): JSX.Element => {
        return (
            <Link to={"/"}>
                <div className="flex-shrink-0 flex flex-row gap-4 items-center justify-center p-2  mx-auto rounded-md w-44">
                    <img
                        className="object-contain h-44"
                        // src={logo?.dropboxLinkDownload || "/favicon.ico"}
                        src={"/vite.ico"}
                        alt="/vite.ico"
                    // onError={({ currentTarget }) => {
                    //     currentTarget.onerror = null;

                    //     if (!logo?.dropboxLinkDownload) {
                    //         currentTarget.src = "/favicon.ico";
                    //         return;
                    //     }

                    //     let linkCorrigido = logo?.dropboxLinkDownload?.replace("?dl=1", "&dl=1");

                    //     if (currentTarget.src == linkCorrigido || currentTarget.src == "")
                    //         currentTarget.src = "/favicon.ico";
                    //     else
                    //         currentTarget.src = linkCorrigido || "";
                    // }}
                    />
                </div>
            </Link>
        )
    }

    const PerfilMenu = (): JSX.Element => {

        return (
            // <div className='flex flex-row-reverse bg-white rounded-lg h-10 items-center justify-end gap-2 ml-auto border-x-2 '>
            //     {/* <FaAngleDown /> */}


            //     <div className='flex flex-col'>
            //         <span className='hidden sm:inline pr-2 font-medium text-base'>{usuario?.nome}</span>
            //         <span className='hidden sm:inline pr-2 text-sm -mt-1 text-slate-500'>{usuario?.descricaoPerfilAcesso}</span>
            //     </div>

            //     <Avatar.Root className="cursor-pointer bg-gradient-to-b from-primary-800 via-yellow-400 p-0.5 to-primary-500 inline-flex shadow-md -ml-4 h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            //     <Avatar.Root className="cursor-pointer bg-gradient-to-b from-primary-800 via-yellow-400 p-0.5 to-primary-500 inline-flex shadow-md -ml-4 h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            //         <Avatar.Image
            //             className="h-full w-full rounded-[inherit] object-cover"
            //             src={fotoUrl || ""}
            //             alt="Foto Usuário"
            //         />
            //         <Avatar.Fallback
            //             className="leading-1 flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-100 text-[15px] font-medium"
            //         >
            //             <Iniciais />
            //         </Avatar.Fallback>
            //     </Avatar.Root>


            // </div>
            <DropdownMenu.Root>
                <div className='h-10 pr-2 items-center justify-end ml-auto z-10'>
                    <DropdownMenu.Trigger asChild className='cursor-pointer'>
                        <div className='flex items-center justify-between group'>
                            <Avatar.Root className=" z-[11] bg-gradient-to-b from-primary-800 via-yellow-400 p-0.5 to-primary-500 inline-flex shadow-md -ml-8 h-11 w-11 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                <Avatar.Image
                                    className="h-full w-full rounded-full object-cover"
                                    src={fotoUrl || ""}
                                    alt="Foto Usuário"
                                />
                                <Avatar.Fallback
                                    className="leading-1 flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-100 text-[15px] font-medium"
                                >
                                    <Iniciais />
                                </Avatar.Fallback>
                            </Avatar.Root>

                            <div className="z-10 bg-white group-hover:bg-gray-50 pr-2 py-0.5 rounded-r-lg shadow-sm pl-6 -ml-4 leading-loose flex flex-row items-center gap-3">
                                <div className=' flex flex-col'>
                                    {/* <span className='hidden sm:inline font-medium text-sm'>{usuario?.nome}</span>
                                    <span className='hidden sm:inline text-xs text-slate-500'>{usuario?.descricaoPerfilAcesso}</span> */}
                                    <span className='hidden sm:inline font-medium text-sm'>Usuário</span>
                                    <span className='hidden sm:inline text-xs text-slate-500'>Perfil de acesso</span>
                                </div>

                                <FaAngleDown className={classNames('fill-slate-6700 delay-100 transition-transform duration-150 ease-in group-data-[state=open]:rotate-180')} />
                            </div>
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content align='end' className='w-full text-sm shadow-md border bg-white rounded-lg gap-1 overflow-hidden p-1' sideOffset={5}>
                            <DropdownMenu.Arrow className="fill-white" />

                            <DropdownMenu.Item onClick={handleSair} className='px-2 w-44 py-1.5 cursor-pointer rounded-md hover:bg-gray-200/90'>
                                Sair
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator className='bg-gray-200 h-[1px] my-1' />

                            <DropdownMenu.Item onClick={() => setModalAlterarSenha(true)} className='px-2 min-w-[10em] py-1.5 cursor-pointer rounded-md hover:bg-gray-200/90'>
                                Alterar senha
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>

                    </DropdownMenu.Portal>
                </div>
            </DropdownMenu.Root >
        )
    }

    // function handlePesquisa(pesquisa: string) {
    //     if (pesquisa) {
    //         const itens = menuPesquisa[0]?.menus.filter((menuItem) => {
    //             const menuDescricao = replaceSpecialChars(menuItem.descricao.toLowerCase());
    //             const pesquisaDescricao = replaceSpecialChars(pesquisa.toLowerCase());

    //             return menuDescricao.split(">")[1].includes(pesquisaDescricao);
    //         }) || [];

    //         setItensMenu(itens);
    //     } else {
    //         setItensMenu(menu[0]?.menus || [])
    //     }
    // }

    // if (loading)
    //     return <LoadingPage />

    return (
        <div className='overflow-hidden h-screen flex flex-col w-screen bg-primary-800 relative'>
            <div className='w-full h-full flex flex-row gap-0'>
                <div className={classNames(
                    'select-none',
                    // 'w-10/12 md:w-5/12 lg:w-3/12 xl:w-2/12',
                    'shadow transition duration-300 focus:outline-none',
                    menuAberto ? "w-[14vw] min-w-fit" : "w-0",
                    'h-full bg-gradient-to-b from-primary-800 to-primary-500 flex flex-col gap-2',
                    'h-full bg-gradient-to-b from-primary-800 to-primary-500 flex flex-col gap-2',
                )}>
                    {/* <h1 className='text-white text-lg pt-1 flex-1 w-full text-center flex flex-row items-center justify-center'>
                        <span className='font-bold'>SOLFI</span>
                    </h1> */}

                    <div className='px-4'>
                        <Logo />
                    </div>

                    {/* <input
                        id="pesquisa"
                        onChange={(e) => handlePesquisa(e.target.value)}
                        type="text"

                        className="w- border mx-4 bg-gray-200 border-primary-900 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-md placeholder:text-gray-700"
                        placeholder="Pesquisa"
                    /> */}
                    <ScrollArea paddingX='p-3'>
                        <>
                            {itensMenu.map((item, key) => <MenuItem key={key} props={item} />)}
                        </>
                    </ScrollArea>

                    {/* <div className='flex flex-row items-center justify-start gap-2 mx-auto px-4 pt-2 pb-6'>
                        <Avatar.Root className="cursor-pointer bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-md align-middle">
                            <Avatar.Image
                                className="h-full w-full rounded-md object-cover"
                                src={fotoUrl || ""}
                                alt="Foto Usuário"
                            />
                            <Avatar.Fallback
                                className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-gray-100 text-[15px] font-medium"
                                delayMs={600}
                            >
                                <Iniciais />
                            </Avatar.Fallback>
                        </Avatar.Root>
                        <div className='flex flex-col text-gray-100'>
                            <span className='hidden -my-0.5 font-medium sm:inline'>{usuario?.nome}</span>
                            <span className='hidden -my-0.5 text-sm sm:inline'>{usuario?.descricaoPerfilAcesso}</span>
                        </div>
                        <button onClick={handleSair} className="flex flex-row gap-2 p-1 items-center cursor-pointer">
                            <IoExit className='text-white w-6 h-6' />
                        </button>
                    </div> */}
                </div>

                <div className='bg-gray-200 w-full h-full flex-1'>
                    <div className='h-fit bg-white lg:bg-transparent w-full lg:p-4 p-2 flex flex-row justify-between lg:justify-end gap-4 items-center'>
                        <button onClick={() => setMenuAberto(!menuAberto)} id="botaoMenu" className='p-4'>
                            <RxHamburgerMenu className='h-5 w-5 text-gray-600 ' />
                        </button>

                        {/* <div className='w-full flex items-end justify-end'>
                            <Darkreader
                                defaultDarken={window.localStorage.getItem("@theme") === "dark"}
                                theme={{
                                    brightness: 100,
                                    contrast: 100,
                                    sepia: 10,
                                }}
                                onChange={isDark => window.localStorage.setItem("@theme", isDark ? "dark" : "light")}
                            />
                        </div> */}

                        <PerfilMenu />
                        {/* <div className='flex flex-row-reverse bg-white rounded-lg h-10 items-center justify-end gap-2 ml-auto border-x-2 '>
                            <span className='hidden sm:inline pr-2'>{usuario?.nome}</span>

                            <A  vatar.Root className="cursor-pointer bg-gray-100 inline-flex shadow-md -ml-4 ring-2 ring-primary-600 h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                <Avatar.Image
                                    className="h-full w-full rounded-[inherit] object-cover"
                                    src={fotoUrl || ""}
                                    alt="Foto Usuário"
                                />
                                <Avatar.Fallback
                                    className="leading-1 flex h-full w-full items-center justify-center bg-gray-100 text-[15px] font-medium"
                                    delayMs={600}
                                >
                                    <Iniciais />
                                </Avatar.Fallback>
                            </Avatar.Root>
                        </div> */}

                        {/* <button onClick={handleSair} className="flex flex-row gap-2 px-4 pr-6 items-center cursor-pointer">
                            <span>Sair</span>
                            <RxExit />
                        </button> */}
                    </div>

                    <div className='pb-20 h-screen'>
                        <ScrollArea className='bg-gray-200 flex flex-col gap-4 py-2' paddingX='px-4'>
                            <Suspense fallback={<Loading />}>
                                <div className='px-2'>
                                    <Outlet />
                                </div>
                            </Suspense>
                        </ScrollArea>
                    </div>
                </div>
            </div>



            {/* Modal para fazer login quando perder a sessão (não implementado) */}
            {/* <Modal open={modalRenovarLogin} setOpen={setModalRenovarLogin}>
                <Modal.Titulo texto='Faça login novamente' tipo='aviso' />
                <Modal.Conteudo>
                    <LoginForm margin='mt-0' login={login} />
                </Modal.Conteudo>
            </Modal> */}

            {/* Modal para alterar senha */}
            <ModalAlterarSenha
                open={modalAlterarSenha}
                setOpen={setModalAlterarSenha}
            />
        </div >
    )
}

