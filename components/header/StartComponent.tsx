import { auth, signOut } from "@/auth"
import StartButton from "./StartButton";
import { UserButton } from "@/components/auth/user-button";

const StartComponent = async () => {
    const session = await auth();

    if (session) {
        return <div className="items-center"><UserButton/></div>
    }
    return <div><StartButton/></div>
}

export default StartComponent;