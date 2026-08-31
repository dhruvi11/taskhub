export const projectInvitationEmail = ({
  name,
  projectName,
  role,
}: {
  name: string;
  projectName: string;
  role: string;
}) => ({
  subject: `You've been added to ${projectName}`,

  text: `
Hi ${name},

You have been added to the project "${projectName}".

Your project role is: ${role}

You can now access the project and collaborate with your team.

Thanks,
TaskHub Team
`,

  html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;padding:32px;border-radius:12px;">
    <h1 style="color:#2563eb;">Project Invitation</h1>

    <p>Hi ${name},</p>

    <p>
      You have been added to the project
      <strong>${projectName}</strong>.
    </p>

    <p>
      Your project role:
      <strong>${role}</strong>
    </p>

    <p>
      You can now access the project and collaborate with your team.
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