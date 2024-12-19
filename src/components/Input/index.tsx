import React, { FormEventHandler } from "react";
import { Control, UseFormRegister, UseFormSetValue, useController } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import Select from "react-select";

import InputMask from "comigo-tech-react-input-mask";
import { typeSelectOptions } from "../../types/select.d";
import classNames from "../../utils/classNames";
import { converterDecimal, formatarDecimal, formatarDinheiro, formatarPlaca } from "../../utils/formartar";
import Botao from "../Button";

import * as Checkbox from "@radix-ui/react-checkbox";
import * as Form from "@radix-ui/react-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Switch from "@radix-ui/react-switch";
import * as ToggleGroupForm from '@radix-ui/react-toggle-group';
import { RxCalendar, RxCheck } from "react-icons/rx";
import copyToClipboard from "../../utils/copyToClipboard";
import verificaPlacaVeiculoValida from "../../utils/verificaPlacaVeiculo";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type propsField = {
    children?: Array<JSX.Element> | JSX.Element;
    name: string;
    label?: string | JSX.Element;
    hideLabel?: boolean;
    subTitulo?: string;
    opcional?: boolean;
    className?: string;
    icone?: JSX.Element | null;
    mostrarLabel?: boolean;
    classNameIconeContainer?: string;
}

type propsInput = {
    control?: Control<any>;
    register?: UseFormRegister<any>;
    value?: string | number | boolean | null;
    disabled?: boolean;
    onChange?: Function;
    onInputChange?: Function;
    onSubmit?: Function;
    options?: Array<typeSelectOptions> | null;
    labelOpcaoPadrao?: string;
    placeholder?: string;
    defaultValue?: null | string | typeSelectOptions;
    defaultValueMultiSelect?: null | Array<typeSelectOptions>;
    checked?: boolean;
    defaultChecked?: boolean;
    rows?: number;
    align?: string;
    type?: string;
    min?: number | Date | string | null;
    max?: number | Date | string | null;
    maxLength?: number | null;
    step?: number;
    tamanhoMascara?: number;
    temBotao?: boolean;
    isClearable?: boolean;
    isLoading?: boolean;
    decimalPlaces?: number;
    setValue?: UseFormSetValue<any>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    copyClipboard?: boolean;
    lowercase?: boolean;
    semOpcaoNula?: boolean;
    isFiltro?: boolean;
    dataVazia?: boolean;
    minimoFuncionalidades?: boolean;
    buttonActionIcon?: JSX.Element;
    buttonActionFunction?: Function;
    handleEnterMultiSelect?: any;
    lockedPaste?: boolean;
}

type propsFormulario = {
    className?: string;
    children?: React.ReactNode;
    align?: string;
    onSubimit?: FormEventHandler<HTMLFormElement>;
}

function normalizar(valor: string): string {
    return valor.replace(/[^0-9]/g, "");
}

const stringParaNumber = (valor: string = "0", decimalPlaces: number = 2): number => {
    let numero = Number(valor.replace(/\D/g, ""));
    return numero / Math.pow(10, decimalPlaces);
}

export default function Formulario({ className, children, align = "end" }: propsFormulario): JSX.Element {
    return (
        <Form.Root
            autoComplete="off"
            className={classNames("grid grid-cols-1 gap-4", align == "end" ? "items-end" : "items-start", className)}
            onSubmit={(e) => e.preventDefault()}
        >
            {children}
        </Form.Root>
    )
}

Formulario.Field = ({ children, ...props }: propsField): JSX.Element => {
    return (
        <Form.Field className={props.className} name={props.name}>
            {!props.hideLabel && (
                <Form.Label
                    className="flex flex-row item-center gap-1 p-1 text-sm font-medium text-gray-700"
                    htmlFor={props.name}>
                    <p>
                        {props.label}
                        {props.subTitulo && (
                            <i className="text-xs text-gray-400 ml-4">
                                {props.subTitulo}
                            </i>
                        )}
                    </p>
                    {!props.opcional ? <span className="text-red-500">*</span> : null}
                </Form.Label>
            )}
            <div className="flex flex-row items-center">
                {props.icone &&

                    <div className={classNames("ring-1 ring-gray-300 rounded-l-md p-3 sm:text-sm", props.classNameIconeContainer)}>
                        {props.icone}
                    </div>
                }
                <Form.Control asChild>
                    {children}
                </Form.Control>
            </div>
        </Form.Field>
    )
}

