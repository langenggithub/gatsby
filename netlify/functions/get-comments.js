const fetch = require("node-fetch");

exports.handler = async () => {
  const NETLIFY_API_TOKEN = process.env.nfp_bAFVyG7frvnzSF7BMHdZmMCNRET7GYtc0264; // 你的 Netlify API Token
  const SITE_ID = process.env.47f4057c-ba48-4cc3-88df-688dfee1c895; // Netlify 網站 ID
  const FORM_NAME = "contact-comments"; // Netlify Forms 表單名稱

  try {
    // 取得 Netlify Forms 的所有表單
    const formsResponse = await fetch(`https://api.netlify.com/api/v1/forms?access_token=${NETLIFY_API_TOKEN}`);
    const forms = await formsResponse.json();

    // 找到 "contact-comments" 表單
    const form = forms.find(f => f.name === FORM_NAME);
    if (!form) {
      return { statusCode: 404, body: JSON.stringify({ message: "找不到評論表單" }) };
    }

    // 取得該表單的評論提交
    const submissionsResponse = await fetch(`https://api.netlify.com/api/v1/forms/${form.id}/submissions?access_token=${NETLIFY_API_TOKEN}`);
    const submissions = await submissionsResponse.json();

    // 整理評論內容
    const comments = submissions.map(sub => ({
      name: sub.data.name,
      email: sub.data.email,
      website: sub.data.website || "",
      role: sub.data.role || [],
      message: sub.data.message,
      created_at: sub.created_at
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(comments)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
