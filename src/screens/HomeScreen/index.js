import { Menu } from "../../components/commons/Menu";
import { Footer } from "../../components/commons/Footer";
import { theme, Box, Button, Text, Image } from "../../theme/components";
import { pageHOC } from "../../components/wrappers/pageHOC";
import { cmsService } from "../../infra/cms/cmsService";
import { CMSSectionRender } from "../../infra/cms/CMSSectionRender";

export async function getStaticProps({ preview }) {
  const { data: cmsContent } = await cmsService({
    query: `
      query {
        pageHome {
          pageContent {
            section {
              componentName: __typename
              ... on CommonSeoBlockRecord {
                id
                title
              }
              ... on CommonMenuRecord {
                id
              }
              ... on PagehomeHerosectionRecord {
                id
                title
                description
                ctalink
                ctatext
              }
              ... on CommonFooterRecord {
                id
              }
            }
          }
        }
      }
    `,
    preview,
  });

  return {
    props: {
      cmsContent,
    },
  };
}

function HomeScreen() {
  return (
    <CMSSectionRender pageName="pageHome" />
  )
}

/*
function HomeScreen() {
  return (
    <>

      <Head>
        <title>Home - Alura</title>
      </Head>

  
      <Menu />



      <Footer />
    </>
  );
}
*/

export default pageHOC(HomeScreen);
