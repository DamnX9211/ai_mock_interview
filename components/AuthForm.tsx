"use client"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "./FormField"

import React from 'react'
import Link from "next/link"
import { toast } from "sonner"

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (type: FormType ) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().min(3),
        password: z.string().min(3),
    })
}

const AuthForm = ({ type }: { type: FormType}) => {
    const formSchema = authFormSchema(type);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        // Handle sign-in or sign-up logic here
      if (type === 'sign-in') {
          console.log('SIGN UP', values)
      } else {
          console.log('SIGN IN', values)
      }
    } catch (error) {
        console.error(error);
        toast.error(`There was an error: ${error}`);
    }
    console.log(values)
  }

   const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="logo" height={32} width={38} />
                <h2 className="text-primary-200">PrepWise</h2>
            </div>
            <h3> Practice job interview with AI</h3>
       
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-ful space-y-6 mt-4 form">
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
              type="text"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your Email Address"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder=""
            type="password" 
          />

        <Button className="btn " type="submit">{isSignIn ? 'sign in' : 'Create an account'}</Button>
      </form>
    </Form>
    <p className="text-center">{isSignIn ? 'New here? Create an account' : 'Already have an account?'} <Link className="font-bold text-user-primary ml-1" href={!isSignIn ? '/sign-in' : '/sign-up'}>{!isSignIn ? 'Sign in' : 'Sign up'}</Link></p>
    </div>
     </div>
  )
}

export default AuthForm
