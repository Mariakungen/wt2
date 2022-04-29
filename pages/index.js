import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 *
 *
 * @author Maria Olsson
 * @version 1.0.0
 */

/**
 * Makes data from elasticsearch presentable in a chart.
 */
export default function RenderQuery({ data }) {
  const percentArr = []
  const ratingArr = []
  data.cocoaData.forEach(element => percentArr.push(element.key))
  percentArr.push(percentArr.shift())
  data.cocoaData.forEach(element => ratingArr.push(element.barrating.value.toFixed(2)))


  var options = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Rating',
        data: ratingArr
      }
    ],
    xaxis: { //percent cocoa
      categories: percentArr
    }
  }

  return (
    <div>
      <ApexCharts
        options={options}
        series={options.series}
        type="bar"
        width={1500}
        height={550} />

      <h2 className={styles.container}>
        Ratings of chocolate bars on the y axis combined with the cocoa content in percent in the bars on x axis
      </h2>
      <a className={styles.card} href=" https://www.kaggle.com/datasets/rtatman/chocolate-bar-ratings"> The data is downloaded from Kaggle and has CC0: Public Domain licens</a>
    </div>

  )
}

/**
 * Call to server side code that connects to elasticsearch, gets return with query data.
 */
export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/connectES`)
  const data = await res.json()
  return { props: { data } }

}
