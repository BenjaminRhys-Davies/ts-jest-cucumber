import { loadFeature } from 'jest-cucumber';

const tagPrefixToTitleWhiteList = ['@jira-'];
const shouldAppendTagToTitle = (tag: string) =>
  tagPrefixToTitleWhiteList.some(pf => new RegExp(`^${pf}`, 'i').test(tag));

export const options: Parameters<typeof loadFeature>[1] = {
  loadRelativePath: true,
  scenarioNameTemplate: ({ scenarioTags = [], scenarioTitle }) => {
    const tags = scenarioTags.filter(shouldAppendTagToTitle);
    return `${scenarioTitle}${tags.length ? ` [${tags.join(', ')}]` : ''}`;
  },
};
