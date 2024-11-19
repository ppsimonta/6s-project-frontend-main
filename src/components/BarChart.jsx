import React from "react";
import { Chart } from "react-charts";
import ResizableBox from "../ResizableBox";
import useChartConfig from "../useConfig";

function MyChart({ elementType, data }) {

  /* const datas = useChartConfig({
    series: 1,
    dataType: "ordinal",
  });
 */
    const primaryAxis = React.useMemo(
      () => ({
        getValue: (datum) => datum.primary
      }),
      []
    );
  
    const secondaryAxes = React.useMemo(
      () => [
        {
          getValue: (datum) => datum.secondary,
          elementType,
          hardMin: 0
        }
      ],
      [elementType]
    );
  
    return (
      <>
      <ResizableBox>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              getSeriesStyle: (series) => {
                return {
                  color: `url(#${series.index % data.length})`
                };
              },
              renderSVG: () => (
                <defs>
                  <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="4" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="5" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="6" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                <linearGradient id="7" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00c9e5" />
                  <stop offset="25%" stopColor="#00b3d5" />
                  <stop offset="50%" stopColor="#0095d5" />
                  <stop offset="75%" stopColor="#0078d5" />
                  <stop offset="100%" stopColor="#0069d5" />
                </linearGradient>
                </defs>
              )
            }}
          />
        </ResizableBox>
      </>
    );
}

export default MyChart