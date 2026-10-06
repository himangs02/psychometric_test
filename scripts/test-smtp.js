const nodemailer = require('nodemailer');
require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

async function testSend() {
  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.trim();

  console.log('EMAIL_USER:', emailUser);
  console.log('EMAIL_PASS length:', emailPass ? emailPass.length : 0);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  try {
    console.log('1. Verifying SMTP...');
    await transporter.verify();
    console.log('✅ Transporter verified.');

    console.log(`2. Sending test email to ${emailUser}...`);
    const info = await transporter.sendMail({
      from: `"Geeta Personality Portal Test" <${emailUser}>`,
      to: emailUser,
      subject: 'Test Email from Psychometric Portal Diagnostic',
      text: 'If you are receiving this, SMTP configuration is working perfectly.',
      html: '<p>If you are receiving this, <b>SMTP configuration is working perfectly.</b></p>'
    });

    console.log('✅ Email sent successfully! Response:', info.response, 'Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

testSend().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
