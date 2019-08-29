<template>
<div>
  <apexchart :width="width" :type="type" :options="data.options" :series="data.series"></apexchart>
</div>
</template>

<script>
  export default {
    props: [
      'width',
      'type',
      'data'
    ]
  }
</script>