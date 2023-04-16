import { useEffect, useState } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import axios from 'axios';
import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';
import {ALL_COUNTRIES} from '../config';

function Home({setCountries,countries}) {

	const history = useNavigate();

	const fetchReq = async()=> {
	  const res = await axios.get(ALL_COUNTRIES);
	  setCountries(res.data);
	  console.log(res.data);
	}
 
	useEffect(()=>{
		if(!countries.length){
			fetchReq();
		}
	},[])

	return (
		<>
		<Controls/>
		<List>
		  {countries.map((c)=>{
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