/**
 * HTML e-mail templates for the contact form.
 * The inquiry is rendered as a clean table so Avish can scan it in seconds.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
};

/** Escape user input before it goes anywhere near an HTML email. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string, shade = false) {
  return `
    <tr style="background:${shade ? "#f6f4ef" : "#ffffff"}">
      <td style="padding:13px 18px;border:1px solid #e5e2d9;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8578;white-space:nowrap;vertical-align:top;width:150px;">${label}</td>
      <td style="padding:13px 18px;border:1px solid #e5e2d9;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#12110f;line-height:1.55;">${value}</td>
    </tr>`;
}

export function buildInquiryEmail(p: ContactPayload, receivedAtIst: string) {
  const subject = `New Inquiry — ${p.name} · ${p.projectType}`;

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#efede5;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#12110f;padding:26px 28px;">
      <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.3em;color:#ff4d00;text-transform:uppercase;">Portfolio · Contact Form</p>
      <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:600;color:#f6f4ef;">New Project Inquiry<span style="color:#ff4d00;">.</span></h1>
    </div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e5e2d9;">
      ${row("Name", esc(p.name))}
      ${row("Email", `<a href="mailto:${esc(p.email)}" style="color:#d63f00;text-decoration:none;">${esc(p.email)}</a>`, true)}
      ${row("Phone", esc(p.phone || "—"))}
      ${row("Project Type", esc(p.projectType), true)}
      ${row("Budget", esc(p.budget || "Not disclosed"))}
      ${row("Message", esc(p.message).replace(/\n/g, "<br/>"), true)}
      ${row("Received (IST)", esc(receivedAtIst))}
    </table>
    <div style="background:#12110f;padding:18px 28px;">
      <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.2em;color:rgba(246,244,239,0.55);text-transform:uppercase;">Reply directly to this email to respond to ${esc(p.name)} · avishboricha.dev</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    "NEW PROJECT INQUIRY",
    "-------------------",
    `Name:         ${p.name}`,
    `Email:        ${p.email}`,
    `Phone:        ${p.phone || "—"}`,
    `Project Type: ${p.projectType}`,
    `Budget:       ${p.budget || "Not disclosed"}`,
    `Received IST: ${receivedAtIst}`,
    "",
    "Message:",
    p.message,
  ].join("\n");

  return { subject, html, text };
}

export function buildAutoReply(p: ContactPayload) {
  const subject = "Got your message — Avish Boricha";
  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#efede5;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#12110f;padding:26px 28px;">
      <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.3em;color:#ff4d00;text-transform:uppercase;">Avish Boricha · Python Full Stack Developer</p>
      <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:600;color:#f6f4ef;">Thanks for reaching out<span style="color:#ff4d00;">.</span></h1>
    </div>
    <div style="background:#ffffff;border:1px solid #e5e2d9;border-top:none;padding:26px 28px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#3a372f;">Hi ${esc(
        p.name.split(" ")[0]
      )},</p>
      <p style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#3a372f;">Your message about <strong>${esc(
        p.projectType
      )}</strong> just landed in my inbox. I personally read every inquiry and usually reply within <strong>24 hours</strong>.</p>
      <p style="font-family:Georgia,serif;font-size:15px;line-height:1.7;color:#3a372f;">Meanwhile, feel free to explore the live projects on my portfolio.</p>
      <p style="margin:22px 0 0;font-family:Georgia,serif;font-size:15px;color:#3a372f;">— Avish Boricha<br/><span style="font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a8578;">+91 94296 80396 · avishahir4812@gmail.com · Ahmedabad, India</span></p>
    </div>
  </div>
</body>
</html>`;
  const text = `Hi ${p.name.split(" ")[0]},\n\nThanks for reaching out about "${p.projectType}". I usually reply within 24 hours.\n\n— Avish Boricha\n+91 94296 80396 · avishahir4812@gmail.com`;
  return { subject, html, text };
}
