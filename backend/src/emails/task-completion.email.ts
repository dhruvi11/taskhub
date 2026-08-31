export const taskCompletionEmail = ({
  name,
  taskTitle,
  projectName,
}: {
  name: string;
  taskTitle: string;
  projectName: string;
}) => ({
  subject: `Task completed: ${taskTitle}`,

  text: `
Hi ${name},

The following task has been completed:

Task: ${taskTitle}
Project: ${projectName}

Thanks,
TaskHub Team
`,

  html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;padding:32px;border-radius:12px;">
    <h1 style="color:#16a34a;">Task Completed ✓</h1>

    <p>Hi ${name},</p>

    <p>
      The following task has been completed:
    </p>

    <p>
      <strong>Task:</strong> ${taskTitle}<br/>
      <strong>Project:</strong> ${projectName}
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