import React, { useState } from 'react';
import firebase from 'firebase';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Search from '../forms/Search';
import {ShopOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import {Badge} from "antd";

function Header(){

  let dispatch=useDispatch();
  let {user,cart} = useSelector((state) => ({...state}));
  let history = useHistory();

  function logout(){
    firebase.auth().signOut();
    
    dispatch ({
      type :"LOGOUT",
      payload:null
    });
    history.push("/login");
    

  }
    
    return (
        <>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
      
        <a class="navbar-brand " href="#"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex ">
                <li class="nav-item ">
                <a class="nav-link active p-2 me-auto" aria-current="page" href="/">
                  <i class="fa-solid fa-house p-1"></i>Home </a>
                </li>  

                <li class="nav-item ">
                <a class="nav-link active p-2 me-auto" aria-current="page" href="/shop">
                  <ShopOutlined />{" "}Shop </a>
                </li>  

                <li class="nav-item ">
                <a class="nav-link active p-2 me-auto" aria-current="page" href="/cart">
                  <ShoppingCartOutlined />{" "} 
                  <Badge count={cart.length} offset={[9,0]}>
                    Cart
                  </Badge>
                </a>
                </li> 

            </ul>

            <li class="nav-item d-flex">
                  <Search className="ms-auto" />
            </li>

            {user && (
            <li class="nav-item dropdown d-flex">
              <a class="nav-link dropdown-toggle p-2 ms-auto" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-gear p-1"></i> {(user.email).split("@")[0]}
              </a>
              <ul class="dropdown-menu dropdown-menu">

                {user && user.role ==="subscriber" && (
                  <li><a class="dropdown-item" href="/user/history">Dashboard</a></li>
                  )}
                  {user && user.role ==="admin" && (
                  <li><a class="dropdown-item" href="/admin/dashboard">Dashboard</a></li>
                  )}
                  
                  <li><a class="dropdown-item " href="#" onClick={logout}><i class="fa fa-sign-out p-1"></i>Logout</a></li>
                </ul>
            </li>
            )}

                    
            
             {!user && (
                  
                <li class="nav-item d-flex">
                    <a class="nav-link active ms-auto p-2" aria-current="page" href="/login">
                    <i class='fas fa-user-alt p-1'></i>Login</a>
                </li>
                )}

                {!user && (
                <li class="nav-item d-flex" >
                    <a class="nav-link active ms-auto mb-2 mb-lg-0 p-2"  aria-current="page" href="/register">
                    <i class='fas fa-user-plus p-1'></i>Register</a>
                </li>
                  
                )}
        
        
          
        </div>
        </div>
      
  
</nav>


</>
    );
}
export default Header;













// import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';

// const items = [
//   {
//     label: 'Home',
//     key: 'mail',
//     icon: <AppstoreOutlined />
//   },
  
  
//   {
    
//     label: 'Username',
//     key: 'SubMenu',
//     icon: <SettingOutlined />,
//     children: [
//       {
        
//             label: 'Option 1',
//             key: 'setting:1',
//           },
//           {
//             label: 'Option 2',
//             key: 'setting:2',
//           }
//         ]
//       }
      
//     ]

//   const items2 = [  {
//         label: 'Login',
//         key: 'login',
//         icon: <UserOutlined />
//       },
//       {
//         label: 'Register',
//         key: 'register',
//         icon: <UserAddOutlined />
//       }
//     ]
//     const [login,register]=items2;
//     console.log(items2[1]);
   
  
// const Header = () => {

//   const [current, setCurrent] = useState('');
//   const [current1,setCurrent1]=useState('');
  
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   const onClick1 = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };
//   var divStyle = {
//     justifyContent: 'flex-end',
   
   
//   };
//   return (
//     <div>
//   <Menu style={items.key} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
//   <Menu style={divStyle} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items2} />
//   </div>
//   );
// }
// export default Header;
