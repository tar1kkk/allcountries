import { useEffect, useState } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import axios from 'axios';
import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';
import {ALL_COUNTRIES} from '../config';

function Home({setCountries,countries}) {
	const [filtredCoutries,setFilteredCounrties] = useState(countries);
	console.log(filtredCoutries);

	const handleSearch=(search,region)=>{
		let data = [...countries];

		if(region){
			data = data.filter(c=> c.region.includes(region));
		}

		if(search){
			data = data.filter(c=> c.name.common.toLowerCase().includes(search.toLowerCase()));
		}

		setFilteredCounrties(data);
	}

	const history = useNavigate();

	const fetchReq = async()=> {
	  const res = await axios.get(ALL_COUNTRIES);
	  setCountries(res.data);
	}
 
	useEffect(()=>{
		if(!countries.length){
			fetchReq();
		}
		  // eslint-disable-next-line
	},[]);
	useEffect(() => {
		handleSearch();
		// eslint-disable-next-line
	 }, [countries]);

	return (
		<>
		<Controls onSearch={handleSearch}/>
		<List>
		  {filtredCoutries.map((c)=>{
			 const countryInfo = {
			 img: c.flags.png,
			 name: c.name.common,
			 info: [
				{
				  title: 'Population',
				  description: c.population.toLocaleString(),
				},
				{
				  title: 'Region',
				  description: c.region,
				},
				{
				  title: 'Capital',
				  description: c.capital[0],
				},
			 ],
		  };
			 return <Card key={c.name} onClick={()=> history(`/country/${c.name.common}`)} {...countryInfo}/>
		  })}
		</List>
		</>
	);
}

export default Home;