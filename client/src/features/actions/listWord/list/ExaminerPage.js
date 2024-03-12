import React from 'react';
import { AiFillPrinter } from "react-icons/ai";

import './ExaminerPage.css'; // קובץ CSS עם הגדרות עיצוב

function ExaminerPage() {

    const printList = () => {
        window.print();
    };

    return (
        <div className="print-content">
            <button onClick={printList} className="print-button"><AiFillPrinter 
            // onMouseOver="עעע"
            color='red'
           fontSize={50}/>
</button>
        </div>
    );
}

export default ExaminerPage;
