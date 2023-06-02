import { useRef, useEffect } from 'react'
import echarts from '@/config/echart'
import { debounce } from "@/utils";
import { shallowEqual, useSelector } from "react-redux";

function BarChart() {
  const barRef = useRef(null)
  const chartRef = useRef<any>(null)
  const debounceResizeRef = useRef<any>(null)
  const { siderCollapse } = useSelector((state: any) => state.globalConfig, shallowEqual)
  const setOptions = (cht: any) => {
    const animationDuration = 3000
    cht.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        },
        {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        },
        {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }
      ]
    })
  }
  const initChart = () => {
    if (!barRef.current) return;
    chartRef.current = echarts.init(barRef.current)
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
  }, [])
  return (
    <div ref={barRef} style={{ height: '300px', width: '100%' }} />
  )
}
export default BarChart
