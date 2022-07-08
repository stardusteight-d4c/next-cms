const TOKEN = process.env.DATO_TOKEN;

export async function cmsService({ query }) {
  try {
    const pageContentResponse = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify({
        query,
      }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      console.log("body", body);
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    // console.log("pageContentResponse", pageContentResponse);
    return {
      data: pageContentResponse.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}