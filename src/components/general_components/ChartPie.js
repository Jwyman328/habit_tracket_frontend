import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import PropTypes from "prop-types";

/**
 * A pie Graph for a Habit's Total goal and current completed goal amount.
 * @param {number} props.total     --  Total goal amount of a Habit.
 * @param {Number} props.completed --  Habit activity time or count total.
 * @param {string} props.title     --  Title of Habit
 */


function PieChart({ total, completed, title }) {
  let thisState = {
    // To avoid unnecessary update keep all options in the state.
    chartOptions: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: ["Completed", "Remaining"],
      },
      series: [{ data: [1, 2] }],
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },
      series : [
        {
          name: title,
          colorByPoint: true,
          data: [
            {
              name: "Completed",
              y: completed,
              color: "#47ff63",
            },
            {
              name: "Remaining",
              y: total - completed,
              color: "#ff6633",
              sliced: true,
              selected: true,
            },
          ],
        },
      ],
    },
  };

  let { chartOptions } = thisState;

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
export default PieChart;
PieChart.propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