Formulario.InputData = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;
    propsField.icone = propsField.icone || <RxCalendar />;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: new Date().toISOString().split("T")[0] });

    return (
        <Formulario.Field {...propsField}>
            <input
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                name={propsField.name}
                value={(value == "" || value == null) ? (propsInput.dataVazia ? "" : new Date().toISOString().split("T")[0]) : new Date(value).toISOString().split("T")[0]}
                disabled={propsInput.disabled}
                onChange={valor => onChange(valor.target.value)}
                type="date"
                min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                className={"rounded-r-md w-full disabled:bg-gray-100 border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                onPaste={(event) => {
                    !!propsInput.lockedPaste && event.preventDefault();
                }}
                lang="pt-br"
            />
        </Formulario.Field>
    )
}

Formulario.InputMes = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;
    propsField.icone = propsField.icone || <RxCalendar />;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: new Date().toISOString().split("T")[0] });

    return (
        <Formulario.Field {...propsField}>
            <input
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                name={propsField.name}
                value={value}
                disabled={propsInput.disabled}
                onChange={valor => onChange(valor.target.value)}
                type="month"
                min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                className={"rounded-r-md w-full disabled:bg-gray-100 border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                onPaste={(event) => {
                    !!propsInput.lockedPaste && event.preventDefault();
                }}
            />
        </Formulario.Field>
    )
}

