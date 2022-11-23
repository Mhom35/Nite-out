import * as React from 'react';
import Button from '@mui/material/Button';
//import { createTheme} from '@mui/material/styles';
import { useState } from 'react';
import RecommendIcon from '@mui/icons-material/Recommend';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//const theme = createTheme();


export default function Top() {
    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)
    const [third, setThird] = useState(0)
    const [fourth, setFourth] = useState(0)
    const [fifth, setFifth] = useState(0)

    // const handleSubmit = async (submit) => {
    //     submit.preventDefault()
    //     const ***** =
    //     const ***** =
    //     const ***** =
    //     const data  = {}
    //     const *****Url = ``;
    //     const fetchConfig = {
    //         method:"post",
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     const response = await fetch(*****Url, fetchConfig);
    //     if (response.ok){
    //         const ***** = await response.json();
    //         clearState()

    //     }
    // }
    // const clearState = () => {
    //     setFirst(0)
    //     setSecond(0)
    //     setThird(0)
    //     setFourth(0)
    //     setFifth(0)

    // }
    // useEffect(() => {
    //     const fetchBins = async () => {
    //         const ***** =
    //         const ***** =
    //         const ***** =
    //         const response1 = await fetch(*****Url)
    //         const response2 = await fetch(*****Url)
    //         const response3 = await fetch(*****Url)
    //         const data = await response1.json()
    //         const data2 = await response2.json()
    //         const data3 = await response3.json()
    //         set*****(data.s*****)
    //         set*****(data2.*****)
    //         set*****(data3.*****)
    //     }

    //     fetchBins()
    // }, [])
  return (
    <>
        <div className="px-4 py-5 my-5">
            <h1 className="display-2 fw-bold text-center">Top Trips</h1>
                <table className="table .table-bordered table-striped table-success text-right">
                    <tbody>
                        1st
                        {/* <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price of car" required type="number" id="price" name="price" className="form-control"/> */}
                        <Button onClick={() => setFirst(first + 1)}><RecommendIcon />{`${first === 0 ? '' : first}`}</Button>
                    </tbody>
                    <tbody>
                        2nd
                        <Button onClick={() => setSecond(second + 1)}><RecommendIcon />{`${second === 0 ? '' : second}`}</Button>
                    </tbody>
                    <tbody>
                        3rd
                        <Button onClick={() => setThird(third + 1)}><RecommendIcon />{`${third === 0 ? '' : third}`}</Button>
                    </tbody>
                    <tbody>
                        4th
                        <Button onClick={() => setFourth(fourth + 1)}><RecommendIcon />{`${fourth === 0 ? '' : fourth}`}</Button>
                    </tbody>
                    <tbody>
                        5th
                        <Button onClick={() => setFifth(fifth + 1)}><RecommendIcon />{`${fifth === 0 ? '' : fifth}`}</Button>
                    </tbody>
                    <tbody>
                        <Button type="submit">Next 5 <ArrowForwardIcon/></Button>
                    </tbody>
                    </table>
        </div>

    </>
  );
}
