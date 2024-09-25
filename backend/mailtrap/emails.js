import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "3ffdcd9c-cb9f-4f5c-bf8a-3dda3ba85ea8",
      template_variables: {
        name: name,
        company_info_name: "Auth Testing Company",
      },
    });

    console.log("Weclome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome ${error}`);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Reset password email sent successfully", response);
  } catch (error) {
    console.error(`Error sending reset password ${error}`);
    throw new Error(`Error sending reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async email => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
  }
};
