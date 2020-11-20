<template>
  <div>
    <v-select
      class="project__select pa-1"
      v-model="project"
      single-line
      :items="projects"
      item-text="code"
      item-value="_id"
      clearable
      label="Choose project"
      color="teal accent-3"
      filled
      required
      @change="fetchDrawing"
      @keyup="updateItem(index)"
      @blur="updateItem(index)"
      @paste="updateItem(index)"
      @delete="updateItem(index)"
    ></v-select>
    <v-select
      class="drawing__select pa-1"
      v-model="item[index].drawing"
      single-line
      :items="drawings"
      item-text="code"
      item-value="_id"
      clearable
      label="Choose activity"
      color="teal accent-3"
      filled
      required
    ></v-select>
  </div>
</template>
