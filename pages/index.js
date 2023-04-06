import Select from 'react-select'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const loadRandomGames = async (nb) => {
    const response = await fetch(`/api/igdb/randomgames?nb=${nb}`);
    const data = await response.json();
  }



  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  return (
    <>
      <main className='container' >
        <h1>Et si vous découvriez un nouveau jeux ?</h1>
        <Select options={options} />
      </main>
    </>
  )
}
