import React from "react";
import ResizableBox from "../ResizableBox";
import useChartConfig from "../useConfig";
import { Chart } from "react-charts";
import * as d3 from "d3";
import { color } from "d3";

export default function CustomStyles() {
  const [{ activeSeriesIndex, activeDatumIndex }, setState] = React.useState({
    activeSeriesIndex: -1,
    activeDatumIndex: -1
  });

  return (
    <div>
      <BarChart 
        elementType="bar"
        setState={setState}
        activeDatumIndex={activeDatumIndex}
        activeSeriesIndex={activeSeriesIndex}
      />
    </div>
  );
}

function BarChart({ elementType,activeDatumIndex, activeSeriesIndex, setState }) {
  const { data } = useChartConfig({
        series: 1,
        dataType: "ordinal",
  });
  
  
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
            getDatumStyle: (datum, status) =>
              (activeDatumIndex === datum.index &&
              activeSeriesIndex === datum.seriesIndex
                ? {
                    opacity: 1,
                    circle: {
                      r: 5
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 2
                    }
                  }
                : datum.seriesIndex === activeSeriesIndex
                ? {
                    circle: {
                      r: 3
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 1
                    }
                  }
                : status === "groupFocused"
                ? {
                    circle: {
                      r: 2
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0
                    }
                  }
                : {
                    circle: {
                      r: 2
                    },
                    rectangle: {
                      stroke: "black",
                      strokeWidth: 0
                    }
                  }),
            getSeriesStyle: (series) => {
              return {
                color: `url(#${series.index % 1})`,
                opacity:
                  activeSeriesIndex > -1
                    ? series.index === activeSeriesIndex
                      ? 1
                      : 0.3
                    : 1
              };
            },
            onFocusDatum: (focused) =>
              setState({
                activeSeriesIndex: focused ? focused.seriesIndex : -1,
                activeDatumIndex: focused ? focused.index : -1
              }),
            renderSVG: () => (
              <defs>
                {/* <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#FF5A36" />
                  <stop offset="25%" stopColor="#FF9E3F" />
                  <stop offset="50%" stopColor="#ffd710" />
                  <stop offset="75%" stopColor="#86D200" />
                  <stop offset="100%" stopColor="#15AE00" />
                </linearGradient> */}
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
                {/* <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="50%" stopColor="#e5c367" />
                  <stop offset="100%" stopColor="#00ff2f" />
                </linearGradient>
                <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#00f000" />
                  <stop offset="50%" stopColor="#EEefge10" />
                  <stop offset="100%" stopColor="#EEfg3434" />
                </linearGradient>
                <linearGradient id="4" x1="0" x2="0" y1="1" y2="0">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="50%" stopColor="#EEfbee10" />
                  <stop offset="100%" stopColor="#EEfgb3434" />
                </linearGradient> */}
              </defs>
            )
          }}
        />
      </ResizableBox>
    </>
  );
}





