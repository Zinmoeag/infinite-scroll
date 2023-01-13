import React,{useState,useEffect} from "react";


const SearchBook = (query,page) =>{

	let [loading,setLoading] = useState(false);
	let [error,setError] = useState(false);
	
	let [data,setData] = useState([]);
	let [more,setMore] = useState(false);

	let path = "https://openlibrary.org/search.json";

	useEffect(()=>{
		setData([]);	
	},[query])

	useEffect(()=>{
		setLoading(true);
		setError(false);

		const controller = new AbortController();
 		const signal = controller.signal;

		let params = {
			q: query,
			page:page
		}
		let url = path +"?"+ new URLSearchParams(params);

		fetch(url,{signal})
		.then(res=>res.json())
		.then(res=>{
			setData(prev => {
				return [...new Set([...prev, ...res.docs.map(d=>d.title)])]
			})
			setLoading(false);
			setMore(res.docs.length > 0);
		})
		.catch((e)=>{
			if(e.name === "AbortError") return

			setError(true)
		});

		//must be function
		return ()=>{
			controller.abort();
		};
	},[query,page]);

	return {
		loading,error,data,more
	}

}

export default SearchBook;