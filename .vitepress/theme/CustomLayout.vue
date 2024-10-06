<template>
  <Layout>
    <template #doc-before>
      <CopyButton
        message="Link copied"
        label="Copy the link to this page"
        :content="`https://enibrn.github.io/dendron-vitepress-ui/${$frontmatter.id}`"
      />

      <Badges
        :createdTimestamp="$frontmatter.created"
        :updatedTimestamp="$frontmatter.updated"
        :ogDate="$frontmatter.vp?.ogdate"
      />
    </template>

    <template #doc-after>
      <Comments :pageId="$frontmatter.id" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import Badges from './components/Badges.vue';
import Comments from './components/Comments.vue';
import { inBrowser, useData, useRouter } from 'vitepress';
import { watch } from 'vue';
import CopyButton from './components/CopyButton.vue';
import redirects from '../redirects-data.json';

const { page } = useData();
const { go, route } = useRouter();
const { Layout } = DefaultTheme;

watch(
  () => page.value.isNotFound,
  (isNotFound) => {
    if (!isNotFound || !inBrowser) return;

    const redirect = getRedirectFromRoute(route.path);
    if (!redirect) return;

    go(redirect);
  },
  { immediate: true }
);

function getRedirectFromRoute(path) {
  if (!path) return null;

  //getting page guid from url
  const regex = /\/dendron-vitepress\/(.*?)\.html/;
  const match = path.match(regex);
  const guid = match ? match[1] : null;

  return redirects[guid];
}

</script>