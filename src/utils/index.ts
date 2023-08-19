import domainEndings from "../utils/domainEndings.json";

export const handleConstructUrlString = (
  searchQuery: string,
  selectedDomains: string[]
) => {
  let domainUrls: string[] = [];

  if (selectedDomains.length > 0) {
    domainUrls = selectedDomains.map((domain) => searchQuery + domain);
  } else {
    domainUrls = domainEndings.map((domain) => searchQuery + domain);
  }

  return domainUrls.join(",");
};
