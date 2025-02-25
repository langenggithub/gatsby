const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const NETLIFY_API_TOKEN = process.env.nfp_bAFVyG7frvnzSF7BMHdZmMCNRET7GYtc0264; 
    const SITE_ID = process.env.47f4057c-ba48-4cc3-88df-688dfee1c895;
    const FORM_NAME = "contact-comments";

    if (!NETLIFY_API_TOKEN || !SITE_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing API Token or Site ID" })
      };
    }

    // Fetch Netlify Forms
    const formsResponse = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/forms?access_token=${NETLIFY_API_TOKEN}`);
    const forms = await formsResponse.json();

    // Find the correct form
    const form = forms.find(f => f.name === FORM_NAME);
    if (!form) {
      return { statusCode: 404, body: JSON.stringify({ message: "Form not found" }) };
    }

    // Fetch form submissions (comments)
    const submissionsResponse = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?access_token=${NETLIFY_API_TOKEN}`);
    const submissions = await submissionsResponse.json();

    // Return formatted comments
    return {
      statusCode: 200,
      body: JSON.stringify(submissions)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

