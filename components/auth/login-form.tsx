import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel = "Witaj z powrotem!"
            backButtonLabel="Nie masz konta?"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form
        </CardWrapper>
    );
}