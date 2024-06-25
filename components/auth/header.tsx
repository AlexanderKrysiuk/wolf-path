interface HeaderProps {
    label: string;
}

export const Header = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="font-mjolnir">
                🔐 Autentykacja 
            </h1>
            <p>
                {label}
            </p>
        </div>
    );
}