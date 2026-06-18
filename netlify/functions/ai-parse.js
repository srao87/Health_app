exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const key = process.env.OPENAI_KEY;
  if (!key) {
    return { statusCode: 500, headers: {'content-type':'application/json'}, body: JSON.stringify({error:{message:'OPENAI_KEY not set in Netlify environment variables.'}}) };
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'authorization': `Bearer ${key}` },
      body: event.body
    });
    const data = await res.json();
    return { statusCode: res.status, headers: {'content-type':'application/json'}, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers: {'content-type':'application/json'}, body: JSON.stringify({error:{message:err.message}}) };
  }
};
