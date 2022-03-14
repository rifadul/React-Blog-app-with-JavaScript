import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Routes, Route, Link } from "react-router-dom";

export const Post = () => {
    const [data, setData] = useState([])
    const [pageNumber, setPageNumber] = useState(0)


    useEffect(() => {
        getPostData()
        const myTimeout = setInterval(fetchData, 10000);

        return () => {
            clearInterval(myTimeout);
        }

    }, [])

    const fetchData = () => {
        setPageNumber((pageNumber) => pageNumber + 1)
        getPostData()
    }

    const getPostData = async () => {
        try {
            const response = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);
            // console.log(response.data.hits);
            setData((data) => [...data, ...response.data.hits])

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>



            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={fetchData}
                hasMore={data.length < 1500}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }

            >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Titel</th>
                            <th scope="col">URL</th>
                            <th scope="col">Author</th>
                            <th scope="col">Create at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, i) => {
                                return (

                                    <tr key={i}>
                                        <th scope="row"> <Link to={`/details/${item.objectID}`} state={data}>{item.title}</Link></th>

                                        <td>{item.url}</td>
                                        <td>{item.author}</td>
                                        <td>{item.created_at}</td>
                                    </tr>


                                )
                            })
                        }
                    </tbody>
                </table>
            </InfiniteScroll>






        </div >
    )
}
