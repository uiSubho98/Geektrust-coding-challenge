import React from 'react';
import {BiEdit} from 'react-icons/bi';
import {AiTwotoneDelete,AiOutlineDoubleLeft,AiOutlineDoubleRight} from 'react-icons/ai';
import './ReadOnlyRow.css'

const ReadOnlyRow = ({each,handleEdit,handleDelete,selectedRow}) => {
   function markRow(rowNumber){
const row = document.getElementsByClassName('rowclass')
const checkboxes =  document.getElementsByClassName('check');
if(checkboxes[rowNumber-1].checked === true){
    checkboxes[rowNumber-1].checked = true;
    row[rowNumber-1].style = "background-color : gray;";
}
else if(checkboxes[rowNumber-1].checked === false){
    checkboxes[rowNumber-1].checked = false;
    row[rowNumber-1].style = "background-color : none;";
}


   }

 
    return (
        <tr className='rowclass' key = {each.id}>
              
                <td className="noBorder">
                <input type="checkbox"   className='checkbox select check'   onClick={()=>{
                    selectedRow(each.id)
                    markRow(each.id)
                }}/>
                </td>
                <td   className="noBorder">{each.name}</td>
                <td   className="noBorder">{each.email}</td>
                <td   className="noBorder">{each.role}</td>
                <td   className="noBorder">
                    <div className='actions'>
                        <div onClick={(event)=>handleEdit(event,each)} className="edit icons-action">
                            <BiEdit></BiEdit>
                        </div>
                        <div onClick={()=>handleDelete(each.id)} className="delete icons-action">
                            <AiTwotoneDelete></AiTwotoneDelete>
                        </div>
                    </div>
                </td>
              </tr>
    );
};

export default ReadOnlyRow;