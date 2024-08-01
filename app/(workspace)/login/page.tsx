import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const LoginWork = () => {
    return ( 
        <main className="flex h-screen flex-col items-center justify-center">
            <div className="space-y-6 text-center">
                <h1 className="text-4xl font-semibold drop-shadow-md font-mjolnir">
                    🔐 Logowanie
                </h1>
                <div>
                    <LoginButton mode="redirect" asChild> 
                        <Button variant={`secondary`} className="w-full">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
     );
}

export default LoginWork;