import React from "react";
import get from "lodash/get";
import { pageHOC } from "../../components/wrappers/pageHOC";
import FAQQuestionScreen from "../../screens/FAQQuestionScreen";

const CMSContext = React.createContext({
  cmsContent: {},
});

export const getCMSContent = (path = "") => {
  const cmsContent = React.useContext(CMSContext).cmsContent;

  if (path === "") return cmsContent;

  const output = get(cmsContent, path);

  if (!output) throw new Error(`Não foi possível encontrar a chave "${path}". Reveja a Query`);

  return output;
};

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={{ cmsContent }}>{children}</CMSContext.Provider>
  );
}
