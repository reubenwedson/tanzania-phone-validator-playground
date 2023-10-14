"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { validateTanzanianPhoneNumber } from "tanzanian-phone-validator"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import { Input } from "../ui/input"

const FormSchema = z.object({
  phoneNumber: z.string().refine(
    (value) => {
      return validateTanzanianPhoneNumber(value)
    },
    {
      message: "Please enter a valid phone number",
    }
  ),
})

export function PhoneForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let result = {
      valueSubmitted: data.phoneNumber,
      isValid: validateTanzanianPhoneNumber(data.phoneNumber),
    }

    toast({
      title: "Here are the results :",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="0745787345" {...field} />
              </FormControl>
              <FormDescription>Enter your phone Number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
