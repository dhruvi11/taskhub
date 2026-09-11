import "dotenv/config";

import { emailService } from "../services/email.service";

const main = async () => {
  const recipient = process.env.SES_TEST_EMAIL;

  if (!recipient) {
    throw new Error("SES_TEST_EMAIL is not configured");
  }

  const result = await emailService.sendEmail({
    to: recipient,

    subject: "TaskHub SES Test",

    text: "This is a TaskHub SES test email.",

    html: `
        <h2>TaskHub SES Test</h2>
        <p>
          This email was sent using
          Amazon SES.
        </p>
      `,
  });

  console.log("SES email sent successfully");

  console.log(result);
};

main().catch((error) => {
  console.error("SES email failed:", error);

  process.exit(1);
});
