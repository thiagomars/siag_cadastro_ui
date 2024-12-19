import * as RadixTooltip from '@radix-ui/react-tooltip';
import classNames from '../../utils/classNames';

type Props = {
    children: JSX.Element;
    className?: string;
}

const Tooltip = ({ children }: Props): JSX.Element => {
    return (
        <RadixTooltip.Provider>
            <RadixTooltip.Root>
                {children}
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};

Tooltip.Trigger = ({ children, className }: Props) => {
    return (
        <RadixTooltip.Trigger className={className}>
            {children}
        </RadixTooltip.Trigger>
    )
}

Tooltip.Content = ({ children, className }: Props) => {
    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content
                className={classNames("bg-zinc-600 p-2 rounded shadow-lg mx-4", className)}
                sideOffset={5}
            >
                {children}
                <RadixTooltip.Arrow className="fill-zinc-600" />
            </RadixTooltip.Content>
        </RadixTooltip.Portal>
    )
}


export default Tooltip;