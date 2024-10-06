<template>
  <div style="margin-bottom: 1em;">
    <Badge
      type="tip"
      :text="createdDateString"
    />

    <Badge
      type="info"
      :text="updatedDateString"
    />

    <Badge
      type="warning"
      v-if="ogDate"
      :text="ogDateString"
    />

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  createdTimestamp: {
    type: String,
    required: true
  },
  updatedTimestamp: {
    type: String,
    required: true
  },
  ogDate: {
    type: String,
    required: false
  },
});

//should be unified to the one in SiteMetadataService.#getCardBody
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const formatTs = (ts) => new Date(ts).toLocaleDateString("it-IT", options);
const createdDateString = computed(() => `Created on ${formatTs(props.createdTimestamp)}`);
const updatedDateString = computed(() => `Updated on ${formatTs(props.updatedTimestamp)}`);

const formatDate = (dts) => new Date(dts).toLocaleDateString("it-IT", options);
const ogDateString = computed(() => `Originally created on ${formatDate(props.ogDate)}`);

</script>