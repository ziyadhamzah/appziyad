import ForgotPasswordEmail from "@/components/emails/reset-password";
import { ForgotPasswordForm } from "@/components/form/forgot-password-foms";
import { LoginForm } from "@/components/form/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
