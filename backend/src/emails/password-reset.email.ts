export const passwordResetEmail = ({
  name,
  resetUrl,
}: {
  name: string;
  resetUrl: string;
}) => ({
  subject: "Reset your TaskHub password",

  text: `
Hi ${name},

We received a request to reset your TaskHub password.

Use this link to reset your password:

${resetUrl}

This link will expire soon.

If you did not request this, you can safely ignore this email.

Thanks,
TaskHub Team
`,

  html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;padding:32px;border-radius:12px;">
    <h1 style="color:#2563eb;">Reset your password</h1>

    <p>Hi ${name},</p>

    <p>
      We received a request to reset your TaskHub password.
    </p>

    <p>
      <a
        href="${resetUrl}"
        style="
          display:inline-block;
          background:#2563eb;
          color:white;
          padding:12px 20px;
          border-radius:8px;
          text-decoration:none;
        "
      >
        Reset Password
      </a>
    </p>

    <p>This link will expire soon.</p>

    <p>
      If you did not request this, you can safely ignore this email.
    </p>

    <p>
      Thanks,<br/>
      <strong>TaskHub Team</strong>
    </p>
  </div>
</body>
</html>
`,
});
