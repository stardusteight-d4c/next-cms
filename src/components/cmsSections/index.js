import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PageFAQDisplayQuestionsSections } from "./PageFAQDisplayQuestionsSections";
import { PageHomeHeroSectionRecord } from "./PageHomeHeroSectionRecord";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
  PagefaqDisplayquestionSectionRecord: PageFAQDisplayQuestionsSections,
  CommonSeoBlockRecord: SEOBlock,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PagehomeHerosectionRecord: PageHomeHeroSectionRecord,
  CommonFooterRecord: (props) => <Footer {...props} />
}