Formulario.InputHorario = (props: propsField & propsInput) => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    type="time"
                    disabled={propsInput.disabled}
                    name={propsField.name}
                    min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                    max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                    placeholder={propsInput.placeholder}
                    onKeyDown={propsInput.onKeyDown && propsInput.onKeyDown}
                    className={`${propsField.icone || propsInput.copyClipboard ? (propsInput.copyClipboard ? "rounded-l-md border-r-0" : "rounded-r-md") : "rounded-md"} w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent`}
                    {...register && register(propsField.name)}
                    onChange={e => {
                        register && register(propsField.name).onChange(e);
                    }}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputDinheiro = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: 0 });

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    name={propsField.name}
                    value={formatarDinheiro(converterDecimal(value || 0))}
                    disabled={propsInput.disabled}
                    onChange={valor => onChange(stringParaNumber(valor.target.value))}
                    type={propsInput.type}
                    min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                    max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                    step={propsInput.step}
                    placeholder={propsInput.placeholder}
                    className={`${propsField.icone ? "rounded-r-md" : "rounded-md"} ${!props.align ? "text-right" : props.align} w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputNumber = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: 0 });

    if (!propsInput.decimalPlaces)
        propsInput.decimalPlaces = 0;

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    name={propsField.name}
                    value={formatarDecimal(value || 0, propsInput.decimalPlaces)}
                    disabled={propsInput.disabled}
                    onChange={valor => {
                        let valorNumber = stringParaNumber(valor.target.value, propsInput.decimalPlaces);
                        if ((propsInput.min as number) > valorNumber) {
                            onChange((propsInput.min as number))
                            return;
                        }

                        onChange(valorNumber);
                    }}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                    type={propsInput.type}
                    min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                    max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                    step={propsInput.step}
                    placeholder={propsInput.placeholder}
                    className={`${propsField.icone ? "rounded-r-md" : "rounded-md"} ${!props.align ? "text-right" : props.align} w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputPorcentagem = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value: value, onChange: onChange } } = useController({ name: propsField.name, control, defaultValue: 0 });

    if (!propsInput.decimalPlaces)
        propsInput.decimalPlaces = 0;

    return (
        <Formulario.Field {...propsField}>
            <input
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                name={propsField.name}
                value={"% " + formatarDecimal(value || 0, propsInput.decimalPlaces)}
                disabled={propsInput.disabled}
                onChange={valor => onChange(stringParaNumber(valor.target.value, propsInput.decimalPlaces))}
                type={propsInput.type}
                min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                step={propsInput.step}
                placeholder={propsInput.placeholder}
                className={`${propsField.icone ? "rounded-r-md" : "rounded-md"} ${!props.align ? "text-right" : props.align} w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                onPaste={(event) => {
                    !!propsInput.lockedPaste && event.preventDefault();
                }}
            />
        </Formulario.Field>
    )
}

Formulario.InputTexto = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    function handleClickCopyClipboard(event: Event) {
        event.preventDefault();
        copyToClipboard((propsInput.value as string) || "");
    }

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    disabled={propsInput.disabled}
                    name={propsField.name}
                    type={propsInput.type}
                    min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                    max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                    step={propsInput.step}
                    maxLength={propsInput.maxLength || undefined}
                    placeholder={propsInput.placeholder}
                    onKeyDown={propsInput.onKeyDown && propsInput.onKeyDown}
                    className={classNames(
                        propsField.icone || (propsInput.copyClipboard || propsInput.buttonActionFunction != null) ? ((propsInput.copyClipboard || propsInput.buttonActionFunction != null) ? "rounded-l-md border-r-0" : "rounded-r-md") : "rounded-md",
                        `w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent`,
                        (!!propsInput.align ? propsInput.align : "text-left")
                    )}
                    value={propsInput.value && propsInput.value !== true ? propsInput.value : undefined}
                    {...register && register(propsField.name)} 
                    onChange={e => {
                        if (propsInput.type != "number") {
                            const positionCursor = e.target.selectionStart;

                            if (!propsInput.lowercase) e.target.value = e.target.value.toString().toUpperCase()

                            if (propsInput.type == "number" &&
                                propsInput.min != null && typeof propsInput.min != "object" &&
                                Number(e.target.value) < (propsInput.min as number)
                            )
                                e.target.value = (Number(e.target.value) * (-1)).toString();

                            register && register(propsField.name).onChange(e);
                            e.target.selectionStart = positionCursor;
                            e.target.selectionEnd = positionCursor;
                        }
                    }}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                />
                {
                    propsInput.copyClipboard ? (
                        <button onClick={() => handleClickCopyClipboard} className={`rounded-r-md cursor-pointer border border-l border-gray-300 shadow-sm py-2 px-3 ${propsInput.disabled && "bg-gray-100"}`}>
                            <HiOutlineClipboardCopy className="w-5 h-5" />
                        </button>
                    ) : <></>
                }
                {
                    propsInput.buttonActionFunction != null ? (
                        <button onClick={(event) => propsInput.buttonActionFunction && propsInput.buttonActionFunction(event)} className={`rounded-r-md cursor-pointer border border-l border-gray-300 shadow-sm py-2 px-3 ${propsInput.disabled && "bg-gray-100"}`}>
                            {propsInput.buttonActionIcon}
                        </button>
                    ) : <></>
                }

            </>
        </Formulario.Field>
    )
}

Formulario.InputCor = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    function handleClickCopyClipboard(event: Event) {
        event.preventDefault();
        copyToClipboard((propsInput.value as string) || "");
    }

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    disabled={propsInput.disabled}
                    name={propsField.name}
                    type="color"
                    min={propsInput.min != null && typeof propsInput.min != "object" ? propsInput.min : ""}
                    max={propsInput.max != null && typeof propsInput.max != "object" ? propsInput.max : ""}
                    step={propsInput.step}
                    maxLength={propsInput.maxLength || undefined}
                    placeholder={propsInput.placeholder}
                    onKeyDown={propsInput.onKeyDown && propsInput.onKeyDown}
                    className={`${propsField.icone || propsInput.copyClipboard ? (propsInput.copyClipboard ? "rounded-l-md border-r-0" : "rounded-r-md") : "rounded-md"} w-full border border-gray-300 shadow-sm h-10 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-transparent`}
                    {...register && register(propsField.name)}
                    onChange={e => {
                        if (!propsInput.lowercase) e.target.value = e.target.value.toUpperCase()

                        if (propsInput.type == "number" &&
                            propsInput.min != null && typeof propsInput.min != "object" &&
                            Number(e.target.value) < (propsInput.min as number)
                        )
                            e.target.value = (Number(e.target.value) * (-1)).toString();

                        register && register(propsField.name).onChange(e);
                    }}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                />
                {
                    propsInput.copyClipboard ? (
                        <button onClick={() => handleClickCopyClipboard} className={`rounded-r-md cursor-pointer border border-l-0 border-gray-300 shadow-sm py-2 px-3 ${propsInput.disabled && "bg-gray-100"}`}>
                            <HiOutlineClipboardCopy className="w-5 h-5" />
                        </button>
                    ) : <></>
                }
            </>
        </Formulario.Field>
    )
}

Formulario.InputPlaca = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value, onChange } } = useController({ name: propsField.name, control });

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    disabled={propsInput.disabled}
                    name={propsField.name}
                    type={propsInput.type}
                    value={value}
                    maxLength={propsInput.maxLength || 8}
                    placeholder={propsInput.placeholder}
                    className={`${propsField.icone || propsInput.copyClipboard ? (propsInput.copyClipboard ? "rounded-l-md border-r-0" : "rounded-r-md") : "rounded-md"} w-full border border-gray-300 shadow-sm py-2 px-3 disabled:bg-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    onChange={e => {
                        let placaFormatada = formatarPlaca(e.target.value.toUpperCase())

                        if (verificaPlacaVeiculoValida(placaFormatada))
                            onChange(placaFormatada);
                    }}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputSelect = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    const { field: { value: SelectValue, onChange: onChangeSelect } } = useController({ name: propsField.name, control });
    const { field: { onChange: onChangeSelectId } } = useController({ name: propsField.name + "Id", control, defaultValue: (propsInput.defaultValue as typeSelectOptions)?.value });

    const getOpcoesSelect = (): Array<typeSelectOptions> => {
        const opcoesSelect = [{ value: null, label: propsField.labelOpcaoPadrao || "" }]

        if (!propsInput.options)
            return opcoesSelect;

        if (!propsInput.labelOpcaoPadrao || propsInput.semOpcaoNula)
            return propsInput.options;

        return opcoesSelect.concat(propsInput.options);
    }

    return (
        <Formulario.Field {...propsField}>
            <>
                <Select
                    className="w-full"
                    name={propsField.name}
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    onInputChange={(filtro) => {
                        propsInput.onInputChange && propsInput.onInputChange(filtro)
                    }}
                    options={getOpcoesSelect()}
                    noOptionsMessage={() => "Nenhuma opção disponível"}
                    isDisabled={propsInput.disabled}
                    isLoading={propsInput.isLoading || false}
                    placeholder={propsInput.placeholder || "Selecione"}
                    isClearable={propsField.isClearable === false ? false : true}
                    value={SelectValue?.value || SelectValue?.value != null ? SelectValue : " "}
                    onChange={option => {
                        onChangeSelect(option)
                        onChangeSelectId(option ? option.value : option)
                    }}
                    menuPlacement="auto"
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputSelectMulti = (props: propsField & propsInput) => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    const { field: { value: SelectValue, onChange: onChangeSelect } } = useController({ name: propsField.name, control });
    const { field: { onChange: onChangeSelectId } } = useController({ name: propsField.name + "Ids", control, defaultValue: (propsInput.defaultValue as typeSelectOptions)?.value });

    const getOpcoesSelect = (): Array<typeSelectOptions> => {
        const opcoesSelect = [{ value: null, label: propsField.labelOpcaoPadrao || "" }]

        if (!propsInput.options)
            return opcoesSelect;

        if (!propsInput.labelOpcaoPadrao)
            return propsInput.options;

        return propsInput.options;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            !!propsInput.handleEnterMultiSelect && propsInput.handleEnterMultiSelect(event);
        }
    };

    return (
        <Formulario.Field {...propsField}>
            <>
                <Select
                    isMulti={true}
                    className="w-full"
                    name={propsField.name}
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    onInputChange={(filtro, event) => {
                        if (event.action === "input-change" || !!filtro) {
                            propsInput.onInputChange && propsInput.onInputChange(filtro)
                        }
                    }}
                    value={SelectValue || SelectValue != null ? SelectValue : " "}
                    classNamePrefix="Selecione"
                    options={getOpcoesSelect()}
                    noOptionsMessage={() => "Nenhuma opção disponível"}
                    isDisabled={propsInput.disabled}
                    isLoading={propsInput.isLoading || false}
                    isClearable={propsField.isClearable === false ? false : true}
                    onChange={option => {
                        let valores: Array<number> = []
                        valores = option.map((dados: typeSelectOptions) => dados?.value)
                        onChangeSelectId(valores ? valores : 0);
                        onChangeSelect(option);
                    }}
                    onKeyDown={() => handleKeyDown}
                    placeholder={propsInput.placeholder}
                />
            </>
        </Formulario.Field>
    )
}

const CampoRadio = (props: propsField & propsInput): JSX.Element => {
    const { control, children } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const {
        field:
        { value: CampoRadioValue, onChange: onChangeCampoRadio }
    } = useController(
        { name: propsField.name, control }
    );

    return (
        <Formulario.Field {...propsField}>
            <RadioGroup.Root
                name={propsField.name}
                value={CampoRadioValue?.toString()}
                onValueChange={valorSelecionado => onChangeCampoRadio(valorSelecionado)}
                disabled={propsInput.disabled} className={propsField.className}>

                <div className={classNames(`flex flex-1 gap-3 mx-1`, propsInput.align == "row" ? "flex-row" : "flex-col")}>
                    {children}
                </div>
            </RadioGroup.Root>
        </Formulario.Field>
    )
}

const InputRadio = (props: propsField & propsInput): JSX.Element => {
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    return (
        <div className="flex flex-1 flex-row gap-3 items-center">
            <RadioGroup.Item
                value={propsInput.value?.toString() || ""}
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                className={classNames(
                    "h-5 w-5 shadow-inner  bg-gray-200/50 rounded-full flex flex-row data-[state='checked']:border-2  border-white ring-o data-[state='checked']:ring-2",
                    propsInput.disabled ? "data-[state='checked']:bg-gray-500 ring-gray-500" : "data-[state='checked']:bg-gray-500/80 ring-gray-500/80"
                )}>
                <RadioGroup.Indicator asChild className=" text-gray-400" />
            </RadioGroup.Item>

            <label className={classNames("cursor-pointer mr-3 w-max", propsInput.disabled && "text-gray-500/90")} htmlFor={propsField.name}>
                {propsField.label}
            </label>
        </div>
    )
}

CampoRadio.InputRadio = InputRadio;
Formulario.CampoRadio = CampoRadio;

const ToggleGroup = (props: propsField & propsInput): JSX.Element => {
    const { control, children } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const {
        field:
        { value: toggleGroupValue, onChange: onChangeToggleGroup }
    } = useController(
        { name: propsField.name, control }
    );

    return (
        <Formulario.Field {...propsField}>
            <ToggleGroupForm.Root
                value={toggleGroupValue?.toString()}
                type="single"
                disabled={propsInput.disabled}
                className={classNames(
                    "rounded-md divide-x overflow-hidden border w-full h-full flex flex-row ",
                    propsField.className,
                    propsInput.disabled ? "bg-gray-100" : "shadow"
                )}
                onValueChange={valor => {
                    if (valor == "") return;
                    onChangeToggleGroup(valor)
                }}
            >
                {children}
            </ToggleGroupForm.Root>
        </Formulario.Field>
    )
}

const ToggleItem = (props: propsField & propsInput): JSX.Element => {
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    return (
        <ToggleGroupForm.Item
            className={classNames(
                "px-4 py-1.5 hover:bg-gray-100 data-[state=on]:bg-primary-600 text-gray-600 data-[state=on]:shadow-inner data-[state=on]:text-white w-full",
                propsInput.disabled ? "shadow-inner bg-gray-100" : "bg-white"
            )}
            value={propsInput.value?.toString() || ""}
            disabled={propsInput.disabled}
        >
            {propsField.label}
            {propsField.icone && propsField.icone}
        </ToggleGroupForm.Item>
    )
}

Formulario.ToggleGroup = ToggleGroup;
ToggleGroup.ToggleItem = ToggleItem;

Formulario.InputCheckBox = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value: checkBoxValue, onChange: onChangeCheckBox } } = useController({ name: propsField.name, control, defaultValue: false });

    propsField.hideLabel = true;

    return (
        <Formulario.Field {...propsField}>
            <>
                <Checkbox.Root
                    name={propsField.name}
                    id={"check_" + propsField.name}
                    value={checkBoxValue}
                    defaultChecked={propsInput.defaultChecked}
                    checked={checkBoxValue}
                    disabled={propsInput.disabled}
                    onCheckedChange={selecionado => onChangeCheckBox(selecionado)}
                    className={classNames(`h-6 aspect-square rounded data-[state='checked']:border-2 border-gray-500`,
                        (!propsInput.disabled ? "shadow-inner" : "shadow-none"),
                        checkBoxValue ? "bg-primary-200/50 " : "bg-gray-200/50"
                    )}
                >
                    <Checkbox.Indicator className="flex justify-center items-center">
                        <RxCheck />
                    </Checkbox.Indicator>
                </Checkbox.Root>

                <label htmlFor={"check_" + propsField.name} className={classNames(
                    "cursor-pointer ml-2",
                    (!propsInput.disabled ? "text-gray-600" : "text-gray-400")
                )}>
                    {propsField.label}
                </label>
            </>
        </Formulario.Field>
    )
}

