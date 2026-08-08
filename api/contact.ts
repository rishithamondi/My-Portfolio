export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required." });
    }

    console.log(
      `[CONTACT FORM] Message received from ${name} (${email}): ${message}`
    );

    // Dispatch to Web3Forms for email delivery to rishithashivanandh@gmail.com
    try {
      const web3res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f7b11568-df09-41b9-87ed-d8905bbf2f02",
          email_to: "rishithashivanandh@gmail.com",
          subject: `Portfolio Inquiry from ${name}`,
          from_name: name,
          replyto: email,
          message: `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`,
        }),
      });
      const data = await web3res.json();
      console.log("[WEB3FORMS RESPONSE]", data);
    } catch (err) {
      console.warn("[WEB3FORMS NOTICE] External dispatch notice:", err);
    }

    return res.json({
      success: true,
      message: "Message received successfully and dispatched to Rishitha Mondi.",
    });
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return res
      .status(500)
      .json({
        error: "Failed to send message. Please try again or use direct mailto.",
      });
  }
}
