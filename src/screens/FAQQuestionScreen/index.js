import Head from "next/head";
import { Footer } from "../../components/commons/Footer";
import { Menu } from "../../components/commons/Menu";
import { cmsService } from "../../infra/cms/cmsService";
import { Box, Text, theme } from "../../theme/components";

import { renderNodeRule, StructuredText } from "react-datocms";
import { isHeading } from "datocms-structured-text-utils";
import CMSProvider from "../../infra/cms/CMSProvider";
import { pageHOC } from "../../components/wrappers/pageHOC";

export async function getStaticPaths() {
  const pathsQuery = `
    query($first: IntType, $skip: IntType) {
      allContentFaqQuestions(first: $first, skip: $skip) {
        id
        title
      }
    }
  `;
  const { data } = await cmsService({
    query: pathsQuery,
    variables: {
      "first": 100,
      "skip": 0
    }
  });

  const paths = data.allContentFaqQuestions.map(({ id }) => {
    return {
      params: { id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview }) {
  const { id } = params;

  const contentQuery = `
  query($id: ItemId) {
    contentFaqQuestion(filter: {
      id: {
        eq: $id
      }
    }) {
      title
      content {
        value
      }
    }
  }
  `;

  const { data } = await cmsService({
    query: contentQuery,
    variables: {
      "id": id
    },
    preview,
  });

  console.log("Dados do CMS:", data);

  return {
    props: {
      cmsContent: data,
      id,
      title: data.contentFaqQuestion.title,
      content: data.contentFaqQuestion.content,
    },
  };
}

function FAQQuestionScreen({ cmsContent }) {
  // console.log(cmsContent.globalContent.globalFooter.description);
  return (
    <>
      <Head>
        <title>FAQ - Alura</title>
      </Head>

      <Menu />

      <Box
        tag="main"
        styleSheet={{
          flex: 1,
          backgroundColor: theme.colors.neutral.x050,
          paddingTop: theme.space.x20,
          paddingHorizontal: theme.space.x4,
        }}
      >
        <Box
          styleSheet={{
            flexDirection: "column",
            width: "100%",
            maxWidth: theme.space.xcontainer_lg,
            marginHorizontal: "auto",
          }}
        >
          {/* <h1>{title}</h1> */}
          <h1>{cmsContent.contentFaqQuestion.title}</h1>

          {/* <Box dangerouslySetInnerHTML={{ __html: content }} /> */}
          {/* <pre>{JSON.stringify(content, null, 4)}</pre> */}
          <StructuredText
            // data={content}
            data={cmsContent.contentFaqQuestion.content}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                return (
                  <Text key={key} tag="h3" variant="heading3">
                    {children}
                  </Text>
                );
              }),
            ]}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default pageHOC(FAQQuestionScreen);
