import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';
import {useNavigate,useParams} from 'react-router-dom'
import searchByCountry from '../config';
import Button from '../components/Button';
import Info from '../components/Info';

function Details() {
	const {name} = useParams();
	const navigate = useNavigate();
	const history = useNavigate();
	const [country,setCountry]=useState(null);
	console.log(country);

	const fetchReq =async ()=>{
		const {data} = await axios.get(searchByCountry(name));
		setCountry(data[0]);
	}

	useEffect(()=>{
		fetchReq();
	},[name]);

	return (
		<div>
			<Button onClick={()=> navigate(-1)}>
				<IoArrowBack/> Back
			</Button>
			{country && <Info {...country} named={name}/>}
		</div>
	);
}

export default Details;