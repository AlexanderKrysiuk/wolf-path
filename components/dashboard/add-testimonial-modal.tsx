import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { RiCloseLargeFill } from "react-icons/ri";
import Avatar from "../avatar";

const AddTestimonialModal = ({
    isOpen,
    onClose,
    onConfirm,
    user,
    formData,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed z-50 inset-0 flex items-center bg-black bg-opacity-50 justify-center">
                        <Card className="bg-background w-full px-[10vw] py-[10vh] max-w-[600px]">
                            <CardHeader>
                                <CardTitle>
                                    <div className="flex justify-beetween">
                                        <div className="px-[1vw] py-[1vh]">
                                            Zobacz jak będzie wyglądała Twoja opinia                                        
                                        </div>
                                        <Button onClick={onClose}>
                                            <RiCloseLargeFill/>
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="items-center space-x-[1vw] space-y-[1vh]">
                                    <div className="max-w-[100px] max-h-[100px] flex justify-center mx-auto">
                                        <Avatar/>
                                    </div>
                                    <h1 className="font-mjolnir flex justify-center">{formData.title}</h1>
                                </div>
                                <div className="px-[1vw] py-[1vh] overflow-y-auto max-h-[40vh] rounded-lg bg-secondary">
                                    {formData.description}
                                </div>
                                <div className="flex justify-center space-x-[1vw] py-[1vh]">
                                    <Button onClick={onClose} variant="destructive">Anuluj</Button>
                                    <Button onClick={onConfirm}>Zatwiedź</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
    );
}

export default AddTestimonialModal;