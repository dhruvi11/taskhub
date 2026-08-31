export const welcomeEmail = ({
  name,
}: {
  name: string;
}) => ({
  subject: "Welcome to TaskHub",

  text: `
Hi ${name},

Welcome to TaskHub!

Your account has been successfully created.

You can now create projects, manage tasks,
and collaborate with your team.

Thanks,
TaskHub Team
`,

  html: `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f8fafc; padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;padding:32px;border-radius:12px;">
    <h1 style="color:#2563eb;">Welcome to TaskHub 👋</h1>

    <p>Hi ${name},</p>

    <p>
      Your TaskHub account has been successfully created.
    </p>

    <p>
      You can now create projects, manage tasks,
      and collaborate with your team.
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