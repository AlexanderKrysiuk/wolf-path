import Header from "@/components/header/Header";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
            <Header/>
            {children}
        </div>
    );
}
export default ProtectedLayout;