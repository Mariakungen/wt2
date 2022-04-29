import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function Home({data}) {
  // console.log(data.cocoaData)

const percentArr= []
const ratingArr=[]
 data.cocoaData.forEach(element => percentArr.push(element.key))
 // console.log(percentArr)
 data.cocoaData.forEach(element => ratingArr.push(element.aafd.value.toFixed(2)))


 var options ={
   chart: {
     type:'bar'
   },
   series: [
     {
       name:'Percent cocoa',
       data: ratingArr
     }
   ],
   xaxis: { // rating
     categories: percentArr
   }
 }
 
  return (
    <div>
    
      <ApexCharts 
      options={options}
      series={options.series}
      type="bar"
      width={1200}
      height={620} />
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/hello`)
  const data = await res.json()
  return { props: { data } }

}
