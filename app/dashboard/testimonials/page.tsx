import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserTestimonialsPage = () => {
    return (
        <div>
            Opinie <br/>
            <Link href={"/dashboard/testimonials/create"}>
                <Button>
                    Dodaj Opinie
                </Button>
            </Link>
        </div>
    );
}
 
export default UserTestimonialsPage;