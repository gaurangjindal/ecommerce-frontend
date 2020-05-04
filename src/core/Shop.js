import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import {getCategory, getFilteredProducts} from './apicore'
import CheckBox from './CheckBox'
import {prices} from './FixedPrices';
import RadioBox from './RadioBox'


const Shop =()=>{
    const [myFilters,setMyFilters] = useState({
        filters:{category:[],price:[] }
    })
    const [categories,setCategories] = useState([]);
    const [error,setError] = useState(false);
    const [limit,setlimit] = useState(6);
    const [skip,setskip] = useState(0);
    const [filteredResults,setFilteredResults] = useState(0);


    


    const init =() =>{
        getCategory().then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data);
            }
        })
    }

    const loadFilterdResults =(newFilters) =>{
        //console.log(newFilters);
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                console.log(data.error);
                setError(data.error)
            }else{
                console.log('my data ',data.data);
                setFilteredResults(data.data)
                console.log('my result',JSON.stringify(filteredResults));
            }
        })
    }

    useEffect(()=>{
        init();
        loadFilterdResults(skip,limit,myFilters.filteres)
    },[]);


    const handleFilters =(filters,filterBy)=>{
           
           const newFilters ={...myFilters}
           newFilters.filters[filterBy] = filters
           
           // console.log('my filter',filters);

           if(filterBy == 'price'){
               let priceValues = handlePrice(filters)
               newFilters.filters[filterBy] = priceValues;
             
           }
           loadFilterdResults(myFilters.filters)
           setMyFilters(newFilters);
    }

const handlePrice = value=>{
    const data = prices
  //  console.log('my array data',data);
   // console.log('my array prices',prices);

    let array =[]

    for(let key in data){
        if(data[key]._id === parseInt(value)){
            array = data[key].array
        }
    }
    console.log('my array',array);
    //console.log(filteredResults);
    return array;
};






    return(
        <Layout title="Shop page" description="Node react e-commerce app " className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <h4>Filter by Categories</h4>
                <ul>
                    <CheckBox categories={categories} 
                    handleFilters={filters => handleFilters(filters,"category")}
                    />
                </ul>

                </div>
                 <div className="col-9">
                    <h2 className="mb-4">

                        {filteredResults? <div className="row">
                            {filteredResults.map((product,i)=>(
                        <Card key={i} 
                        product={product}
                        />
                            ))}
                    </div>:null}
                    </h2>
                    
                </div>
            </div>
                               
    </Layout>
    )
}

export default Shop;