const TOKEN = process.env.DATO_TOKEN;

const globalQuery = `
  query {
    globalFooter {
      description
    }
  }
`;

const BASE_ENDPOINT = "https://graphql.datocms.com/";
const PREVIEW_ENDPOINT = "https://graphql.datocms.com/preview";

export async function cmsService({ query, preview }) {
  const END_POINT = preview ? PREVIEW_ENDPOINT : BASE_ENDPOINT;
  try {
    const pageContentResponse = await fetch(END_POINT, {
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
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    const globalContentResponse = await fetch(END_POINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify({
        query: globalQuery,
      }),
    }).then(async (respostaDoServer) => {
      const body = await respostaDoServer.json();
      if (!body.errors) return body;
      throw new Error(JSON.stringify(body));
    });

    // console.log("pageContentResponse", pageContentResponse);
    return {
      data: {
        ...pageContentResponse.data,
        globalContent: { ...globalContentResponse.data },
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
