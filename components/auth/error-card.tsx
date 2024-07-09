import { Header } from "@/components/auth/header"
import { BackButton } from "@/components/auth/back-button"
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Coś poszło nie tak!"
            backButtonHref="/auth/login"
            backButtonLabel="Powrót do logowania"
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive"/>
            </div>
        </CardWrapper>
    )
}