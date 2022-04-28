
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function Home() {
 var options ={
   chart: {
     type:'bar'
   },
   series: [
     {
       name:'sales',
       data: [30, 40, 35]
     }
   ],
   xaxis: {
     categories:[1991, 1992, 1993]
   }
 }
 
  return (
    <div>
    
      <ApexCharts 
      options={options}
      series={options.series}
      type="bar"
      width={800}
      height={620} />
    </div>
  )
}

// export async function getServerSideProps() {
//   const res = await fetch(`${process.env.BASE_URL}/api/hello`)
//   const data = await res.json()

//   return { props: { data } }

// }
