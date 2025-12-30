<template>
    <div class="card cont-chart">

        <calendar-range>
            <calendar-month></calendar-month>
        </calendar-range>

        <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';

import { ref, onMounted } from "vue";
import "cally";


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

calendar-range {
    svg {
        height: 16px;
        width: 16px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
    }

    path {
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    &::part(months) {
        display: flex;
        gap: 1.5em;
        flex-wrap: wrap;
        justify-content: center;
    }

    &::part(button) {
        border: 1px solid #adb5bd;
        background-color: #fff;
        border-radius: 3px;
        width: 26px;
        height: 26px;
    }

    &::part(button):focus-visible {
        outline: 2px solid #7048e8;
    }
}

calendar-month {
    --color-accent: #005eff;
    --color-text-on-accent: #ffffff;

    &::part(button) {
        border-radius: 3px;
    }

    &::part(range-inner) {
        border-radius: 0;
        background-color: #5795ff;
    }

    &::part(range-start) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    &::part(range-end) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
    }

    &::part(range-start range-end) {
        border-radius: 3px;
    }
}
</style>