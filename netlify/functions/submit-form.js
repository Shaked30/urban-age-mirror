const { Resend } = require('resend');
const { google } = require('googleapis');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: process.env.GOOGLE_SHEETS_CREDENTIALS ? JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS) : null,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets('v4');

/**
 * Send email notification via Resend
 */
async function sendEmailNotification(formData) {
  try {
    const { name, phone, email, address, hearAbout, consent } = formData;

    const emailHtml = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A90A4;">שליחת פרטים חדשה מהאתר</h2>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>אימייל:</strong> ${email}</p>
          <p><strong>כתובת הבניין:</strong> ${address}</p>
          ${hearAbout ? `<p><strong>שמע עלינו מ:</strong> ${hearAbout}</p>` : ''}
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-right: 4px solid #4A90A4; margin: 20px 0;">
          <p style="margin: 0;"><strong>הסכמות:</strong></p>
          <p style="margin: 5px 0;">✓ הסכמה לקבלת פניות</p>
          ${consent ? '<p style="margin: 5px 0;">✓ הסכמה לקבלת עדכונים שיווקיים</p>' : ''}
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

        <p style="color: #666; font-size: 12px;">
          נשלח מטופס יצירת קשר באתר Urban Age<br>
          תאריך: ${new Date().toLocaleString('he-IL')}
        </p>
      </div>
    `;

    // TEST MODE - Just log to console without sending actual email
    if (process.env.TEST_MODE === 'true') {
      console.log('=== TEST MODE - Email would be sent ===');
      console.log('From:', process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev');
      console.log('To:', process.env.NOTIFICATION_EMAIL || 'tal@urban-age.com');
      console.log('Subject:', `שליחת פרטים חדשה מ-${name}`);
      console.log('Reply-To:', email);
      console.log('Form Data:', formData);
      console.log('=====================================');
      return { success: true, data: { id: 'test-mode', message: 'Test mode - no email sent' } };
    }

    // Skip if no API key configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - email not sent');
      return { success: false, error: 'Resend API key not configured' };
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.NOTIFICATION_EMAIL || 'tal@urban-age.com',
      subject: `שליחת פרטים חדשה מ-${name}`,
      html: emailHtml,
      replyTo: email,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Log submission to Google Sheets
 */
async function logToGoogleSheets(formData) {
  try {
    const { name, phone, email, address, hearAbout, consent } = formData;

    // TEST MODE - Just log to console without writing to sheets
    if (process.env.TEST_MODE === 'true') {
      console.log('=== TEST MODE - Would log to Google Sheets ===');
      console.log('Form Data:', formData);
      console.log('============================================');
      return { success: true, data: { message: 'Test mode - no sheets logging' } };
    }

    const authClient = await auth.getClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      console.warn('Google Sheet ID not configured - skipping sheets logging');
      return { success: false, error: 'Sheet ID not configured' };
    }

    const timestamp = new Date().toLocaleString('he-IL', {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const values = [
      [
        timestamp,
        name,
        phone,
        email,
        address,
        hearAbout || '',
        consent ? 'כן' : 'לא',
        'חדש' // Status column
      ]
    ];

    const response = await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range: 'Sheet1!A:H', // Adjust sheet name if needed
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    console.log('Logged to Google Sheets:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Main handler function
 */
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse form data
    const formData = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required fields',
          fields: missingFields
        }),
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Send email notification
    const emailResult = await sendEmailNotification(formData);

    // Log to Google Sheets
    const sheetsResult = await logToGoogleSheets(formData);

    // Prepare response
    const response = {
      success: true,
      email: emailResult.success,
      sheets: sheetsResult.success,
      message: 'הפרטים נשלחו בהצלחה! ניצור איתך קשר בקרוב.',
    };

    // If both failed, return error
    if (!emailResult.success && !sheetsResult.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to process submission',
          details: {
            email: emailResult.error,
            sheets: sheetsResult.error
          }
        }),
      };
    }

    // Success response (even if one service failed)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }),
    };
  }
};
