import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps{
    username:string
    resetUrl:string
    userEmail:string
}

const ForgotPasswordEmail = (props:ForgotPasswordEmailProps) => {
  const { username,userEmail,resetUrl} = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[580px] mx-auto p-[48px]">
            {/* Header */}
            <Section>
              <Heading className="text-[32px] font-bold text-gray-900 text-center mb-[32px] m-0">
                Reset Your Password
              </Heading>
            </Section>

            {/* Main Content */}
            <Section>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px] m-0">
                Hello, {username}
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px] m-0">
                We received a request to reset the password for your account associated with {userEmail}.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[32px] m-0">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white text-[16px] font-semibold py-[12px] px-[32px] rounded-[6px] no-underline box-border hover:bg-blue-700"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] m-0">
                If the button doesn&apos;t work, you can copy and paste this link into your browser:
              </Text>
              
              <Text className="text-[14px] text-blue-600 leading-[20px] mb-[32px] m-0 break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[0px] m-0">
                If you didn&apos;t request this password reset, please ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[32px] mt-[48px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0">
                © 2025 Your Company Name. All rights reserved.
              </Text>
              
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mt-[8px]">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mt-[8px]">
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

/*PasswordResetEmail.PreviewProps = {
  userEmail: 'ziyadhhamzah@gmail.com',
  resetUrl: 'https://yourapp.com/reset-password?token=abc123xyz',
};*/

export default ForgotPasswordEmail;