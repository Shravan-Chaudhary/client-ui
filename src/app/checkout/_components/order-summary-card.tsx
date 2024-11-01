import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const OrderSummaryCard = () => {
    return (
        <Card className="flex w-full flex-col justify-between rounded-3xl border-none">
            <CardContent className="mt-5">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p>Subtotal</p>
                        <span className="font-bold">&#8377;1000</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Tax</p>
                        <span className="font-bold">&#8377;53</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Delivery Charges</p>
                        <span className="font-bold">&#8377;60</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <span className="font-bold">&#8377;100</span>
                    </div>
                </div>
                <Separator className="my-5" />

                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold">Order Total</h4>
                        <span className="font-bold">&#8377;1300</span>
                    </div>
                    <div className="grid grid-cols-11 gap-5">
                        <Input
                            id="coupon"
                            name="coupon"
                            required
                            type="text"
                            className="col-span-8"
                            placeholder="Coupon Code"
                        />
                        <Button variant={"secondary"} className="col-span-3">
                            Apply
                        </Button>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button>Place Order</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummaryCard;
