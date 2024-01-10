"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {
  getPhoneNumberDetails,
  isValidPhoneNumber,
} from "tanzanian-phone-validator"
import * as yup from "yup"

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

type Inputs = {
  phoneNumber: string
}

const FormSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .test(
      "test-valid-phone-number",
      "Please enter valid phone number",
      function (value: string | undefined) {
        return value ? isValidPhoneNumber(value) : false
      }
    )
    .required(),
})

export function PhoneFormUsingYup() {
  const form = useForm<Inputs>({
    resolver: yupResolver(FormSchema),
  })

  function onSubmit(data: Inputs) {
    let phoneNumberDetails = getPhoneNumberDetails(data.phoneNumber)
    let result = {
      "Phone Number": data.phoneNumber,
      Prefix: phoneNumberDetails?.telecomCompanyDetails?.prefix ?? "N/A",
      Company: phoneNumberDetails?.telecomCompanyDetails?.company ?? "N/A",
      Brand: phoneNumberDetails?.telecomCompanyDetails?.brand ?? "N/A",
      Operational:
        phoneNumberDetails?.telecomCompanyDetails?.operational ?? "N/A",
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
