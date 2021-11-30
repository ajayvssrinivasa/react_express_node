import React,{useState,useEffect} from 'react';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
import { getPosts ,addPost,deletePost,editPost,updatePost} from '../config/Myservice';
export default function Posts() {
     const [title,setTitle]=useState('');
     const [description,setDescription]=useState('');
    const [posts,setPosts]=useState([]);
    const [ischange,setIschange]=useState(false)
    useEffect(()=>{
        getPosts()
        .then(res=>{
            if(res.data.err == 0){
                setPosts(res.data.pdata);
            }
            
        })
    },[]);

    const handle = () =>{
        let data = {title: title, description: description};
        addPost(data)
        .then(res=>{
            alert(res.data.msg);
        })
    }
    const handledelte=(ind)=>{
     deletePost(ind)
     .then(res=>{
         alert("data deleted")
     })
    }
    const handleedit=(ind)=>{
        setIschange(true)
        editPost(ind)
     .then(res=>{
         setTitle(res.data.sdata.title);
         setDescription(res.data.sdata.description);
         
     })
    }
    const handleupdate=()=>{
        let data={title:title,description:description}
        updatePost(data)
        .then(res=>{
            alert("updated successfully")
        })
        setIschange(false)
    }
    return (
        <Container>
        <h2>Latest posts</h2>
        <Form>
<Form.Group className="mb-3">
<Form.Label>Title</Form.Label>
<Form.Control type="text" name="title" placeholder="Enter Posts title" value={title} onChange={(e)=>{setTitle(e.target.value)}} /><br/>
{title!='' && title.length < 4 && <Alert variant="danger">
Title should be more than 4 characters
</Alert>}
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Description</Form.Label>
<Form.Control type="text" name="description" placeholder="Enter dexcription" value={description} onChange={(e)=>{setDescription(e.target.value)}} /><br/>
{description!='' && description.length < 10 && <Alert variant="danger">
Description should be more than 10 characters
</Alert>}
</Form.Group>
{ischange?<Button variant="primary" onClick={handleupdate} type="submit" >
update
</Button>:
<Button variant="primary" onClick={handle} type="submit" >
submit
</Button>
}
</Form>
<Table striped bordered hover>
<thead>
<tr>
<th>Sl. no</th>
<th>Title</th>
<th>Description</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
    
{posts.map((item, index)=>{ return(<tr key={index}>
      <td>{index + 1}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td><Form><Button variant="danger" onClick={()=>handledelte(index)} type="submit" >
Delete
</Button><Button variant="success" onClick={()=>handleedit(index)}  >
Update
</Button></Form></td>
    </tr>)})}
</tbody>
</Table>

    </Container>
    )
}
