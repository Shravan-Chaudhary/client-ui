"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addAddress } from "@/lib/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, Plus } from "lucide-react";

interface ErrorResponse {
    message: string;
}

const formSchema = z.object({
    address: z.string().min(2, {
        message: "Address must be at least 2 characters.",
    }),
});

const AddAddress = ({ customerId }: { customerId: string | undefined }) => {
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const addressForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["addAddress"],
        mutationFn: async (address: string) => {
            // TODO: fix customerId type
            return await addAddress(customerId!, address);
        },
        onSuccess: () => {
            setOpen(false);
            addressForm.reset();
            queryClient.invalidateQueries({ queryKey: ["customer"] });
        },

        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message ?? "An error occurred, please try again.";
            setError(errorMessage);
        },
    });

    const handleAddAddress = async (data: z.infer<typeof formSchema>) => {
        console.log("data", data);
        mutate(data.address);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="link" className="flex items-center">
                    <Plus className="mr-1 size-4" />
                    <span className="ml-2">Add new address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(handleAddAddress)}>
                        <DialogHeader>
                            <DialogTitle>Add Address</DialogTitle>
                            <DialogDescription>
                                We save your address so you can checkout faster next time.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <FormField
                                    name="address"
                                    control={addressForm.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea id="address" className="mt-2" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                <span className="text-sm text-red-500">{error}</span>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <LoaderCircle className="animate-spin" />
                                        <span>Adding Address....</span>
                                    </span>
                                ) : (
                                    "Add Address"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddAddress;
