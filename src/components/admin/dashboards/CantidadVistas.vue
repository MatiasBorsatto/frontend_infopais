<template>
    <div class="card cont-chart">
        <DatePicker v-model="date" size="small" icon-display="button" date-format="dd/mm/yy" />
        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';

import { ref, onMounted } from "vue";
import DatePicker from 'primevue/datepicker';

const date = ref();


onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const dias: Array<string> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
const cantDias: Array<number> = [2, 3, 3, 4, 5, 3, 5]

const setChartData = () => {
    return {
        labels: dias,
        datasets: [
            {
                label: 'Sales',
                data: cantDias,
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<style scoped>
.cont-chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border: 1px solid rgb(192, 192, 192);
    border-radius: 1rem;
    box-shadow: .5rem .5rem .5rem rgb(226, 226, 226);
}

.p-chart {
    height: 20rem;
    width: 40rem;
}
</style>