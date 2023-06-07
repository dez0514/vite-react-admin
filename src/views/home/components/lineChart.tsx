import { useRef, useEffect } from 'react'
import echarts from '@/config/echart'
import { debounce } from "@/utils";
import { shallowEqual, useSelector } from "react-redux";

function LineChart({ expectedData, actualData }: any) {
  const lineRef = useRef(null)
  const chartRef = useRef<any>(null)
  const debounceResizeRef = useRef<any>(null)
  const { siderCollapse } = useSelector((state: any) => state.globalConfig, shallowEqual)
  const setOptions = (cht: any) => {
    cht.setOption({
      backgroundColor: "#fff",
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 30,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        padding: [5, 10],
      },
      yAxis: {
        axisTick: {
          show: false,
        },
      },
      legend: {
        data: ["expected", "actual"],
      },
      series: [
        {
          name: "expected",
          itemStyle: {
            color: "#FF005A",
          },
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
          smooth: true,
          type: "line",
          data: expectedData,
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        },
        {
          name: "actual",
          smooth: true,
          type: "line",
          itemStyle: {
            color: "#3888fa",
          },
          areaStyle: {
            color: "#f3f8ff",
          },
          lineStyle: {
            color: "#3888fa",
            width: 2,
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: "quadraticOut",
        },
      ],
    })
  }
  const initChart = () => {
    if (!lineRef.current) return;
    chartRef.current = echarts.init(lineRef.current)
    setOptions(chartRef.current)
    debounceResizeRef.current = debounce(chartRef.current.resize, 300)
  }
  const resize = () => {
    if (debounceResizeRef.current && typeof debounceResizeRef.current === 'function') {
      debounceResizeRef.current()
    }
  }
  useEffect(() => {
    resize()
  }, [siderCollapse])
  useEffect(() => {
    initChart()
    window.addEventListener("resize", () => resize())
    return () => {
      window.removeEventListener("resize", () => resize())
    }
  }, [expectedData, actualData])
  return (
    <div ref={lineRef} style={{ height: '300px', width: '100%' }} />
  )
}
export default LineChart
