import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerificationEmail from "@/components/emails/verification-email";
const resend = new Resend(process.env.RESEND_API_KEY as string);

// setup fitur di better auth
export const auth = betterAuth({
  // fitur sinkronasi dengan databasa drizz le
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  // fitur verifikasi email
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        from: "Ziyad App Support <admin@support.ziyadhamzah.my.id>",
        to: user.email,
        subject: "Email Verification",
        react: VerificationEmail({ userName: user.name, verificationUrl: url }),
      });

      if (error) {
        console.error(
          "gagal mengirim email melalui resend, pesan error dari resend nya adalah:",
          {
            email: user.email,
            name: user.name,
            error,
          }
        );
      } else {
        console.log(
          "email dari resend berhasil terkirim alhamdulillah dari data berikut: ",
          {
            email: user.email,
            name: user.name,
            data,
          }
        );
      }
    },
    // dibawah ini fitur kirim email verifikasi akan aktif setelah user daftar akun
    sendOnSignUp: true,
    // mengatur waktu expired link - counted by second
    //expiresIn:3600
    // fitur sign in otomatis bila sudah ter verifikasi
    // autoSignInAfterVerification:true
  },

  // fitur login dengan email dan password - pr login dengan username/email & password
  emailAndPassword: {
    enabled: true,
    // dibawah ini fitur wajib verifikasi email, kalau butuh cukup tinggal dinyalakan
    //   requireEmailVerification: true,
    // fitur untuk reset password
    sendResetPassword: async ({ user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        // from: 'Acme <onboarding@resend.dev>',
        from: "Ziyad App Support <admin@support.ziyadhamzah.my.id>",
        to: user.email,
        subject: "Reset you password",
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
      if (error) {
        console.error(
          "gagal mengirim email melalui resend, pesan error dari resend nya adalah:",
          {
            email: user.email,
            name: user.name,
            error,
          }
        );
      } else {
        console.log(
          "email dari resend berhasil terkirim alhamdulillah dari data berikut: ",
          {
            email: user.email,
            name: user.name,
            data,
          }
        );
      }
    },
  },
  socialProviders: {
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    // pr
    // facebook: {
    // clientId: process.env.FACEBOOK_CLIENT_ID as string,
    // clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    // },
  },
  plugins: [nextCookies()], //untuk mengembalikan non-login yg mengakses route member aplikasi
});

