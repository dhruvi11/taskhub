export const taskAssignmentEmail = ({
  name,
  taskTitle,
  projectName,
}: {
  name: string;
  taskTitle: string;
  projectName: string;
}) => ({
  subject: `Task assigned: ${taskTitle}`,

  text: `
Hi ${name},

You have been assigned a new task.

Task: ${taskTitle}
Project: ${projectName}

Please open TaskHub to view the task details.

Thanks,
TaskHub Team
`,

  html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f8fafc;padding:40px;">
  <div style="max-width:600px;margin:auto;background:white;padding:32px;border-radius:12px;">
    <h1 style="color:#2563eb;">New Task Assigned</h1>

    <p>Hi ${name},</p>

    <p>
      You have been assigned a new task.
    </p>

    <p>
      <strong>Task:</strong> ${taskTitle}<br/>
      <strong>Project:</strong> ${projectName}
    </p>

    <p>
      Please open TaskHub to view the task details.
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