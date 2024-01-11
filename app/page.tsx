import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { PhoneForm } from "@/components/forms/phone-form"
import { PhoneFormUsingYup } from "@/components/forms/phone-form-using-yup"

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Tanzania Phone Validator
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            The best Library to validate your Tanzanian Phone Numbers
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.npm}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Npm
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.analytics}
            className={buttonVariants({ variant: "outline" })}
          >
            Page Analytics
          </Link>
        </div>
      </section>

      <section
        className="container grid items-center gap-6 pb-8 pt-6 md:py-10"
        key="form"
      >
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            You can test the validation below
          </h1>
          <h4 className="mt-6 text-lg font-bold ">Using Zod</h4>
          <PhoneForm />
          <h4 className="mt-12 text-lg font-bold">Using Yup</h4>
          <PhoneFormUsingYup />
        </div>
      </section>
    </>
  )
}
