import type { RootState } from '@/app/store';
import { lazy, Suspense } from 'react';
// import { useAppSelector } from '@/app/redux/hooks';
// import { RootState } from '@/app/redux/store';
import { PiGenderIntersexBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

// Lazy load ReactApexChart
const ReactApexChart = lazy(() => import('react-apexcharts'));

const GenderDonutChart = () => {
  const { statistics } = useSelector((state: RootState) => state.organization);

  const numberOfActiveMalePatients = statistics?.patients?.active_male || 50;
  const numberOfActiveFemalePatients = statistics?.patients?.active_female || 50;

  const series = [numberOfActiveMalePatients, numberOfActiveFemalePatients];

  const options: ApexCharts.ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Male', 'Female'],
    colors: ['#E74E54', '#009899'],
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { width: 0 },
    plotOptions: { pie: { donut: { size: '90%' } } },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 10 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div className="relative grid place-items-center h-full">
      <Suspense fallback={<div>Loading Chart...</div>}>
        <ReactApexChart options={options} series={series} type="donut" width={80} />
      </Suspense>
      <div className="absolute inset-0 flex items-center justify-center w-[inherit] h-[inherit] mt-[-5px] right-[-4px]">
        <PiGenderIntersexBold className="text-[#808691] w-[26px] h-[26px] m-0 p-0" />
      </div>
    </div>
  );
};

export default GenderDonutChart;
