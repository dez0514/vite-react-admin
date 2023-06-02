import { useRef, useEffect } from 'react'
import echarts from '@/config/echart'
import { debounce } from "@/utils";
import { shallowEqual, useSelector } from "react-redux";

function PieChart() {
  const pieRef = useRef(null)
  const chartRef = useRef<any>(null)
  const debounceResizeRef = useRef<any>(null)
  const { siderCollapse } = useSelector((state: any) => state.globalConfig, shallowEqual)
  const setOptions = (cht: any) => {
    cht.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
      },
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: 'Industries' },
            { value: 240, name: 'Technology' },
            { value: 149, name: 'Forex' },
            { value: 100, name: 'Gold' },
            { value: 59, name: 'Forecasts' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 3000
        }
      ]
    })
  }
  const initChart = () => {
    if (!pieRef.current) return;
    chartRef.current = echarts.init(pieRef.current)
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
    <div ref={pieRef} style={{ height: '300px', width: '100%' }} />
  )
}
export default PieChart
