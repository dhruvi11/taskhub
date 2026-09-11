import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const region = process.env.AWS_REGION;
const fromEmail = process.env.SES_FROM_EMAIL;

if (!region) {
  throw new Error("AWS_REGION is not configured");
}

if (!fromEmail) {
  throw new Error("SES_FROM_EMAIL is not configured");
}

const sesClient = new SESv2Client({
  region,
});

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  async sendEmail({ to, subject, html, text }: SendEmailInput) {
    const command = new SendEmailCommand({
      FromEmailAddress: fromEmail,

      Destination: {
        ToAddresses: [to],
      },

      Content: {
        Simple: {
          Subject: {
            Data: subject,
            Charset: "UTF-8",
          },

          Body: {
            Html: {
              Data: html,
              Charset: "UTF-8",
            },

            Text: {
              Data: text,
              Charset: "UTF-8",
            },
          },
        },
      },
    });

    return sesClient.send(command);
  }

  async sendSafeEmail(input: SendEmailInput) {
    try {
      const result = await this.sendEmail(input);

      console.log(`Email sent successfully to ${input.to}`);

      return result;
    } catch (error) {
      console.error(`Failed to send email to ${input.to}:`, error);

      return null;
    }
  }
}

export const emailService = new EmailService();
