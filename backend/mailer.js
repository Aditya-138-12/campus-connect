const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpMail = async (to, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Namma Voice <onboarding@resend.dev>',
      to,  // can be string (single recipient) or array
      subject: 'Your Login OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      // html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`, // optional for better formatting
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(error.message || 'Failed to send OTP email');
    }

    console.log('OTP email sent via Resend:', data?.id); // data.id is the email ID
    // You can return data if needed in caller
  } catch (err) {
    console.error('Error sending email:', err);
    throw err; // re-throw so caller (e.g., your route) can handle 500 error
  }
};

module.exports = sendOtpMail;