<template>
  <VForm>
    <div
      v-for="field in schema.fields" :key="field.name">
      <label :for="field.name">{{ field.label }}</label>
      <Field :as="field.as" :id="field.name" :name="field.name" />
    </div>
    <button>Submit</button>
  </VForm>
</template>
<script>
export default {
  name: 'DynamicForm',
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
};
</script>