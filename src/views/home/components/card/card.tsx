import { useCountUp } from 'use-count-up'
import styles from './card.module.scss'
import classNames from 'classnames'
interface TypeCard {
  start: number
  end: number
  duration: number
  title: string
  prefix: string
  icon?: any
  badge?: any
  info?: any
}
function MyCard({ start, end, duration, title, prefix, icon, badge, info }: TypeCard) {
  const formatter = (value: number ,unit: string) => {
    return `${unit} ${value}`
  }
  const { value, reset } = useCountUp({
    isCounting: true,
    start,
    end,
    duration
  });
  return (
    <div className={classNames(styles.cardItem, styles.bgPrimary)}>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyIcon}>{ icon }</div>
        <div className={styles.textWhite}>
          <h6 className={classNames(styles.textUppercase, styles.textWhite)}>{ title }</h6>
          <h2 className={classNames(styles.textWhite, styles.mb24)}>
            {/* <CountUp isCounting start={start} end={end} duration={duration} formatter={ (val: number) => formatter(val, prefix)} /> */}
            <div className={styles.cardPanelNum}>{value}</div>
          </h2>
          <div className={styles.badgeBox}>
            { badge }
          </div>
          <div className={styles.cardInfo}>
            { info }
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyCard
