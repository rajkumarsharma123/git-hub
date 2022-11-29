import axios from 'axios';
import React, { useRef, useState } from 'react'
import "../content/content.css"
import {BsFillBookFill, BsFillStarFill, BsGithub} from "react-icons/bs"
import {FiPackage} from "react-icons/fi"
import {GrProjects} from "react-icons/gr"
import {GiOvermind} from "react-icons/gi"


import { Link } from 'react-router-dom'
const Content = () => {
  const [data, setData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [display, setDisplay] = useState("none");
  const [userData, setUserData] = useState(null);
  const [userRepo, setUserRepo] = useState([]);
  const searchData = useRef(null);
  const handleChange = async (e) => {
    e.preventDefault();
    setSearchUser(e.target.value);
    console.log(e.target.value);
    if(e.target.value!==""){
    await axios.get(`https://api.github.com/search/users?q=${e.target.value}`).then((response) => {
      setData([...response.data.items]);
    
      console.log(response.data);
    });
  }

  }
  const handleClick = () => {
    setDisplay("block");
  }

  const closeSearch = (e) => {
    if (searchData.current && display && !searchData.current.contains(e.target)) {
      setDisplay('none')

    }
  }
  document.addEventListener('mousedown', closeSearch);

  const handleData = async(index) => {
    const a = data[index];
    setUserData({ ...a });
    setDisplay("none");
    await axios.get(`${a.repos_url}`).then((response)=>{
      setUserRepo([...response.data]);
      console.log(response.data);
    })
  }
  return (
    <>
    <div className='upper'>
      <div className='middle'>
        <div className='down' >
          <div className='search-input'>
            <input value={searchUser} ref={searchData} onClick={handleClick} name="search" className="form-control mr-sm-1 input" type="search" placeholder="Search a Github Profile here" aria-label="Search" onChange={(e) => { handleChange(e) }} />
          </div>

          <div ref={searchData} className='search-data' style={{ display: `${display}` }}>
            {data.map((item, index) => (
              <div className='outputData' key={item.id} >
                <img src={item.avatar_url} alt='' />
                <p onClick={(e) => handleData(index)}> {item.login}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>

      { userData ? 
      <div className='container my-5' >
          <div className='row'>
            <div className='col-md-3'>
              <div className="card carddata">
                <img src={userData.avatar_url} className="card-img-top rounded-circle border" alt="..."  />
                <div className="card-body">
                  <h4>{userData.login}</h4>
                  <p className="card-text">{userData.type}</p>
                </div>
              </div>
            </div>
            <div className='col-md-9'>
              <div className='main-container mb-5' >
                      <button type="button" class="btn btn-info btn-sm"><GiOvermind/>Overview</button>
        <button type="button" class="btn btn-info btn-sm"><BsFillBookFill/> Repositories {userRepo.length}</button>
        <button type="button" class="btn btn-info btn-sm"> <FiPackage/> Packages</button>
        <button type="button" class="btn btn-info btn-sm"><GrProjects/> Projects</button>
        <button type="button" class="btn btn-info btn-sm"><BsFillStarFill/> Stars</button>
              </div>
              <div className='row'>
                  {userRepo.map((item)=>(
                    <div className="card col-md-12 mx-2 pt-3 mt-3">
                    <div className="card-body">
                    <h4 className='text-primary'>{item.name}</h4>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
                    ))}
              </div>
            </div>
          </div>
        </div> : <div className='upper' style={{textAlign:"center"}}>
          <h2><BsGithub style={{marginRight:"20px"}} />  Welcome to my Github search engine</h2>
           </div>}
      </>
  )
}

export default Content