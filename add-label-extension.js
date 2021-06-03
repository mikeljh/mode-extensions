const H = Highcharts;

const addDataLabel = function (chartId, chartConfig) {
  H.Chart.prototype.callbacks.push(function (chart) {
    // Find the chart this configuration should be applied to.
    const container = $(chart.container);
    const parent = container.parents('#' + chartId);
    const shouldApplyToChart = parent.length > 0;

    if (shouldApplyToChart) {
      let prependEmptySeries = [];

      for (let i = 0; i < chartConfig.seriesIndex; i++) {
        prependEmptySeries.push({});
      }

      chart.update({
        series: [
          ...prependEmptySeries,
          {
            dataLabels: {
              verticalAlign: 'top',
              y: -30,
              enabled: true,
              formatter: function () {
                let value = this.y;

                if (chartConfig.multiply) {
                  value = value * chartConfig.multiply;
                }

                if (chartConfig.divide) {
                  value = value / chartConfig.divide;
                }

                if (chartConfig.decimals !== undefined) {
                  value = Number.parseFloat(value).toFixed(
                    chartConfig.decimals,
                  );
                }

                if (chartConfig.prefix) {
                  value = `${chartConfig.prefix}${value}`;
                }

                if (chartConfig.postfix) {
                  value = `${value}${chartConfig.postfix}`;
                }

                return value;
              },
              padding: 10,
            },
          },
        ],
      });
    }
  });
};

/*
 * Example usage:
 *
 * addDataLabel('chart_1e7b202d0368', {
 *  decimals: 2,
 *  divide: 1000,
 *  multiply: 1,
 *  prefix: '€',
 *  postfix: 'k',
 *  seriesIndex: 0,
 * });
 */
