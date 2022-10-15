import React from 'react';
import {TiTick} from 'react-icons/ti';
import {AiTwotoneDelete,AiOutlineDoubleLeft,AiOutlineDoubleRight,handleDelete} from 'react-icons/ai';

const EditableRow = ({each,editFormData,handleEditFormChange,handleEditFormSubmit,handleDelete}) => {
    return (
        <tr>
            <td></td>
            <td>
                <input type="text"
                required
                placeholder='Enter a name'
                name='name'
                value = {editFormData.name}
                onChange={handleEditFormChange} />
            </td>
            <td>
            <input type="email"
                required
                placeholder='Enter a email'
                name='email' 
                value = {editFormData.email}
                onChange={handleEditFormChange}/>
            </td>
            <td>
            <input type="text"
                required
                placeholder='Enter a role'
                name='role'
                value = {editFormData.role}
                onChange={handleEditFormChange} />
            </td>
            <td className="noBorder">
                    <div className='actions'>
                        <div onClick={handleEditFormSubmit} className="edit icons-action">
                           <TiTick></TiTick>
                        </div>
                        <div onClick={()=>handleDelete(each.id)} className="delete icons-action">
                            <AiTwotoneDelete></AiTwotoneDelete>
                        </div>
                    </div>
                </td>
        </tr>
    );
};

export default EditableRow;