"use client"
import React, { ReactNode } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import {Form,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from 'sonner'
import FormField from '../FormField'

const authFormSchema: (type: "sign-in" | "sign-up") => z.ZodObject<any> = (type: "sign-in" | "sign-up") => {
    if (type === "sign-in") {
        return z.object({
            email: z.string().email({ message: "Invalid email address" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        });
    } else {
        return z.object({
            name: z.string().min(1, { message: "Username is required" }),
            email: z.string().email({ message: "Invalid email address" }),
            password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        });
    }
}

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: type === "sign-up" 
            ? { name: "", email: "", password: "" }
            : { email: "", password: "" },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === "sign-in") {
                console.log("SIGN IN", values);
            } else{
                console.log("SIGN UP", values);
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Something went wrong. Please try again.")
        }
    }
    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">prepmaster</h2>
                </div>
                <h3>Practice Job interview with AI</h3>
                
                {!isSignIn && (
                    <FormField
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Your name"
                    />
                )}
                <p>Email</p>
                <p>Password</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6 from-orange-50">
                        
                        <Button className="btn w-full" type="submit">
                            {type === "sign-in" ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>
                <p className='text-center'>
                    {isSignIn ? "No account yet? " : "Already have an account? "}
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-primary-100 font-semibold">
                    {!isSignIn ? "Sign In" : "Create an Account"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm