import { useEffect, useState } from "react";


const Practice = () => {
  const [data, setData] = useState(null);

  const apiData = async () => {
    const fetchData = await fetch('https://dummyapi.online/api/users');
    const json = await fetchData.json();
    setData(json);
  }

  useEffect(() => {
    apiData();
  }, [])

  return data && (
    <div>
      {data.map((item)=><h1 key={item.id}>{item.name}</h1>)}
    </div>
  )
}

export default Practice