import React,{useState,useCallback} from "react";
import SearchBook from "./SearchBook";

const App =()=>{
	let [query,setQuery] = useState("");
	let [page,setPage] = useState(1);

	const valueHandling=(e)=>{
		setQuery(e.target.value);
		setPage(1);
	}


	let {loading,data,more,error}= SearchBook(query,page);


	let observer  = React.useRef();
	let lastElement = useCallback(node=>{

		if(loading) return

		if(observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting && more){
				setPage(prevpage => prevpage+1)

			}
		});
		
		if(node) observer.current.observe(node);
	},[loading,more]);

	return(

		<>
			<input type="text" onChange={valueHandling} />

			{data.map((d,index)=>{

				if(data.length === index+1){
					return (
						<div key={d} ref={lastElement}>{d}</div>
					)
				}else{
					return (
						<div key={d}>{d}</div>
					)
				}

				
			})}

			<div>{loading && "loading...."}</div>
			<div>{error && "Something wrong"}</div>
		</>
	)


}

export default App;