Formulario.TextArea = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    return (
        <Formulario.Field {...propsField}>
            <textarea
                rows={propsInput.rows}
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                disabled={propsInput.disabled}
                onChange={e => propsInput.onChange && propsInput.onChange(e.target.value)}
                placeholder={propsInput.placeholder}
                className="py-2 px-4 border border-gray-300 focus:outline-none disabled:bg-gray-100 focus:ring-primary-500 focus:border-primary-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm"
                value={propsInput.value && propsInput.value !== true ? propsInput.value : undefined}
                {...register && register(propsField.name)}
                onPaste={(event) => {
                    !!propsInput.lockedPaste && event.preventDefault();
                }}
            />
        </Formulario.Field>
    )
}

Formulario.InputCep = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value, onChange } } = useController({ name: propsField.name, control });

    return (
        <Formulario.Field {...propsField}>
            <>
                <div className="flex-1 flex flex-row gap-2">
                    <InputMask
                        id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                        name={propsField.name}
                        mask="99999-999"
                        alwaysShowMask={false}
                        value={propsInput.value || value || ""}
                        disabled={propsInput.disabled}
                        onChange={(valor: React.ChangeEvent<HTMLInputElement>) => propsInput.onChange ? propsInput.onChange(normalizar(valor.target.value)) : onChange(normalizar(valor.target.value))}
                        placeholder={propsInput.placeholder || "00000-000"}
                        className={"rounded-md w-full border flex-1 disabled:bg-gray-100 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                        onPaste={(event: Event) => {
                            !!propsInput.lockedPaste && event.preventDefault();
                        }}
                    />
                    {propsInput.temBotao &&
                        <Botao
                            onClick={() => propsInput.onSubmit && propsInput.onSubmit(value || "")}
                            tipo={"sucesso"}
                            icone={<FaSearch />}
                        />
                    }
                </div>
            </>
        </Formulario.Field>
    )
}

