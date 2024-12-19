// Icon.tsx
import * as bsIcons from "react-icons/bs";
import * as faIcons from "react-icons/fa";
import * as faIcons6 from "react-icons/fa6";
import * as giIcons from "react-icons/gi";
import * as ioIcons from "react-icons/io5";

type PropsIcon = {
    id?: string;
    icon: string;
    className?: string;
    outline: boolean;
}

export const Icon = (props: PropsIcon): JSX.Element => {
    const { id, icon, className } = props;
    const { ...icons } = { ...faIcons, ...faIcons6, ...giIcons, ...bsIcons, ...ioIcons };
    const Icon = icons[icon];

    return (
        <span id={id}>{Icon ? <Icon className={className} /> : ""}</span>
    );
};