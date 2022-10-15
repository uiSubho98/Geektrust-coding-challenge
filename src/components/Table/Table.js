import React, { useEffect, useState } from 'react';
import './Table.css'
import axios from 'axios';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
// import Select from 'rc-select';
import ReadOnlyRow from '../ReadOnlyRow.js/ReadOnlyRow';
import {AiOutlineDoubleLeft,AiOutlineDoubleRight} from 'react-icons/ai';
import EditableRow from '../EditableRow.js/EditableRow';
import swal from 'sweetalert';


const Table = ({word}) => {
    const [allLists,setAllLists]= useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [editList,setEditList]=useState(null);
    const [editFormData,setEditFormData]= useState({
        name: "",
        email: "",
        role: ""
    })

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
            setAllLists(res.data);
        }
        fetchData();
    },[])
   
    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(allLists.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return allLists.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><AiOutlineDoubleLeft/></button>;
        }
        if (type === 'next') {
            return <button><AiOutlineDoubleRight/></button>;
        }
      
        return originalElement;
        
        
    }

    //Handle Edit Button
    
const handleEditFormChange = (event)=>{
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...editFormData};
    newFormData[fieldName]=fieldValue;
    setEditFormData(newFormData);
}

const handleEdit = (event,each) =>{
    event.preventDefault()
    setEditList(each.id)
    
    const formValues = {
        name: each.name,
        email: each.email,
        role: each.role
    }
    setEditFormData(formValues)
}

const handleEditFormSubmit = (event)=>{
    event.preventDefault();
    const editedlist ={
        id: editList,
        name: editFormData.name,
        email: editFormData.email,
        role: editFormData.role
    }

    const newLists = [...allLists];
    const index = allLists.findIndex((list)=>list.id === editList );
    newLists[index] = editedlist;
    setAllLists(newLists);
    setEditList(newLists)

}


//Handle Delete

const handleDelete =(editlist)=>{
   const newLists = [...allLists];
   swal({
    title: "Are you sure?",
    text: `You want to delete this data`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Your data is deleted", {
        icon: "success",
      });
  const index = allLists.findIndex((list)=>list.id === editlist);
newLists.splice(index,1);
setAllLists(newLists)  
    } else {
      swal("Your data is safe!");
    }
  });

}
// Delete Selected Row
var test = []
var newAllLists=[...allLists]
const selectedRow = (selectID)=>{
   
    test.push(selectID)  
}

const deleteSelectedRow = ()=>{
   if(test.length>0){
    swal({
        title: "Are you sure?",
        text: `You want to delete ${test.length} data`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your data is deleted", {
            icon: "success",
          });
      let data = allLists.filter(item => !test.includes(item.id));
          setAllLists(data)    
        } else {
          swal("Your data is safe!");
        }
      });
   }
   else{
    swal({
        title: "OOPS!!",
        text: "No Data Selected",
        icon: "error",
        button: "Okay",
      });
   }
}


// Search Query 
useEffect(()=>{
    if(word.length> 0){
        let result = allLists.filter((user)=>{
            return user.role.toLowerCase().includes(word) || user.name.toLowerCase().includes(word) || user.email.toLowerCase().includes(word)
        }) 
        if(result.length>0){
            setAllLists(result)
            // console.log(result)
        }   
    }
    else{
        const fetchData = async () => {
            const res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
            setAllLists(res.data);
        }
        fetchData();
    }
},[word])




    return (
        <>
        <div>
        <div className="table-responsive">
    <form>
    <table className="table" id="myTable">
            <thead>
              <tr>
                <th scope="col" className='serial'>Select</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
             {getData(current,size).map((each,key)=>(
                <>
                {editList === each.id?(<EditableRow key={key} handleDelete={handleDelete}  editFormData={editFormData}  handleEditFormSubmit={handleEditFormSubmit}  handleEditFormChange={handleEditFormChange} each={each}></EditableRow>) :(<ReadOnlyRow key={key} each={each} handleDelete={handleDelete} selectedRow={selectedRow} handleEdit={handleEdit}></ReadOnlyRow>) }
                </>
            ))}
              
            </tbody>
          </table>
    </form>
        </div>
      </div>
    
      <div classname='footer-div' >
      <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    // showQuickJumper
                                    // showSizeChanger
                                    
                                    onChange={PaginationChange}
                                    total={allLists.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    showTitle={false}
                                    onShowSizeChange={PerPageChange}
                                />
                                <div className='delete-all'>
                                <button onClick={()=>deleteSelectedRow()} className='delete-selected'>Delete Selected</button>
                                </div>
      </div>
      
        </>
    );
};

export default Table;