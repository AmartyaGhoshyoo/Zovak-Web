import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const projectType = String(formData.get("project-type") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const requestType =
      String(formData.get("request-type") ?? "").trim() ||
      "Project inquiry";

    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["b22cs002@nitm.ac.in"],
      replyTo: email,
      subject: `${requestType} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Request Type:</strong> ${requestType}</p>
        <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
        <p><strong>Budget:</strong> ${budget || "N/A"}</p>

        <h3>Message</h3>
        <p>${message || "No message provided."}</p>
      `,
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}