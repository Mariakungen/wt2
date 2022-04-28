import Head from 'next/head';
// import ApexCharts from 'apexcharts'
import dynamic from 'next/dynamic'
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  var options = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  }
  
  var chart = new ApexCharts(document.querySelector('#chart'), options)

  chart.render()
  
  return (
    <div id="chart">
    
      <style jsx>{`
        body {
          font-family: Roboto, sans-serif;
        }
        
        #chart {
          max-width: 650px;
          margin: 35px auto;
        }
        
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/hello`)
  const data = await res.json()
  
  return { props: { data }} 
  
}
