import { ApplSummary } from '@/schemas/application.schema';
import React from 'react';
import applicationsApi from '@/apis/applications.api';
import { Separator } from '../ui/separator';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const formatApplications = (data: ApplSummary[]) => {
  const datewiseEnteries: Record<string, ApplSummary[]> = {};
  data.forEach((row) => {
    if (datewiseEnteries[row.date]) {
      datewiseEnteries[row.date].push(row);
    } else {
      datewiseEnteries[row.date] = [row];
    }
  });
  const categories: string[] = [];
  const vectors: Record<string, number[]> = {
    pending: [],
    approved: [],
    rejected: [],
    'connection released': [],
  };
  Object.entries(datewiseEnteries).forEach(([date, rows]) => {
    categories.push(date);
    const statuses = {
      pending: 0,
      approved: 0,
      rejected: 0,
      'connection released': 0,
    };
    rows.forEach((row) => (statuses[row.status] = row.count));
    Object.entries(statuses).forEach(([status, count]) =>
      vectors[status].push(count)
    );
  });

  const series: ApexOptions['series'] = Object.entries(vectors).map(
    ([name, data]) => ({ name, data })
  );
  const options: ApexOptions = getChartOptions(categories);
  return { series, options };
};

const getChartOptions = (categories: string[]) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return options;
};

const Dashboard = () => {
  const [summary, setSummary] = React.useState<ApplSummary[]>([]);
  const chart = React.useMemo(() => formatApplications(summary), [summary]);
  React.useEffect(() => {
    applicationsApi.stats().then(setSummary);
  }, []);

  return (
    <div>
      {summary.length ? (
        <Chart
          options={chart.options}
          series={chart.series}
          height={600}
          type="bar"
        />
      ) : (
        <div>loading applications...</div>
      )}
    </div>
  );
};

export default Dashboard;
