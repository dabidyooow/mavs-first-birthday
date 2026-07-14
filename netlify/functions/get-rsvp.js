exports.handler = async function () {
  const token = process.env.NETLIFY_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  try {
    const response = await fetch(
  `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
    {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }
    );

    const forms = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(forms)
        };

    if (!rsvpForm) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "RSVP form not found"
        })
      };
    }

    const submissions = await fetch(
      `https://api.netlify.com/api/v1/forms/${rsvpForm.id}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await submissions.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};