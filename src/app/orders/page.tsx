import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cookies } from "next/headers";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
        dateTime: "2023-04-15 14:32:11",
        orderStatus: "Delivered",
        details: "View",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
        dateTime: "2023-04-16 09:45:23",
        orderStatus: "Processing",
        details: "View",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
        dateTime: "2023-04-17 16:21:05",
        orderStatus: "Canceled",
        details: "View",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
        dateTime: "2023-04-18 11:15:32",
        orderStatus: "Delivered",
        details: "View",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
        dateTime: "2023-04-19 15:42:18",
        orderStatus: "Delivered",
        details: "View",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        dateTime: "2023-04-20 10:33:47",
        orderStatus: "Processing",
        details: "View",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        dateTime: "2023-04-21 13:27:55",
        orderStatus: "Pending",
        details: "View",
    },
];

const Orders = async () => {
    const response = await fetch(`https://api.epicfood.live/api/v1/order/api/v1/order/mine`, {
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
    });

    if (!response.ok) {
        <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
            <h1 className="text-3xl font-bold">Error fetching Orders</h1>
        </MaxWidthWrapper>;
    }

    // const orders = await response.json()

    return (
        <MaxWidthWrapper className="mb-8 mt-12 flex flex-col sm:mt-20">
            <Table className="border-separate border-spacing-0 overflow-hidden rounded-2xl border border-gray-400 bg-white">
                <TableCaption>A list of your recent orders.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Date Time</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell>{invoice.dateTime}</TableCell>
                            <TableCell>{invoice.orderStatus}</TableCell>
                            <TableCell>{invoice.totalAmount}</TableCell>
                            <TableCell className="text-right">{invoice.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </MaxWidthWrapper>
    );
};

export default Orders;
