import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const StartButton = () => {
    return ( 
        <LoginButton mode="redirect" asChild> 
            <Button variant={`accent`}>
                <span className="text-white font-mjolnir pt-1">
                    WEJDŹ
                </span>
            </Button>
            
        </LoginButton>
     );
}
 
export default StartButton;