<template>
    <div>
        <chartjs-bar 
            v-for="(item, index) in types"
            :key="index"
            :backgroundcolor="item.bgColor"
            :beginzero="beginZero"
            :bind="true"
            :bordercolor="item.borderColor"
            :data="item.data"
            :datalabel="item.dataLabel"
            :labels="labels"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            beginZero: true,
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            types: [
                {
                bgColor: "#de98ab",
                borderColor: "0c0306",
                data: [1, 3, 5, 7, 2, 4, 6],
                dataLabel: "Bar"
                }
            ]
        };
    }
}
</script>

<style scoped>

</style>
