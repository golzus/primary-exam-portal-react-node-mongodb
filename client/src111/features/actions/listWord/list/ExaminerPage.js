import React from 'react';
import { AiFillPrinter } from "react-icons/ai";

import './ExaminerPage.css'; // קובץ CSS עם הגדרות עיצוב
import { MdDelete, MdSearch } from 'react-icons/md';

function ExaminerPage() {

    const printList = () => {
        window.print();
    };
const MouseEventHandler=(e)=>{
return <h1>jjjj</h1>
    console.log("print");}
    return (
      
        <div className="print-content">
            <button onClick={printList} className="print-button"><AiFillPrinter 
           onMouseOver={MouseEventHandler}
        className='printIcon'
           fontSize={50}/>
</button>
        </div>
    );
}

export default ExaminerPage;