Formulario.InputCpf = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    const { field: { value, onChange } } = useController({ name: propsField.name, control });

    return (
        <Formulario.Field {...propsField}>
            <>
            <InputMask
                        id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                        name={propsField.name}
                        mask="999.999.999-99"
                        alwaysShowMask={false}
                        value={propsInput.value || value || ""}
                        disabled={propsInput.disabled}
                        onChange={(valor: React.ChangeEvent<HTMLInputElement>) => propsInput.onChange ? propsInput.onChange(normalizar(valor.target.value)) : onChange(normalizar(valor.target.value))}
                        placeholder={propsInput.placeholder || "000.000.00-00"}
                        className={"rounded-md w-full border flex-1 disabled:bg-gray-100 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                        onPaste={(event: Event) => {
                            !!propsInput.lockedPaste && event.preventDefault();
                        }}
                    />
            </>
        </Formulario.Field>
    )
}

Formulario.InputRg = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField } = props;
    const { ...propsInput } = props;

    return (
        <Formulario.Field {...propsField}>
            <>
                <InputMask
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    name={propsField.name}
                    mask=""
                    maskPlaceholder=" "
                    alwaysShowMask={false}
                    value={propsInput.value}
                    disabled={propsInput.disabled}
                    onChange={(valor: React.ChangeEvent<HTMLInputElement>) => propsInput.onChange && propsInput.onChange(normalizar(valor.target.value))}
                    onPaste={(event: Event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                    placeholder={"Registro Geral - RG"}
                    className={"rounded-md w-full border disabled:bg-gray-100 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                    {...register && register(propsField.name)}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputCnpj = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    return (
        <Formulario.Field {...propsField}>
            <>
                <InputMask
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    name={propsField.name}
                    mask="99.999.999/9999-99"
                    alwaysShowMask={false}
                    value={propsInput.value}
                    disabled={propsInput.disabled}
                    onChange={(valor: React.ChangeEvent<HTMLInputElement>) => propsInput.onChange && propsInput.onChange(normalizar(valor.target.value))}
                    onPaste={(event: Event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                    placeholder={propsInput.placeholder || "99.999.999/9999-99"}
                    className={`${propsField.icone && "rounded-l-none"} rounded-md w-full border border-gray-300 disabled:bg-gray-100 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                    {...register && register(propsField.name)}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.InputCelular = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    return (
        <Formulario.Field {...propsField}>
            <>
                <InputMask
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                    name={propsField.name}
                    mask={propsInput.tamanhoMascara == 10 ? "(99) 9999 - 9999" : "(99) 99999 - 9999"}
                    alwaysShowMask={false}
                    value={propsInput.value}
                    disabled={propsInput.disabled}
                    onChange={(valor: React.ChangeEvent<HTMLInputElement>) => propsInput.onChange && propsInput.onChange(normalizar(valor.target.value))}
                    onPaste={(event: Event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                    placeholder={propsInput.tamanhoMascara == 10 ? "(99) 9999 - 9999" : "(99) 99999 - 9999"}
                    className={"rounded-md w-full border disabled:bg-gray-100 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"}
                    {...register && register(propsField.name)}
                />
            </>
        </Formulario.Field>
    )
}

Formulario.Switch = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    const { field: { value: SwitchValue, onChange: onChangeSwitch } } = useController({ name: propsField.name, control, defaultValue: false });

    return (
        <div className={classNames("mx-1 flex flex-row gap-4", propsField.className)}>
            <Switch.Root
                className="h-7 w-12 shrink-0 bg-gray-300 rounded-full relative focus:outline focus:outline-3 focus:outline-offset-2 focus:outline-gray-200 data-[state=checked]:bg-primary-500 outline-none cursor-pointer"
                id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                name={propsField.name}
                checked={SwitchValue}
                onCheckedChange={selecionado => onChangeSwitch(selecionado)}
                disabled={propsInput.disabled}
                value={SwitchValue}
            >
                <Switch.Thumb className="block h-5 w-5 bg-white rounded-full transition-transform duration-100 translate-x-1.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
            <label htmlFor={propsField.name} className="grid place-items-center cursor-pointer">{propsField.label}</label>
        </div>
    )
}

Formulario.EditorTexto = (props: propsField & propsInput): JSX.Element => {
    const { control } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    propsInput.minimoFuncionalidades = propsInput.minimoFuncionalidades || false;

    const { field: { value, onChange } } = useController({ name: propsField.name, control });

    return (
        <Formulario.Field {...propsField}>
            <>
                <ReactQuill
                    theme='snow'
                    preserveWhitespace
                    className="w-full h-full"
                    style={{ borderRadius: "2em", borderColor: "red", borderBottom: "none" }}
                    value={value?.toString()}
                    placeholder={propsInput.placeholder || 'Escreva seu texto aqui'}
                    modules={!propsInput.minimoFuncionalidades ? {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],

                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],

                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],

                            ['clean']
                        ]
                    } : {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],

                            [{ 'font': [] }],
                        ]
                    }}
                    onChange={onChange}
                    readOnly={propsInput.disabled}
                    id={propsInput.isFiltro ? `filtro_${propsField.name}` : propsField.name}
                ></ReactQuill>
            </>
        </Formulario.Field>
    )
}

Formulario.ViewText = (props: propsField & propsInput): JSX.Element => {
    const { register } = props;
    const { ...propsField }: propsField = props;
    const { ...propsInput }: propsInput = props;

    propsField.opcional = true;

    return (
        <Formulario.Field {...propsField}>
            <>
                <input
                    id={propsField.name}
                    disabled
                    name={propsField.name}
                    step={propsInput.step}
                    placeholder={propsInput.placeholder}
                    onKeyDown={propsInput.onKeyDown && propsInput.onKeyDown}
                    className={classNames(
                        `w-full pb-2 px-1 sm:text-sm bg-transparent`,
                        (!!propsInput.align ? propsInput.align : "text-left")
                    )}
                    onPaste={(event) => {
                        !!propsInput.lockedPaste && event.preventDefault();
                    }}
                    value={propsInput.value && propsInput.value !== true ? propsInput.value : undefined}
                    {...register && register(propsField.name)}
                />
            </>
        </Formulario.Field>
    )
}