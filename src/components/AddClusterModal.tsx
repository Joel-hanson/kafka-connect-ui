// components/AddClusterModal.tsx
"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useClusters } from "@/contexts/ClusterContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    url: z.string().url({
        message: "Please enter a valid URL.",
    }),
})

export default function AddClusterModal() {
    const { clusters, setClusters, showModal, setShowModal } = useClusters()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const newCluster = {
            name: values.name,
            url: values.url,
        }
        setClusters([...clusters, newCluster])
        setShowModal(false)
        form.reset()
    }

    return (
        <AlertDialog open={showModal} onOpenChange={setShowModal}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add New Cluster</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the details for the new cluster you want to add.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="New connect instance" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="http://localhost:8083" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => form.reset()}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction type="submit">
                                Add Cluster
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}